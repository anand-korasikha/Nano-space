"""
Authentication routes - Login, Register, JWT management
All users are stored in MongoDB.
"""

import re
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from mongo_client import db_mongo
from bson.objectid import ObjectId
from datetime import datetime

auth_bp = Blueprint('auth', __name__)


def _user_to_dict(user):
    """Serialize a MongoDB user document to a safe dict."""
    return {
        'id': str(user['_id']),
        'email': user.get('email'),
        'phone': user.get('phone'),
        'full_name': user.get('full_name'),
        'role': user.get('role', 'customer'),
        'email_verified': user.get('email_verified', False),
        'phone_verified': user.get('phone_verified', False),
        'created_at': user['created_at'].isoformat() if user.get('created_at') else None,
        'last_login': user['last_login'].isoformat() if user.get('last_login') else None,
    }


def get_user_by_id(user_id_str):
    """Return a MongoDB user document by its string _id, or None."""
    try:
        return db_mongo.users.find_one({'_id': ObjectId(user_id_str)})
    except Exception:
        return None


@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user — stored in MongoDB, with optional Firebase phone verification."""
    try:
        data = request.get_json()

        required_fields = ['email', 'password', 'full_name', 'role']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        if not re.match(r"[^@]+@[^@]+\.[^@]+", data['email']):
            return jsonify({'error': 'Invalid email format'}), 400

        if db_mongo.users.find_one({'email': data['email']}):
            return jsonify({'error': 'Email already registered'}), 409

        if data['role'] not in ['customer', 'owner', 'admin']:
            return jsonify({'error': 'Invalid role'}), 400

        # Optional Firebase Phone Validation during signup
        phone = data.get('phone')
        phone_verified = False
        firebase_token = data.get('firebase_token')

        if firebase_token:
            from services.firebase_service import verify_firebase_id_token
            try:
                decoded = verify_firebase_id_token(firebase_token)
                verified_phone = decoded.get('phone_number')
                if verified_phone:
                    phone = verified_phone
                    phone_verified = True
            except Exception as e:
                return jsonify({'error': f'Firebase token verification failed: {str(e)}'}), 401

        if phone and not re.match(r"^\+?[\d\s-]{10,}$", phone):
            return jsonify({'error': 'Invalid phone number format'}), 400

        if phone and db_mongo.users.find_one({'phone': phone}):
            return jsonify({'error': 'Phone number already registered'}), 409

        user_doc = {
            'email': data['email'],
            'phone': phone,
            'password_hash': generate_password_hash(data['password']),
            'full_name': data['full_name'],
            'role': data['role'],
            'email_verified': False,
            'phone_verified': phone_verified,
            'created_at': datetime.utcnow(),
            'last_login': None,
        }

        result = db_mongo.users.insert_one(user_doc)
        user_doc['_id'] = result.inserted_id

        access_token = create_access_token(identity=str(result.inserted_id))
        refresh_token = create_refresh_token(identity=str(result.inserted_id))

        return jsonify({
            'message': 'User registered successfully',
            'user': _user_to_dict(user_doc),
            'access_token': access_token,
            'refresh_token': refresh_token,
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user — looks up from MongoDB."""
    try:
        data = request.get_json()

        if 'identifier' not in data or 'password' not in data:
            return jsonify({'error': 'Email/phone and password required'}), 400

        user = db_mongo.users.find_one({
            '$or': [
                {'email': data['identifier']},
                {'phone': data['identifier']},
            ]
        })

        if not user or not check_password_hash(user['password_hash'], data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401

        now = datetime.utcnow()
        db_mongo.users.update_one({'_id': user['_id']}, {'$set': {'last_login': now}})
        user['last_login'] = now

        access_token = create_access_token(identity=str(user['_id']))
        refresh_token = create_refresh_token(identity=str(user['_id']))

        return jsonify({
            'message': 'Login successful',
            'user': _user_to_dict(user),
            'access_token': access_token,
            'refresh_token': refresh_token,
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh access token."""
    try:
        current_user_id = get_jwt_identity()
        access_token = create_access_token(identity=str(current_user_id))
        return jsonify({'access_token': access_token}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current user details from MongoDB."""
    try:
        user = get_user_by_id(get_jwt_identity())
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify({'user': _user_to_dict(user)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/update-profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update user profile in MongoDB."""
    try:
        current_user_id = get_jwt_identity()
        user = get_user_by_id(current_user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        data = request.get_json()
        updates = {}
        if 'full_name' in data:
            updates['full_name'] = data['full_name']
        if 'phone' in data:
            updates['phone'] = data['phone']

        if updates:
            db_mongo.users.update_one({'_id': user['_id']}, {'$set': updates})
            user.update(updates)

        return jsonify({
            'message': 'Profile updated successfully',
            'user': _user_to_dict(user),
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/verify-firebase-phone', methods=['POST'])
@jwt_required()
def verify_firebase_phone():
    """
    Verify a Firebase Phone Auth idToken.
    The frontend calls this after the user confirms the OTP in Firebase.
    Body: { "firebase_token": "<Firebase idToken>" }
    """
    try:
        from services.firebase_service import verify_firebase_id_token

        current_user_id = get_jwt_identity()
        user = get_user_by_id(current_user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        data = request.get_json()
        firebase_token = data.get('firebase_token')
        if not firebase_token:
            return jsonify({'error': 'firebase_token is required'}), 400

        # Verify with Firebase Admin SDK
        decoded = verify_firebase_id_token(firebase_token)

        # The phone number confirmed by Firebase
        verified_phone = decoded.get('phone_number')
        if not verified_phone:
            return jsonify({'error': 'Token does not contain a phone number'}), 400

        # Mark phone as verified in MongoDB
        db_mongo.users.update_one(
            {'_id': user['_id']},
            {'$set': {'phone_verified': True, 'phone': verified_phone}}
        )
        user['phone_verified'] = True
        user['phone'] = verified_phone

        return jsonify({
            'message': 'Phone number verified successfully',
            'user': _user_to_dict(user),
        }), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

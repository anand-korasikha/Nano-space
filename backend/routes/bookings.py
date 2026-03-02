"""
Booking routes - Create and manage bookings.
All bookings are stored in and served from MongoDB.
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongo_client import db_mongo
from bson.objectid import ObjectId
from datetime import datetime

bookings_bp = Blueprint('bookings', __name__)


def _booking_to_dict(b):
    """Serialize a MongoDB booking document."""
    return {
        'id': str(b['_id']),
        'customer_id': b.get('customer_id'),
        'property_id': b.get('property_id'),
        'booking_type': b.get('booking_type'),
        'quantity': b.get('quantity', 1),
        'start_date': b['start_date'].isoformat() if b.get('start_date') else None,
        'end_date': b['end_date'].isoformat() if b.get('end_date') else None,
        'total_amount': b.get('total_amount'),
        'status': b.get('status', 'pending'),
        'customer_name': b.get('customer_name'),
        'customer_email': b.get('customer_email'),
        'customer_phone': b.get('customer_phone'),
        'notes': b.get('notes'),
        'created_at': b['created_at'].isoformat() if b.get('created_at') else None,
        'confirmed_at': b['confirmed_at'].isoformat() if b.get('confirmed_at') else None,
        'cancelled_at': b['cancelled_at'].isoformat() if b.get('cancelled_at') else None,
        # enriched fields
        'property_name': b.get('property_name'),
        'property_type': b.get('property_type'),
        'property_city': b.get('property_city'),
    }


@bookings_bp.route('/', methods=['POST'])
@jwt_required()
def create_booking():
    """Create a new booking — stored in MongoDB."""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()

        required_fields = ['property_id', 'total_amount']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Verify property exists (Mongo or SQLite)
        property_id = str(data['property_id'])
        prop_found = False
        prop_name = prop_type = prop_city = None

        if len(property_id) == 24:
            mp = db_mongo.properties.find_one({'_id': ObjectId(property_id)})
            if mp:
                prop_found = True
                prop_name = mp.get('name')
                prop_type = mp.get('type')
                prop_city = mp.get('city')
        else:
            from models.property import Property
            try:
                sp = Property.query.get(int(property_id))
                if sp:
                    prop_found = True
                    prop_name = sp.name
                    prop_type = sp.type
                    prop_city = sp.city
            except (ValueError, Exception):
                pass

        if not prop_found:
            return jsonify({'error': 'Property not found'}), 404

        # Resolve customer info from JWT user
        user = db_mongo.users.find_one({'_id': ObjectId(current_user_id)})

        booking_doc = {
            'customer_id': current_user_id,
            'property_id': property_id,
            'booking_type': data.get('booking_type'),
            'quantity': data.get('quantity', 1),
            'start_date': datetime.fromisoformat(data['start_date']) if data.get('start_date') else datetime.utcnow(),
            'end_date': datetime.fromisoformat(data['end_date']) if data.get('end_date') else None,
            'total_amount': data['total_amount'],
            'status': 'pending',
            'customer_name': data.get('customer_name') or (user.get('full_name') if user else None),
            'customer_email': data.get('customer_email') or (user.get('email') if user else None),
            'customer_phone': data.get('customer_phone') or (user.get('phone') if user else None),
            'notes': data.get('notes'),
            'property_name': prop_name,
            'property_type': prop_type,
            'property_city': prop_city,
            'created_at': datetime.utcnow(),
            'confirmed_at': None,
            'cancelled_at': None,
        }

        result = db_mongo.bookings.insert_one(booking_doc)
        booking_doc['_id'] = result.inserted_id

        return jsonify({
            'message': 'Booking created successfully',
            'booking': _booking_to_dict(booking_doc),
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bookings_bp.route('/my-bookings', methods=['GET'])
@jwt_required()
def get_my_bookings():
    """Get bookings for the current user from MongoDB."""
    try:
        current_user_id = get_jwt_identity()
        bookings = list(db_mongo.bookings.find({'customer_id': current_user_id}).sort('created_at', -1))
        return jsonify({'bookings': [_booking_to_dict(b) for b in bookings]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bookings_bp.route('/<booking_id>', methods=['GET'])
@jwt_required()
def get_booking(booking_id):
    """Get a single booking from MongoDB."""
    try:
        current_user_id = get_jwt_identity()
        booking = db_mongo.bookings.find_one({'_id': ObjectId(booking_id)})

        if not booking:
            return jsonify({'error': 'Booking not found'}), 404

        if booking['customer_id'] != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403

        return jsonify({'booking': _booking_to_dict(booking)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bookings_bp.route('/<booking_id>/cancel', methods=['PUT'])
@jwt_required()
def cancel_booking(booking_id):
    """Cancel a booking in MongoDB."""
    try:
        current_user_id = get_jwt_identity()
        booking = db_mongo.bookings.find_one({'_id': ObjectId(booking_id)})

        if not booking:
            return jsonify({'error': 'Booking not found'}), 404

        if booking['customer_id'] != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403

        now = datetime.utcnow()
        db_mongo.bookings.update_one(
            {'_id': ObjectId(booking_id)},
            {'$set': {'status': 'cancelled', 'cancelled_at': now}}
        )
        booking['status'] = 'cancelled'
        booking['cancelled_at'] = now

        return jsonify({
            'message': 'Booking cancelled successfully',
            'booking': _booking_to_dict(booking),
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

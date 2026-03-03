"""
Enquiry routes - public form submissions + admin management (MongoDB)
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from mongo_client import db_mongo
from bson.objectid import ObjectId

enquiry_bp = Blueprint('enquiry', __name__)


def admin_required():
    """Check if the current JWT user is an admin (uses MongoDB)."""
    try:
        current_user_id = get_jwt_identity()
        user = db_mongo.users.find_one({'_id': ObjectId(current_user_id)})
        if not user or user.get('role') != 'admin':
            return None
        return user
    except Exception:
        return None


def _enquiry_to_dict(doc):
    doc['id'] = str(doc['_id'])
    doc['_id'] = str(doc['_id'])
    if isinstance(doc.get('created_at'), datetime):
        doc['created_at'] = doc['created_at'].isoformat()
    if isinstance(doc.get('updated_at'), datetime):
        doc['updated_at'] = doc['updated_at'].isoformat()
    return doc


# ─── Public: Submit an enquiry (no auth needed) ──────────────────────────────

@enquiry_bp.route('/', methods=['POST'])
def submit_enquiry():
    """Submit a new enquiry from any form on the website"""
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        required_fields = ['name', 'email']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Name and email are required'}), 400

        now = datetime.utcnow()
        enquiry_doc = {
            'name': data['name'],
            'email': data['email'],
            'phone': data.get('phone', ''),
            'enquiry_type': data.get('enquiry_type', 'general'),
            'subject': data.get('subject', ''),
            'message': data.get('message', ''),
            'city': data.get('city', ''),
            'property_name': data.get('property_name', ''),
            'property_type': data.get('property_type', ''),
            'budget': data.get('budget', ''),
            'seats_required': data.get('seats_required'),
            'move_in_date': data.get('move_in_date', ''),
            'status': 'new',
            'admin_notes': '',
            'created_at': now,
            'updated_at': now,
        }

        result = db_mongo.enquiries.insert_one(enquiry_doc)

        return jsonify({
            'message': 'Enquiry submitted successfully! We will contact you shortly.',
            'enquiry_id': str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ─── Admin: View all enquiries ────────────────────────────────────────────────

@enquiry_bp.route('/admin', methods=['GET'])
@jwt_required()
def get_all_enquiries():
    """Get all enquiries - admin only"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403

        status_filter = request.args.get('status')
        type_filter = request.args.get('type')

        mongo_filter = {}
        if status_filter:
            mongo_filter['status'] = status_filter
        if type_filter:
            mongo_filter['enquiry_type'] = type_filter

        enquiries = list(db_mongo.enquiries.find(mongo_filter).sort('created_at', -1))
        result = [_enquiry_to_dict(e) for e in enquiries]

        return jsonify({
            'enquiries': result,
            'total': len(result)
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@enquiry_bp.route('/admin/<enquiry_id>/status', methods=['PUT'])
@jwt_required()
def update_enquiry_status(enquiry_id):
    """Update enquiry status - admin only"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403

        data = request.get_json()
        valid_statuses = ['new', 'contacted', 'resolved', 'closed']

        if 'status' not in data or data['status'] not in valid_statuses:
            return jsonify({'error': f'Status must be one of: {", ".join(valid_statuses)}'}), 400

        update_fields = {'status': data['status'], 'updated_at': datetime.utcnow()}
        if 'admin_notes' in data:
            update_fields['admin_notes'] = data['admin_notes']

        result = db_mongo.enquiries.find_one_and_update(
            {'_id': ObjectId(enquiry_id)},
            {'$set': update_fields},
            return_document=True
        )

        if not result:
            return jsonify({'error': 'Enquiry not found'}), 404

        return jsonify({
            'message': 'Enquiry status updated',
            'enquiry': _enquiry_to_dict(result)
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@enquiry_bp.route('/admin/<enquiry_id>', methods=['DELETE'])
@jwt_required()
def delete_enquiry(enquiry_id):
    """Delete an enquiry - admin only"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403

        result = db_mongo.enquiries.delete_one({'_id': ObjectId(enquiry_id)})

        if result.deleted_count == 0:
            return jsonify({'error': 'Enquiry not found'}), 404

        return jsonify({'message': 'Enquiry deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

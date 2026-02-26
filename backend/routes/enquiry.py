"""
Enquiry routes - public form submissions + admin management
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.enquiry import Enquiry
from models.user import User
from extensions import db
from datetime import datetime

enquiry_bp = Blueprint('enquiry', __name__)


def admin_required():
    """Check if the current JWT user is an admin"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or user.role != 'admin':
        return None
    return user


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

        enquiry = Enquiry(
            name=data['name'],
            email=data['email'],
            phone=data.get('phone'),
            enquiry_type=data.get('enquiry_type', 'general'),
            subject=data.get('subject'),
            message=data.get('message'),
            city=data.get('city'),
            property_name=data.get('property_name'),
            property_type=data.get('property_type'),
            budget=data.get('budget'),
            seats_required=data.get('seats_required'),
            move_in_date=data.get('move_in_date'),
            status='new'
        )

        db.session.add(enquiry)
        db.session.commit()

        return jsonify({
            'message': 'Enquiry submitted successfully! We will contact you shortly.',
            'enquiry_id': enquiry.id
        }), 201

    except Exception as e:
        db.session.rollback()
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

        query = Enquiry.query

        if status_filter:
            query = query.filter_by(status=status_filter)
        if type_filter:
            query = query.filter_by(enquiry_type=type_filter)

        enquiries = query.order_by(Enquiry.created_at.desc()).all()

        return jsonify({
            'enquiries': [e.to_dict() for e in enquiries],
            'total': len(enquiries)
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@enquiry_bp.route('/admin/<int:enquiry_id>/status', methods=['PUT'])
@jwt_required()
def update_enquiry_status(enquiry_id):
    """Update enquiry status - admin only"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403

        enquiry = Enquiry.query.get(enquiry_id)
        if not enquiry:
            return jsonify({'error': 'Enquiry not found'}), 404

        data = request.get_json()
        valid_statuses = ['new', 'contacted', 'resolved', 'closed']

        if 'status' not in data or data['status'] not in valid_statuses:
            return jsonify({'error': f'Status must be one of: {", ".join(valid_statuses)}'}), 400

        enquiry.status = data['status']
        if 'admin_notes' in data:
            enquiry.admin_notes = data['admin_notes']
        enquiry.updated_at = datetime.utcnow()

        db.session.commit()

        return jsonify({
            'message': 'Enquiry status updated',
            'enquiry': enquiry.to_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@enquiry_bp.route('/admin/<int:enquiry_id>', methods=['DELETE'])
@jwt_required()
def delete_enquiry(enquiry_id):
    """Delete an enquiry - admin only"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403

        enquiry = Enquiry.query.get(enquiry_id)
        if not enquiry:
            return jsonify({'error': 'Enquiry not found'}), 404

        db.session.delete(enquiry)
        db.session.commit()

        return jsonify({'message': 'Enquiry deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

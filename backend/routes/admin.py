"""
Admin routes - Property approval and management
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.property import Property
from models.user import User
from models.booking import Booking
from models.enquiry import Enquiry
from extensions import db
from datetime import datetime

admin_bp = Blueprint('admin', __name__)

def admin_required():
    """Check if user is admin"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or user.role != 'admin':
        return None
    return user

# ── Properties ────────────────────────────────────────────────────────────────

@admin_bp.route('/properties/pending', methods=['GET'])
@jwt_required()
def get_pending_properties():
    """Get all pending properties"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        properties = Property.query.filter_by(status='pending').all()
        return jsonify({'properties': [p.to_dict() for p in properties]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/properties/approved', methods=['GET'])
@jwt_required()
def get_approved_properties():
    """Get all approved properties"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        properties = Property.query.filter_by(status='approved').all()
        return jsonify({'properties': [p.to_dict() for p in properties]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/properties/rejected', methods=['GET'])
@jwt_required()
def get_rejected_properties():
    """Get all rejected properties"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        properties = Property.query.filter_by(status='rejected').all()
        return jsonify({'properties': [p.to_dict() for p in properties]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/properties/<int:property_id>/approve', methods=['PUT'])
@jwt_required()
def approve_property(property_id):
    """Approve a property"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        property = Property.query.get(property_id)
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        property.status = 'approved'
        property.approved_at = datetime.utcnow()
        property.rejected_at = None
        property.rejection_reason = None
        db.session.commit()
        return jsonify({'message': 'Property approved successfully', 'property': property.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/properties/<int:property_id>/reject', methods=['PUT'])
@jwt_required()
def reject_property(property_id):
    """Reject a property"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        property = Property.query.get(property_id)
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        data = request.get_json()
        property.status = 'rejected'
        property.rejected_at = datetime.utcnow()
        property.approved_at = None
        property.rejection_reason = data.get('reason', '')
        db.session.commit()
        return jsonify({'message': 'Property rejected successfully', 'property': property.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/properties/<int:property_id>', methods=['DELETE'])
@jwt_required()
def delete_property(property_id):
    """Delete a property permanently"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        property = Property.query.get(property_id)
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        db.session.delete(property)
        db.session.commit()
        return jsonify({'message': 'Property deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ── Stats ─────────────────────────────────────────────────────────────────────

@admin_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_admin_stats():
    """Get admin dashboard statistics"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403

        return jsonify({
            'properties': {
                'total': Property.query.count(),
                'pending': Property.query.filter_by(status='pending').count(),
                'approved': Property.query.filter_by(status='approved').count(),
                'rejected': Property.query.filter_by(status='rejected').count()
            },
            'users': {
                'total': User.query.count(),
                'customers': User.query.filter_by(role='customer').count(),
                'owners': User.query.filter_by(role='owner').count()
            },
            'bookings': {
                'total': Booking.query.count(),
                'pending': Booking.query.filter_by(status='pending').count(),
                'confirmed': Booking.query.filter_by(status='confirmed').count()
            },
            'enquiries': {
                'total': Enquiry.query.count(),
                'new': Enquiry.query.filter_by(status='new').count(),
                'resolved': Enquiry.query.filter_by(status='resolved').count()
            }
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ── Users ─────────────────────────────────────────────────────────────────────

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    """Get all users"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        users = User.query.all()
        return jsonify({'users': [u.to_dict() for u in users]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ── Enquiries ─────────────────────────────────────────────────────────────────

@admin_bp.route('/enquiries', methods=['GET'])
@jwt_required()
def get_admin_enquiries():
    """Get all enquiries"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        status_filter = request.args.get('status')
        query = Enquiry.query
        if status_filter:
            query = query.filter_by(status=status_filter)
        enquiries = query.order_by(Enquiry.created_at.desc()).all()
        return jsonify({'enquiries': [e.to_dict() for e in enquiries], 'total': len(enquiries)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/enquiries/<int:enquiry_id>/status', methods=['PUT'])
@jwt_required()
def update_enquiry_status(enquiry_id):
    """Update enquiry status"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        enquiry = Enquiry.query.get(enquiry_id)
        if not enquiry:
            return jsonify({'error': 'Enquiry not found'}), 404
        data = request.get_json()
        enquiry.status = data.get('status', enquiry.status)
        if 'admin_notes' in data:
            enquiry.admin_notes = data['admin_notes']
        enquiry.updated_at = datetime.utcnow()
        db.session.commit()
        return jsonify({'message': 'Enquiry updated', 'enquiry': enquiry.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/enquiries/<int:enquiry_id>', methods=['DELETE'])
@jwt_required()
def delete_enquiry(enquiry_id):
    """Delete an enquiry"""
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

# ── Bookings ──────────────────────────────────────────────────────────────────

@admin_bp.route('/bookings', methods=['GET'])
@jwt_required()
def get_all_bookings():
    """Get all bookings with enriched property + customer details"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        status_filter = request.args.get('status')
        query = Booking.query
        if status_filter:
            query = query.filter_by(status=status_filter)
        bookings = query.order_by(Booking.created_at.desc()).all()

        result = []
        for b in bookings:
            d = b.to_dict()
            # Attach property details
            prop = Property.query.get(b.property_id)
            if prop:
                d['property_name'] = prop.name
                d['property_type'] = prop.type
                d['property_city'] = prop.city
                d['property_area'] = prop.area
            # Attach customer details if not already on booking record
            if not d.get('customer_name'):
                user = User.query.get(b.customer_id)
                if user:
                    d['customer_name'] = user.full_name
                    d['customer_email'] = user.email
                    d['customer_phone'] = user.phone
            result.append(d)

        return jsonify({'bookings': result, 'total': len(result)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/bookings/<int:booking_id>/status', methods=['PUT'])
@jwt_required()
def update_booking_status(booking_id):
    """Update booking status (confirm or cancel)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        booking = Booking.query.get(booking_id)
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        data = request.get_json()
        new_status = data.get('status')
        if new_status not in ['pending', 'confirmed', 'cancelled']:
            return jsonify({'error': 'Invalid status'}), 400
        booking.status = new_status
        if new_status == 'confirmed':
            booking.confirmed_at = datetime.utcnow()
        elif new_status == 'cancelled':
            booking.cancelled_at = datetime.utcnow()
        booking.updated_at = datetime.utcnow()
        db.session.commit()
        return jsonify({'message': f'Booking {new_status}', 'booking': booking.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

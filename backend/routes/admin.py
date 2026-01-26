"""
Admin routes - Property approval and management
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.property import Property
from models.user import User
from models.booking import Booking
from extensions import db
from datetime import datetime

admin_bp = Blueprint('admin', __name__)

def admin_required():
    """Decorator to check if user is admin"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user or user.role != 'admin':
        return None
    return user

@admin_bp.route('/properties/pending', methods=['GET'])
@jwt_required()
def get_pending_properties():
    """Get all pending properties"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        properties = Property.query.filter_by(status='pending').all()
        
        return jsonify({
            'properties': [prop.to_dict() for prop in properties]
        }), 200
        
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
        
        return jsonify({
            'message': 'Property approved successfully',
            'property': property.to_dict()
        }), 200
        
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
        
        return jsonify({
            'message': 'Property rejected successfully',
            'property': property.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_admin_stats():
    """Get admin dashboard statistics"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        # Property stats
        total_properties = Property.query.count()
        pending_properties = Property.query.filter_by(status='pending').count()
        approved_properties = Property.query.filter_by(status='approved').count()
        rejected_properties = Property.query.filter_by(status='rejected').count()
        
        # User stats
        total_users = User.query.count()
        customers = User.query.filter_by(role='customer').count()
        owners = User.query.filter_by(role='owner').count()
        
        # Booking stats
        total_bookings = Booking.query.count()
        pending_bookings = Booking.query.filter_by(status='pending').count()
        confirmed_bookings = Booking.query.filter_by(status='confirmed').count()
        
        return jsonify({
            'properties': {
                'total': total_properties,
                'pending': pending_properties,
                'approved': approved_properties,
                'rejected': rejected_properties
            },
            'users': {
                'total': total_users,
                'customers': customers,
                'owners': owners
            },
            'bookings': {
                'total': total_bookings,
                'pending': pending_bookings,
                'confirmed': confirmed_bookings
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    """Get all users"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        users = User.query.all()
        
        return jsonify({
            'users': [user.to_dict() for user in users]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

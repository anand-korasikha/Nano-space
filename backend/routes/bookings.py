"""
Booking routes - Create and manage bookings
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.booking import Booking
from models.property import Property
from models.user import User
from extensions import db
from datetime import datetime

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/', methods=['POST'])
@jwt_required()
def create_booking():
    """Create a new booking"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['property_id', 'total_amount']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if property exists
        property = Property.query.get(data['property_id'])
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        # Create booking
        booking = Booking(
            customer_id=current_user_id,
            property_id=data['property_id'],
            booking_type=data.get('booking_type'),
            quantity=data.get('quantity', 1),
            start_date=datetime.fromisoformat(data['start_date']) if 'start_date' in data else datetime.utcnow(),
            end_date=datetime.fromisoformat(data['end_date']) if 'end_date' in data else None,
            total_amount=data['total_amount'],
            customer_name=data.get('customer_name'),
            customer_email=data.get('customer_email'),
            customer_phone=data.get('customer_phone'),
            notes=data.get('notes')
        )
        
        db.session.add(booking)
        db.session.commit()
        
        return jsonify({
            'message': 'Booking created successfully',
            'booking': booking.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/my-bookings', methods=['GET'])
@jwt_required()
def get_my_bookings():
    """Get bookings for current user"""
    try:
        current_user_id = get_jwt_identity()
        
        bookings = Booking.query.filter_by(customer_id=current_user_id).all()
        
        return jsonify({
            'bookings': [booking.to_dict() for booking in bookings]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<int:booking_id>', methods=['GET'])
@jwt_required()
def get_booking(booking_id):
    """Get a single booking"""
    try:
        current_user_id = get_jwt_identity()
        booking = Booking.query.get(booking_id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        # Check authorization
        if booking.customer_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        return jsonify({
            'booking': booking.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<int:booking_id>/cancel', methods=['PUT'])
@jwt_required()
def cancel_booking(booking_id):
    """Cancel a booking"""
    try:
        current_user_id = get_jwt_identity()
        booking = Booking.query.get(booking_id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        # Check authorization
        if booking.customer_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        booking.status = 'cancelled'
        booking.cancelled_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Booking cancelled successfully',
            'booking': booking.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

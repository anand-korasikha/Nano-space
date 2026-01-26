"""
Property routes - CRUD operations for properties
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.property import Property
from models.user import User
from extensions import db
from datetime import datetime

properties_bp = Blueprint('properties', __name__)

@properties_bp.route('/', methods=['GET'])
def get_properties():
    """Get all approved properties with optional filters"""
    try:
        # Get query parameters
        property_type = request.args.get('type')
        city = request.args.get('city')
        status = request.args.get('status', 'approved')
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        # Build query
        query = Property.query
        
        if status:
            query = query.filter_by(status=status)
        if property_type:
            query = query.filter_by(type=property_type)
        if city:
            query = query.filter_by(city=city)
        
        # Paginate
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'properties': [prop.to_dict() for prop in pagination.items],
            'total': pagination.total,
            'page': page,
            'per_page': per_page,
            'pages': pagination.pages
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/<int:property_id>', methods=['GET'])
def get_property(property_id):
    """Get a single property by ID"""
    try:
        property = Property.query.get(property_id)
        
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        return jsonify({
            'property': property.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/', methods=['POST'])
@jwt_required()
def create_property():
    """Create a new property (owner only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.role not in ['owner', 'admin']:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'type', 'city', 'address']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Create property
        property = Property(
            owner_id=current_user_id,
            name=data['name'],
            type=data['type'],
            description=data.get('description'),
            city=data['city'],
            area=data.get('area'),
            address=data['address'],
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            price_per_seat=data.get('price_per_seat'),
            price_per_cabin=data.get('price_per_cabin'),
            price_per_month=data.get('price_per_month'),
            price_per_day=data.get('price_per_day'),
            total_seats=data.get('total_seats'),
            available_seats=data.get('available_seats')
        )
        
        # Set amenities and images
        if 'amenities' in data:
            property.set_amenities(data['amenities'])
        if 'images' in data:
            property.set_images(data['images'])
        
        db.session.add(property)
        db.session.commit()
        
        return jsonify({
            'message': 'Property created successfully',
            'property': property.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/<int:property_id>', methods=['PUT'])
@jwt_required()
def update_property(property_id):
    """Update a property (owner only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        property = Property.query.get(property_id)
        
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        # Check authorization
        if user.role != 'admin' and property.owner_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        # Update fields
        updatable_fields = [
            'name', 'description', 'city', 'area', 'address',
            'latitude', 'longitude', 'price_per_seat', 'price_per_cabin',
            'price_per_month', 'price_per_day', 'total_seats', 'available_seats'
        ]
        
        for field in updatable_fields:
            if field in data:
                setattr(property, field, data[field])
        
        if 'amenities' in data:
            property.set_amenities(data['amenities'])
        if 'images' in data:
            property.set_images(data['images'])
        
        db.session.commit()
        
        return jsonify({
            'message': 'Property updated successfully',
            'property': property.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/<int:property_id>', methods=['DELETE'])
@jwt_required()
def delete_property(property_id):
    """Delete a property (owner only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        property = Property.query.get(property_id)
        
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        # Check authorization
        if user.role != 'admin' and property.owner_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        db.session.delete(property)
        db.session.commit()
        
        return jsonify({
            'message': 'Property deleted successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/my-properties', methods=['GET'])
@jwt_required()
def get_my_properties():
    """Get properties owned by current user"""
    try:
        current_user_id = get_jwt_identity()
        
        properties = Property.query.filter_by(owner_id=current_user_id).all()
        
        # Get statistics
        stats = {
            'total': len(properties),
            'pending': len([p for p in properties if p.status == 'pending']),
            'approved': len([p for p in properties if p.status == 'approved']),
            'rejected': len([p for p in properties if p.status == 'rejected'])
        }
        
        return jsonify({
            'properties': [prop.to_dict() for prop in properties],
            'stats': stats
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

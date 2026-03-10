"""
Property routes - CRUD operations for properties
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.property import Property
from extensions import db
from datetime import datetime
from mongo_client import db_mongo
from bson.objectid import ObjectId
import os
import time
import cloudinary
import cloudinary.uploader

cloudinary.config(
    cloud_name="dwybarocp",
    api_key=os.environ.get("CLOUDINARY_API_KEY", "283131215221332"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET", "owAkWZkKnEf9t03SnLR0OAt4okE"),
    secure=True,
)

properties_bp = Blueprint('properties', __name__)

def upload_base64_images(images_list, folder_name):
    """Upload any base64 images in the list to Cloudinary and return the list of secure URLs."""
    urls = []
    for index, img_data in enumerate(images_list):
        if img_data.startswith("data:image"):
            try:
                res = cloudinary.uploader.upload(
                    img_data,
                    folder=f"nanospace/{folder_name}",
                    use_filename=True,
                    unique_filename=True
                )
                urls.append(res.get("secure_url"))
            except Exception as e:
                print(f"Cloudinary upload failed for an image (missing api keys?): {e}")
                urls.append(img_data) # Fallback to base64 if Cloudinary fails
        elif img_data.startswith("http"):
            urls.append(img_data)
    return urls

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
        if request.args.get('featured') == 'true':
            query = query.filter_by(is_featured=True)
        if request.args.get('homepage') == 'true':
            query = query.filter_by(show_on_homepage=True)
        if request.args.get('rent') == 'true':
            query = query.filter_by(show_on_rent=True)
        if request.args.get('buy') == 'true':
            query = query.filter_by(show_on_buy=True)
        
        # Paginate SQLite
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        properties_list = [prop.to_dict() for prop in pagination.items]
        
        # Query MongoDB
        mongo_query = {}
        if status:
            mongo_query['status'] = status
        if property_type:
            mongo_query['type'] = property_type
        if city:
            mongo_query['city'] = city
        if request.args.get('featured') == 'true':
            mongo_query['is_featured'] = True
        if request.args.get('homepage') == 'true':
            mongo_query['show_on_homepage'] = True
        if request.args.get('rent') == 'true':
            mongo_query['show_on_rent'] = True
        if request.args.get('buy') == 'true':
            mongo_query['show_on_buy'] = True
            
        mongo_total = 0
        try:
            mongo_cursor = db_mongo.properties.find(mongo_query)
            for mc in mongo_cursor:
                mc['id'] = str(mc['_id'])
                del mc['_id']
                properties_list.append(mc)
            mongo_total = db_mongo.properties.count_documents(mongo_query)
        except Exception as e:
            print(f"MongoDB connection skipping: {e}")
            
        return jsonify({
            'properties': properties_list,
            'total': pagination.total + mongo_total,
            'page': page,
            'per_page': per_page,
            'pages': pagination.pages
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/<property_id>', methods=['GET'])
def get_property(property_id):
    """Get a single property by ID"""
    try:
        # Check Mongo first
        if len(str(property_id)) == 24:
            try:
                m_prop = db_mongo.properties.find_one({'_id': ObjectId(property_id)})
                if m_prop:
                    m_prop['id'] = str(m_prop['_id'])
                    del m_prop['_id']
                    return jsonify({'property': m_prop}), 200
            except Exception as e:
                return jsonify({'error': 'Failed connecting to MongoDB to fetch property'}), 503
                
        # Fallback to SQLite
        try:
            property = Property.query.get(int(property_id))
        except ValueError:
            property = None
            
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
    """Create a new property — always stored in MongoDB."""
    try:
        current_user_id = get_jwt_identity()
        user = db_mongo.users.find_one({'_id': ObjectId(current_user_id)})

        if not user:
            return jsonify({'error': 'Unauthorized'}), 403

        data = request.get_json()

        required_fields = ['name', 'type', 'city']
        if not all(field in data for field in required_fields):
            return jsonify({'error': f'Missing required fields: {required_fields}'}), 400

        period = data.get('period', 'month')
        price_val = data.get('price')
        try:
            price_val = float(str(price_val).replace('₹', '').replace(',', '').strip()) if price_val else None
        except (ValueError, TypeError):
            price_val = None

        price_per_seat  = price_val if period == 'seat'  else data.get('price_per_seat')
        price_per_day   = price_val if period == 'day'   else data.get('price_per_day')
        price_per_month = price_val if period == 'month' else data.get('price_per_month')

        # Upload base64 images to Cloudinary into a dynamic folder
        folder_name = f"prop_{current_user_id}_{int(time.time())}"
        uploaded_images = upload_base64_images(data.get('images', []), folder_name)

        is_admin = user.get('role') == 'admin'
        mongo_prop = {
            'owner_id': current_user_id,
            'name': data['name'],
            'type': data['type'],
            'description': data.get('description'),
            'city': data['city'],
            'area': data.get('area'),
            'address': data.get('address') or data.get('location') or data['city'],
            'latitude': data.get('latitude') or (data.get('mapLocation', {}) or {}).get('lat'),
            'longitude': data.get('longitude') or (data.get('mapLocation', {}) or {}).get('lng'),
            'price_per_seat': price_per_seat,
            'price_per_cabin': data.get('price_per_cabin'),
            'price_per_month': price_per_month,
            'price_per_day': price_per_day,
            'total_seats': data.get('total_seats'),
            'available_seats': data.get('available_seats'),
            'contact_name': data.get('contactName') or data.get('contact_name') or user.get('full_name'),
            'contact_email': data.get('contactEmail') or data.get('contact_email') or user.get('email'),
            'contact_phone': data.get('contactPhone') or data.get('contact_phone') or user.get('phone'),
            'is_featured': data.get('is_featured', False),
            'show_on_homepage': data.get('show_on_homepage', False),
            'show_on_rent': data.get('show_on_rent', False),
            'show_on_buy': data.get('show_on_buy', False),
            'status': 'approved' if is_admin else 'pending',
            'amenities': data.get('amenities', []),
            'images': uploaded_images,
            'created_at': datetime.utcnow(),
        }
        res = db_mongo.properties.insert_one(mongo_prop)
        mongo_prop['id'] = str(res.inserted_id)
        del mongo_prop['_id']

        return jsonify({
            'message': 'Property created successfully',
            'property': mongo_prop,
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/<property_id>', methods=['PUT'])
def update_property(property_id):
    """Update a property (owner only)"""
    try:
        current_user_id = get_jwt_identity()
        user = db_mongo.users.find_one({'_id': ObjectId(current_user_id)})
        is_mongo = len(str(property_id)) == 24
        
        # Determine owner_id based on storage type
        owner_id = None
        if is_mongo:
            property = db_mongo.properties.find_one({'_id': ObjectId(property_id)})
            if property:
                owner_id = property.get('owner_id')
        else:
            property = Property.query.get(property_id)
            if property:
                owner_id = property.owner_id
                
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        # Check authorization
        if user.get('role') != 'admin' and owner_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        # Update fields
        updatable_fields = [
            'name', 'description', 'city', 'area', 'address',
            'latitude', 'longitude', 'price_per_seat', 'price_per_cabin',
            'price_per_month', 'price_per_day', 'total_seats', 'available_seats',
            'is_featured', 'show_on_homepage', 'show_on_rent', 'show_on_buy', 'status'
        ]
        
        if is_mongo:
            update_data = {}
            for field in updatable_fields:
                if field in data:
                    update_data[field] = data[field]
            if 'amenities' in data:
                update_data['amenities'] = data['amenities']
            if 'images' in data:
                folder_name = f"prop_update_{property_id}"
                uploaded_images = upload_base64_images(data['images'], folder_name)
                update_data['images'] = uploaded_images
                
            db_mongo.properties.update_one(
                {'_id': ObjectId(property_id)},
                {'$set': update_data}
            )
            updated = db_mongo.properties.find_one({'_id': ObjectId(property_id)})
            updated['id'] = str(updated['_id'])
            del updated['_id']
            return jsonify({
                'message': 'Property updated successfully in MongoDB',
                'property': updated
            }), 200
        else:
            for field in updatable_fields:
                if field in data:
                    setattr(property, field, data[field])
            
            if 'amenities' in data:
                property.set_amenities(data['amenities'])
            if 'images' in data:
                folder_name = f"prop_update_sqlite_{property_id}"
                uploaded_images = upload_base64_images(data['images'], folder_name)
                property.set_images(uploaded_images)
            
            db.session.commit()
            return jsonify({
                'message': 'Property updated successfully in SQLite',
                'property': property.to_dict()
            }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/<property_id>', methods=['DELETE'])
@jwt_required()
def delete_property(property_id):
    """Delete a property (owner only)"""
    try:
        current_user_id = get_jwt_identity()
        user = db_mongo.users.find_one({'_id': ObjectId(current_user_id)})
        
        if len(str(property_id)) == 24:
            property_mongo = db_mongo.properties.find_one({'_id': ObjectId(property_id)})
            if not property_mongo:
                return jsonify({'error': 'Property not found'}), 404
            if user.get('role') != 'admin' and property_mongo.get('owner_id') != current_user_id:
                return jsonify({'error': 'Unauthorized'}), 403
            
            db_mongo.properties.delete_one({'_id': ObjectId(property_id)})
            return jsonify({'message': 'Property deleted successfully from MongoDB'}), 200
        else:
            try:
                property = Property.query.get(int(property_id))
            except ValueError:
                property = None
                
            if not property:
                return jsonify({'error': 'Property not found'}), 404
            
            # Check authorization
            if user.get('role') != 'admin' and property.owner_id != current_user_id:
                return jsonify({'error': 'Unauthorized'}), 403
            
            db.session.delete(property)
            db.session.commit()
            return jsonify({'message': 'Property deleted successfully from SQLite'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/my-properties', methods=['GET'])
@jwt_required()
def get_my_properties():
    """Get properties owned by current user — from MongoDB only."""
    try:
        current_user_id = get_jwt_identity()

        properties_list = []

        # MongoDB properties
        m_props = list(db_mongo.properties.find({'owner_id': current_user_id}).sort('created_at', -1))
        for mc in m_props:
            mc['id'] = str(mc['_id'])
            del mc['_id']
            properties_list.append(mc)

        stats = {
            'total': len(properties_list),
            'pending': sum(1 for p in properties_list if p.get('status') == 'pending'),
            'approved': sum(1 for p in properties_list if p.get('status') == 'approved'),
            'rejected': sum(1 for p in properties_list if p.get('status') == 'rejected'),
        }

        return jsonify({'properties': properties_list, 'stats': stats}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

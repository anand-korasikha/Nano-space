"""
Admin routes - Property approval and management
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.property import Property
from extensions import db
from datetime import datetime
from mongo_client import db_mongo
from bson.objectid import ObjectId

admin_bp = Blueprint('admin', __name__)


def _admin_user_to_dict(u):
    return {
        'id': str(u['_id']),
        'email': u.get('email'),
        'phone': u.get('phone'),
        'full_name': u.get('full_name'),
        'role': u.get('role', 'customer'),
        'email_verified': u.get('email_verified', False),
        'phone_verified': u.get('phone_verified', False),
        'created_at': u['created_at'].isoformat() if u.get('created_at') else None,
        'last_login': u['last_login'].isoformat() if u.get('last_login') else None,
    }


def _booking_to_dict(b):
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
        'property_name': b.get('property_name'),
        'property_type': b.get('property_type'),
        'property_city': b.get('property_city'),
    }


def admin_required():
    """Return MongoDB user doc if current JWT user is admin, else None."""
    try:
        current_user_id = get_jwt_identity()
        user = db_mongo.users.find_one({'_id': ObjectId(current_user_id)})
        if not user or user.get('role') != 'admin':
            return None
        return user
    except Exception:
        return None

# ── Properties ────────────────────────────────────────────────────────────────

@admin_bp.route('/properties/pending', methods=['GET'])
@jwt_required()
def get_pending_properties():
    """Get all pending properties"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        properties = Property.query.filter_by(status='pending').all()
        properties_list = [p.to_dict() for p in properties]
        
        mongo_props = db_mongo.properties.find({'status': 'pending'})
        for mc in mongo_props:
            mc['id'] = str(mc['_id'])
            del mc['_id']
            properties_list.append(mc)
            
        return jsonify({'properties': properties_list}), 200
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
        properties_list = [p.to_dict() for p in properties]
        
        mongo_props = db_mongo.properties.find({'status': 'approved'})
        for mc in mongo_props:
            mc['id'] = str(mc['_id'])
            del mc['_id']
            properties_list.append(mc)
            
        return jsonify({'properties': properties_list}), 200
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
        properties_list = [p.to_dict() for p in properties]
        
        mongo_props = db_mongo.properties.find({'status': 'rejected'})
        for mc in mongo_props:
            mc['id'] = str(mc['_id'])
            del mc['_id']
            properties_list.append(mc)
            
        return jsonify({'properties': properties_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/properties/<property_id>/approve', methods=['PUT'])
@jwt_required()
def approve_property(property_id):
    """Approve a property"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
            
        if len(str(property_id)) == 24:
            property = db_mongo.properties.find_one({'_id': ObjectId(property_id)})
            if not property:
                return jsonify({'error': 'Property not found'}), 404
            db_mongo.properties.update_one(
                {'_id': ObjectId(property_id)},
                {'$set': {
                    'status': 'approved', 
                    'approved_at': datetime.utcnow(),
                    'rejected_at': None,
                    'rejection_reason': None
                }}
            )
            updated = db_mongo.properties.find_one({'_id': ObjectId(property_id)})
            updated['id'] = str(updated['_id'])
            del updated['_id']
            return jsonify({'message': 'Property approved successfully in MongoDB', 'property': updated}), 200
        else:
            try:
                property = Property.query.get(int(property_id))
            except ValueError:
                property = None
                
            if not property:
                return jsonify({'error': 'Property not found'}), 404
                
            property.status = 'approved'
            property.approved_at = datetime.utcnow()
            property.rejected_at = None
            property.rejection_reason = None
            db.session.commit()
            return jsonify({'message': 'Property approved successfully in SQLite', 'property': property.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/properties/<property_id>/reject', methods=['PUT'])
@jwt_required()
def reject_property(property_id):
    """Reject a property"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        data = request.get_json()
        
        if len(str(property_id)) == 24:
            property = db_mongo.properties.find_one({'_id': ObjectId(property_id)})
            if not property:
                return jsonify({'error': 'Property not found'}), 404
            db_mongo.properties.update_one(
                {'_id': ObjectId(property_id)},
                {'$set': {
                    'status': 'rejected', 
                    'rejected_at': datetime.utcnow(),
                    'approved_at': None,
                    'rejection_reason': data.get('reason', '')
                }}
            )
            updated = db_mongo.properties.find_one({'_id': ObjectId(property_id)})
            updated['id'] = str(updated['_id'])
            del updated['_id']
            return jsonify({'message': 'Property rejected successfully in MongoDB', 'property': updated}), 200
        else:
            try:
                property = Property.query.get(int(property_id))
            except ValueError:
                property = None
            if not property:
                return jsonify({'error': 'Property not found'}), 404
            
            property.status = 'rejected'
            property.rejected_at = datetime.utcnow()
            property.approved_at = None
            property.rejection_reason = data.get('reason', '')
            db.session.commit()
            return jsonify({'message': 'Property rejected successfully in SQLite', 'property': property.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/properties/<property_id>', methods=['DELETE'])
@jwt_required()
def delete_property(property_id):
    """Delete a property permanently"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
            
        if len(str(property_id)) == 24:
            property = db_mongo.properties.find_one({'_id': ObjectId(property_id)})
            if not property:
                return jsonify({'error': 'Property not found'}), 404
            db_mongo.properties.delete_one({'_id': ObjectId(property_id)})
            return jsonify({'message': 'Property deleted successfully from MongoDB'}), 200
        else:
            try:
                property = Property.query.get(int(property_id))
            except ValueError:
                property = None
            if not property:
                return jsonify({'error': 'Property not found'}), 404
            db.session.delete(property)
            db.session.commit()
            return jsonify({'message': 'Property deleted successfully from SQLite'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ── Stats ─────────────────────────────────────────────────────────────────────

@admin_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_admin_stats():
    """Get admin dashboard statistics — users and bookings from MongoDB."""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403

        return jsonify({
            'properties': {
                'total': Property.query.count() + db_mongo.properties.count_documents({}),
                'pending': Property.query.filter_by(status='pending').count() + db_mongo.properties.count_documents({'status': 'pending'}),
                'approved': Property.query.filter_by(status='approved').count() + db_mongo.properties.count_documents({'status': 'approved'}),
                'rejected': Property.query.filter_by(status='rejected').count() + db_mongo.properties.count_documents({'status': 'rejected'}),
            },
            'users': {
                'total': db_mongo.users.count_documents({}),
                'customers': db_mongo.users.count_documents({'role': 'customer'}),
                'owners': db_mongo.users.count_documents({'role': 'owner'}),
                'admins': db_mongo.users.count_documents({'role': 'admin'}),
            },
            'bookings': {
                'total': db_mongo.bookings.count_documents({}),
                'pending': db_mongo.bookings.count_documents({'status': 'pending'}),
                'confirmed': db_mongo.bookings.count_documents({'status': 'confirmed'}),
                'cancelled': db_mongo.bookings.count_documents({'status': 'cancelled'}),
            },
            'enquiries': {
                'total': db_mongo.enquiries.count_documents({}),
                'new': db_mongo.enquiries.count_documents({'status': 'new'}),
                'resolved': db_mongo.enquiries.count_documents({'status': 'resolved'}),
            },
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ── Users ─────────────────────────────────────────────────────────────────────

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    """Get all users from MongoDB."""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        users = list(db_mongo.users.find({}).sort('created_at', -1))
        return jsonify({'users': [_admin_user_to_dict(u) for u in users]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ── Enquiries ─────────────────────────────────────────────────────────────────

def _enquiry_to_dict(doc):
    doc['id'] = str(doc['_id'])
    doc['_id'] = str(doc['_id'])
    if isinstance(doc.get('created_at'), datetime):
        doc['created_at'] = doc['created_at'].isoformat()
    if isinstance(doc.get('updated_at'), datetime):
        doc['updated_at'] = doc['updated_at'].isoformat()
    return doc

@admin_bp.route('/enquiries', methods=['GET'])
@jwt_required()
def get_admin_enquiries():
    """Get all enquiries from MongoDB"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        status_filter = request.args.get('status')
        mongo_filter = {}
        if status_filter:
            mongo_filter['status'] = status_filter
        enquiries = list(db_mongo.enquiries.find(mongo_filter).sort('created_at', -1))
        result = [_enquiry_to_dict(e) for e in enquiries]
        return jsonify({'enquiries': result, 'total': len(result)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/enquiries/<enquiry_id>/status', methods=['PUT'])
@jwt_required()
def update_enquiry_status(enquiry_id):
    """Update enquiry status in MongoDB"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        data = request.get_json()
        update_fields = {'updated_at': datetime.utcnow()}
        if 'status' in data:
            update_fields['status'] = data['status']
        if 'admin_notes' in data:
            update_fields['admin_notes'] = data['admin_notes']
        doc = db_mongo.enquiries.find_one_and_update(
            {'_id': ObjectId(enquiry_id)},
            {'$set': update_fields},
            return_document=True
        )
        if not doc:
            return jsonify({'error': 'Enquiry not found'}), 404
        return jsonify({'message': 'Enquiry updated', 'enquiry': _enquiry_to_dict(doc)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/enquiries/<enquiry_id>', methods=['DELETE'])
@jwt_required()
def delete_enquiry(enquiry_id):
    """Delete an enquiry from MongoDB"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        result = db_mongo.enquiries.delete_one({'_id': ObjectId(enquiry_id)})
        if result.deleted_count == 0:
            return jsonify({'error': 'Enquiry not found'}), 404
        return jsonify({'message': 'Enquiry deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ── Bookings ──────────────────────────────────────────────────────────────────

@admin_bp.route('/bookings', methods=['GET'])
@jwt_required()
def get_all_bookings():
    """Get all bookings from MongoDB with enriched property + customer details."""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403

        status_filter = request.args.get('status')
        query_filter = {'status': status_filter} if status_filter else {}
        bookings = list(db_mongo.bookings.find(query_filter).sort('created_at', -1))

        result = []
        for b in bookings:
            d = _booking_to_dict(b)

            # Enrich with property details if not cached on booking
            if not d.get('property_name') and d.get('property_id'):
                try:
                    pid = d['property_id']
                    if len(pid) == 24:
                        mp = db_mongo.properties.find_one({'_id': ObjectId(pid)})
                        if mp:
                            d['property_name'] = mp.get('name')
                            d['property_type'] = mp.get('type')
                            d['property_city'] = mp.get('city')
                    else:
                        sp = Property.query.get(int(pid))
                        if sp:
                            d['property_name'] = sp.name
                            d['property_type'] = sp.type
                            d['property_city'] = sp.city
                except Exception:
                    pass

            # Enrich with customer details if not cached on booking
            if not d.get('customer_name') and d.get('customer_id'):
                try:
                    cu = db_mongo.users.find_one({'_id': ObjectId(d['customer_id'])})
                    if cu:
                        d['customer_name'] = cu.get('full_name')
                        d['customer_email'] = cu.get('email')
                        d['customer_phone'] = cu.get('phone')
                except Exception:
                    pass

            result.append(d)

        return jsonify({'bookings': result, 'total': len(result)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/bookings/<booking_id>/status', methods=['PUT'])
@jwt_required()
def update_booking_status(booking_id):
    """Update booking status in MongoDB (confirm or cancel)."""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403

        booking = db_mongo.bookings.find_one({'_id': ObjectId(booking_id)})
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404

        data = request.get_json()
        new_status = data.get('status')
        if new_status not in ['pending', 'confirmed', 'cancelled']:
            return jsonify({'error': 'Invalid status'}), 400

        update_fields = {'status': new_status, 'updated_at': datetime.utcnow()}
        if new_status == 'confirmed':
            update_fields['confirmed_at'] = datetime.utcnow()
        elif new_status == 'cancelled':
            update_fields['cancelled_at'] = datetime.utcnow()

        db_mongo.bookings.update_one({'_id': ObjectId(booking_id)}, {'$set': update_fields})
        booking.update(update_fields)

        return jsonify({'message': f'Booking {new_status}', 'booking': _booking_to_dict(booking)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

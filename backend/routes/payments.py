"""
Payments routes — Razorpay integration for property listing fee
"""

import hmac
import hashlib
import os

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongo_client import db_mongo
from bson.objectid import ObjectId
from datetime import datetime

payments_bp = Blueprint('payments', __name__)

RAZORPAY_KEY_ID     = os.environ.get('RAZORPAY_KEY_ID', 'rzp_test_SP8wRIHJ7wi67D')
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', '00RBP6s2ow1Tojk2kRO5rqo0')
LISTING_FEE_INR     = int(os.environ.get('LISTING_FEE_INR', 2))


def _get_razorpay_client():
    """Return a configured razorpay.Client or raise if keys are missing."""
    if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
        raise ValueError('Razorpay credentials are not configured on the server.')
    import razorpay  # lazy import so the rest of the app works even without the package
    return razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))


# ── Create Order ──────────────────────────────────────────────────────────────

@payments_bp.route('/create-order', methods=['POST'])
@jwt_required()
def create_order():
    """Create a Razorpay order for the property listing fee."""
    try:
        current_user_id = get_jwt_identity()
        user = db_mongo.users.find_one({'_id': ObjectId(current_user_id)})
        if not user:
            return jsonify({'error': 'User not found'}), 404

        data = request.get_json() or {}
        amount_paise = LISTING_FEE_INR * 100  # Razorpay works in paise

        client = _get_razorpay_client()
        # Razorpay receipt must be ≤ 40 chars
        receipt_id = f"lst_{current_user_id[-14:]}_{int(datetime.utcnow().timestamp())}"
        order = client.order.create({
            'amount': amount_paise,
            'currency': 'INR',
            'receipt': receipt_id,
            'notes': {
                'owner_id': current_user_id,
                'property_name': data.get('property_name', 'Property Listing'),
            },
        })

        # Persist a pending payment record so we can track it
        payment_doc = {
            'razorpay_order_id': order['id'],
            'amount': amount_paise,
            'currency': 'INR',
            'status': 'pending',
            'owner_id': current_user_id,
            'owner_name': user.get('full_name', ''),
            'owner_email': user.get('email', ''),
            'property_name': data.get('property_name', ''),
            'created_at': datetime.utcnow(),
        }
        db_mongo.payments.insert_one(payment_doc)

        return jsonify({
            'order_id': order['id'],
            'amount': amount_paise,
            'currency': 'INR',
            'key': RAZORPAY_KEY_ID,
            'listing_fee': LISTING_FEE_INR,
        }), 200

    except ValueError as exc:
        return jsonify({'error': str(exc)}), 503
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500


# ── Verify Payment & Create Property ─────────────────────────────────────────

@payments_bp.route('/verify', methods=['POST'])
@jwt_required()
def verify_payment():
    """Verify Razorpay signature, update payment record, and create the property listing."""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json() or {}

        razorpay_order_id   = data.get('razorpay_order_id', '')
        razorpay_payment_id = data.get('razorpay_payment_id', '')
        razorpay_signature  = data.get('razorpay_signature', '')
        property_data       = data.get('property_data', {})

        if not all([razorpay_order_id, razorpay_payment_id, razorpay_signature]):
            return jsonify({'error': 'Missing payment details'}), 400

        # HMAC-SHA256 signature verification (constant-time compare)
        body = f'{razorpay_order_id}|{razorpay_payment_id}'
        expected_sig = hmac.new(
            RAZORPAY_KEY_SECRET.encode('utf-8'),
            body.encode('utf-8'),
            hashlib.sha256,
        ).hexdigest()

        if not hmac.compare_digest(expected_sig, razorpay_signature):
            db_mongo.payments.update_one(
                {'razorpay_order_id': razorpay_order_id},
                {'$set': {'status': 'failed', 'failed_at': datetime.utcnow()}},
            )
            return jsonify({'error': 'Payment signature verification failed'}), 400

        # Mark payment as successful
        db_mongo.payments.update_one(
            {'razorpay_order_id': razorpay_order_id},
            {'$set': {
                'status': 'paid',
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature,
                'paid_at': datetime.utcnow(),
            }},
        )

        # Create the property listing in MongoDB
        user = db_mongo.users.find_one({'_id': ObjectId(current_user_id)})
        is_admin = (user or {}).get('role') == 'admin'

        period    = property_data.get('period', 'month')
        price_raw = property_data.get('price')
        try:
            price_val = float(
                str(price_raw).replace('₹', '').replace(',', '').strip()
            ) if price_raw else None
        except (ValueError, TypeError):
            price_val = None

        map_loc = property_data.get('mapLocation') or {}
        mongo_prop = {
            'owner_id':         current_user_id,
            'name':             property_data.get('name', ''),
            'type':             property_data.get('type', 'Coworking'),
            'description':      property_data.get('description', ''),
            'city':             property_data.get('city', ''),
            'address':          property_data.get('location') or property_data.get('address') or property_data.get('city', ''),
            'latitude':         map_loc.get('lat'),
            'longitude':        map_loc.get('lng'),
            'price_per_month':  price_val if period == 'month' else None,
            'price_per_day':    price_val if period == 'day'   else None,
            'price_per_seat':   price_val if period in ('seat', 'hour') else None,
            'status':           'approved' if is_admin else 'pending',
            'amenities':        property_data.get('amenities', []),
            'images':           property_data.get('images', []),
            'badge':            property_data.get('badge', 'Popular'),
            'contact_name':     (user or {}).get('full_name', ''),
            'contact_email':    (user or {}).get('email', ''),
            'contact_phone':    (user or {}).get('phone', ''),
            'is_featured':      False,
            'show_on_homepage': False,
            'show_on_rent':     False,
            'show_on_buy':      False,
            'payment_order_id': razorpay_order_id,
            'payment_id':       razorpay_payment_id,
            'created_at':       datetime.utcnow(),
        }
        result      = db_mongo.properties.insert_one(mongo_prop)
        property_id = str(result.inserted_id)

        # Link property to the payment record
        db_mongo.payments.update_one(
            {'razorpay_order_id': razorpay_order_id},
            {'$set': {'property_id': property_id, 'property_name': mongo_prop['name']}},
        )

        return jsonify({
            'message': 'Payment verified and property listing created successfully',
            'property_id': property_id,
        }), 200

    except Exception as exc:
        return jsonify({'error': str(exc)}), 500


# ── Admin: List All Payments ──────────────────────────────────────────────────

@payments_bp.route('/', methods=['GET'])
@jwt_required()
def get_payments():
    """Return all payment records — admin only."""
    try:
        current_user_id = get_jwt_identity()
        user = db_mongo.users.find_one({'_id': ObjectId(current_user_id)})
        if not user or user.get('role') != 'admin':
            return jsonify({'error': 'Admin access required'}), 403

        status_filter = request.args.get('status')
        page          = request.args.get('page', 1, type=int)
        per_page      = request.args.get('per_page', 50, type=int)

        query = {}
        if status_filter:
            query['status'] = status_filter

        total    = db_mongo.payments.count_documents(query)
        skip     = (page - 1) * per_page
        records  = list(
            db_mongo.payments.find(query)
            .sort('created_at', -1)
            .skip(skip)
            .limit(per_page)
        )

        for rec in records:
            rec['id'] = str(rec['_id'])
            del rec['_id']
            # Serialize datetime fields
            for field in ('created_at', 'paid_at', 'failed_at'):
                if field in rec and hasattr(rec[field], 'isoformat'):
                    rec[field] = rec[field].isoformat()
            # Drop heavy nested payload to keep response lean
            rec.pop('razorpay_signature', None)

        return jsonify({
            'payments': records,
            'total':    total,
            'page':     page,
            'per_page': per_page,
        }), 200

    except Exception as exc:
        return jsonify({'error': str(exc)}), 500

"""
OTP routes - Send and verify OTP for email/phone
"""

from flask import Blueprint, request, jsonify
from models.otp import OTP
from models.user import User
from extensions import db
from services.email_service import send_email_otp
from services.sms_service import send_sms_otp
from datetime import datetime

otp_bp = Blueprint('otp', __name__)

@otp_bp.route('/send-email', methods=['POST'])
def send_email_otp_route():
    """Send OTP to email"""
    try:
        data = request.get_json()
        
        if 'email' not in data:
            return jsonify({'error': 'Email is required'}), 400
        
        email = data['email']
        
        # Delete any existing OTPs for this email
        OTP.query.filter_by(identifier=email).delete()
        
        # Create new OTP
        otp = OTP.create_otp(email)
        db.session.add(otp)
        db.session.commit()
        
        # Send OTP via email
        send_email_otp(email, otp.otp_code)
        
        return jsonify({
            'message': f'OTP sent to {email}',
            'expires_in': 300  # 5 minutes in seconds
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@otp_bp.route('/send-sms', methods=['POST'])
def send_sms_otp_route():
    """Send OTP to phone"""
    try:
        data = request.get_json()
        
        if 'phone' not in data:
            return jsonify({'error': 'Phone number is required'}), 400
        
        phone = data['phone']
        
        # Delete any existing OTPs for this phone
        OTP.query.filter_by(identifier=phone).delete()
        
        # Create new OTP
        otp = OTP.create_otp(phone)
        db.session.add(otp)
        db.session.commit()
        
        # Send OTP via SMS
        send_sms_otp(phone, otp.otp_code)
        
        return jsonify({
            'message': f'OTP sent to {phone}',
            'expires_in': 300  # 5 minutes in seconds
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@otp_bp.route('/verify', methods=['POST'])
def verify_otp():
    """Verify OTP"""
    try:
        data = request.get_json()
        
        if 'identifier' not in data or 'otp' not in data:
            return jsonify({'error': 'Identifier and OTP are required'}), 400
        
        identifier = data['identifier']
        entered_otp = data['otp']
        
        # Get the latest OTP for this identifier
        otp = OTP.query.filter_by(identifier=identifier).order_by(OTP.created_at.desc()).first()
        
        if not otp:
            return jsonify({'error': 'OTP not found. Please request a new one.'}), 404
        
        # Verify OTP
        if otp.verify(entered_otp):
            db.session.commit()
            
            # Update user verification status if user exists
            user = User.query.filter(
                (User.email == identifier) | (User.phone == identifier)
            ).first()
            
            if user:
                if '@' in identifier:
                    user.email_verified = True
                else:
                    user.phone_verified = True
                db.session.commit()
            
            return jsonify({
                'message': 'OTP verified successfully',
                'verified': True
            }), 200
        else:
            db.session.commit()
            
            remaining_attempts = 3 - otp.attempts
            
            if remaining_attempts <= 0:
                return jsonify({
                    'error': 'Maximum attempts exceeded. Please request a new OTP.',
                    'verified': False
                }), 400
            
            return jsonify({
                'error': f'Invalid OTP. {remaining_attempts} attempt(s) remaining.',
                'verified': False,
                'remaining_attempts': remaining_attempts
            }), 400
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@otp_bp.route('/resend', methods=['POST'])
def resend_otp():
    """Resend OTP"""
    try:
        data = request.get_json()
        
        if 'identifier' not in data:
            return jsonify({'error': 'Identifier is required'}), 400
        
        identifier = data['identifier']
        
        # Check cooldown
        latest_otp = OTP.query.filter_by(identifier=identifier).order_by(OTP.created_at.desc()).first()
        
        if latest_otp:
            time_since_creation = (datetime.utcnow() - latest_otp.created_at).total_seconds()
            if time_since_creation < 60:  # 60 seconds cooldown
                wait_time = int(60 - time_since_creation)
                return jsonify({
                    'error': f'Please wait {wait_time} seconds before requesting a new OTP.'
                }), 429
        
        # Delete old OTPs
        OTP.query.filter_by(identifier=identifier).delete()
        
        # Create new OTP
        otp = OTP.create_otp(identifier)
        db.session.add(otp)
        db.session.commit()
        
        # Send OTP
        if '@' in identifier:
            send_email_otp(identifier, otp.otp_code)
        else:
            send_sms_otp(identifier, otp.otp_code)
        
        return jsonify({
            'message': f'OTP resent to {identifier}',
            'expires_in': 300
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

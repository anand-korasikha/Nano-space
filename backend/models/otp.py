"""
OTP model for verification
"""

from extensions import db
from datetime import datetime, timedelta
import random

class OTP(db.Model):
    """OTP model for email and phone verification"""
    
    __tablename__ = 'otps'
    
    id = db.Column(db.Integer, primary_key=True)
    identifier = db.Column(db.String(120), nullable=False, index=True)  # email or phone
    otp_code = db.Column(db.String(6), nullable=False)
    
    # Verification tracking
    attempts = db.Column(db.Integer, default=0)
    verified = db.Column(db.Boolean, default=False)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    verified_at = db.Column(db.DateTime)
    
    @staticmethod
    def generate_otp():
        """Generate a 6-digit OTP"""
        return str(random.randint(100000, 999999))
    
    @staticmethod
    def create_otp(identifier, expiry_minutes=5):
        """Create a new OTP for identifier"""
        otp_code = OTP.generate_otp()
        expires_at = datetime.utcnow() + timedelta(minutes=expiry_minutes)
        
        otp = OTP(
            identifier=identifier,
            otp_code=otp_code,
            expires_at=expires_at
        )
        
        return otp
    
    def is_expired(self):
        """Check if OTP is expired"""
        return datetime.utcnow() > self.expires_at
    
    def is_valid(self):
        """Check if OTP is still valid"""
        return not self.is_expired() and not self.verified and self.attempts < 3
    
    def verify(self, entered_otp):
        """Verify the OTP"""
        if not self.is_valid():
            return False
        
        self.attempts += 1
        
        if self.otp_code == entered_otp:
            self.verified = True
            self.verified_at = datetime.utcnow()
            return True
        
        return False
    
    def to_dict(self):
        """Convert OTP to dictionary"""
        return {
            'id': self.id,
            'identifier': self.identifier,
            'attempts': self.attempts,
            'verified': self.verified,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'expires_at': self.expires_at.isoformat() if self.expires_at else None
        }
    
    def __repr__(self):
        return f'<OTP {self.identifier}>'

from extensions import db
from datetime import datetime, timedelta
import random

class OTP(db.Model):
    __tablename__ = 'otps'
    
    id = db.Column(db.Integer, primary_key=True)
    identifier = db.Column(db.String(120), nullable=False, index=True) # email or phone
    otp_code = db.Column(db.String(6), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    attempts = db.Column(db.Integer, default=0)
    is_used = db.Column(db.Boolean, default=False)

    @classmethod
    def create_otp(cls, identifier):
        """Create a new OTP for an identifier"""
        # Expiry time (5 minutes)
        expires_at = datetime.utcnow() + timedelta(minutes=5)
        
        # Generate 6-digit code
        otp_code = "".join([str(random.randint(0, 9)) for _ in range(6)])
        
        return cls(
            identifier=identifier,
            otp_code=otp_code,
            expires_at=expires_at
        )

    def verify(self, entered_code):
        """Verify the OTP code"""
        self.attempts += 1
        
        if self.is_used:
            return False
            
        if datetime.utcnow() > self.expires_at:
            return False
            
        if self.attempts > 3:
            return False
            
        if self.otp_code == entered_code:
            self.is_used = True
            return True
            
        return False

    def __repr__(self):
        return f'<OTP {self.identifier}:{self.otp_code}>'

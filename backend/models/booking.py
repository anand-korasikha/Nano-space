"""
Booking model for property reservations
"""

from extensions import db
from datetime import datetime

class Booking(db.Model):
    """Booking model for property reservations"""
    
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False, index=True)
    
    # Booking details
    booking_type = db.Column(db.String(50))  # seat, cabin, room, day, month
    quantity = db.Column(db.Integer, default=1)
    
    # Dates
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime)
    
    # Pricing
    total_amount = db.Column(db.Float, nullable=False)
    
    # Status
    status = db.Column(db.String(20), default='pending', index=True)  # pending, confirmed, cancelled
    
    # Contact info
    customer_name = db.Column(db.String(100))
    customer_email = db.Column(db.String(120))
    customer_phone = db.Column(db.String(20))
    
    # Additional notes
    notes = db.Column(db.Text)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    confirmed_at = db.Column(db.DateTime)
    cancelled_at = db.Column(db.DateTime)
    
    def to_dict(self):
        """Convert booking to dictionary"""
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'property_id': self.property_id,
            'booking_type': self.booking_type,
            'quantity': self.quantity,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'total_amount': self.total_amount,
            'status': self.status,
            'customer_name': self.customer_name,
            'customer_email': self.customer_email,
            'customer_phone': self.customer_phone,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'confirmed_at': self.confirmed_at.isoformat() if self.confirmed_at else None
        }
    
    def __repr__(self):
        return f'<Booking {self.id} - Property {self.property_id}>'

"""
Enquiry model for storing contact/enquiry form submissions
"""

from extensions import db
from datetime import datetime


class Enquiry(db.Model):
    """Stores all enquiry/contact form submissions from the website"""

    __tablename__ = 'enquiries'

    id = db.Column(db.Integer, primary_key=True)

    # Who submitted the enquiry
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))

    # What they are enquiring about
    enquiry_type = db.Column(db.String(50), default='general')
    # e.g. 'coworking', 'coliving', 'virtual_office', 'event_space',
    #      'party_hall', 'hotel_room', 'private_theatre', 'general', 'sell', 'buy', 'rent'

    subject = db.Column(db.String(200))
    message = db.Column(db.Text)

    # Optional: city / property context
    city = db.Column(db.String(100))
    property_name = db.Column(db.String(200))
    property_type = db.Column(db.String(100))

    # Optional numeric data
    budget = db.Column(db.String(100))
    seats_required = db.Column(db.Integer)
    move_in_date = db.Column(db.String(50))

    # Admin tracking
    status = db.Column(db.String(20), default='new', index=True)
    # 'new', 'contacted', 'resolved', 'closed'
    admin_notes = db.Column(db.Text)

    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        """Convert enquiry to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'enquiry_type': self.enquiry_type,
            'subject': self.subject,
            'message': self.message,
            'city': self.city,
            'property_name': self.property_name,
            'property_type': self.property_type,
            'budget': self.budget,
            'seats_required': self.seats_required,
            'move_in_date': self.move_in_date,
            'status': self.status,
            'admin_notes': self.admin_notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

    def __repr__(self):
        return f'<Enquiry {self.id} - {self.name} ({self.enquiry_type})>'

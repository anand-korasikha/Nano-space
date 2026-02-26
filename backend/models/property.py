"""
Property model for managing listings
"""

from extensions import db
from datetime import datetime
import json

class Property(db.Model):
    """Property model for coworking, coliving, virtual office, etc."""
    
    __tablename__ = 'properties'
    
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    
    # Property details
    name = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False, index=True)  # coworking, coliving, virtualoffice, etc.
    description = db.Column(db.Text)
    
    # Location
    city = db.Column(db.String(100), nullable=False, index=True)
    area = db.Column(db.String(100))
    address = db.Column(db.Text, nullable=False)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    
    # Pricing
    price_per_seat = db.Column(db.Float)
    price_per_cabin = db.Column(db.Float)
    price_per_month = db.Column(db.Float)
    price_per_day = db.Column(db.Float)
    
    # Features (stored as JSON)
    amenities = db.Column(db.Text)  # JSON array
    images = db.Column(db.Text)  # JSON array of image URLs
    
    # Capacity
    total_seats = db.Column(db.Integer)
    available_seats = db.Column(db.Integer)
    
    # Status
    status = db.Column(db.String(20), default='pending', index=True)  # pending, approved, rejected
    rejection_reason = db.Column(db.Text)

    # Visibility & Promotions
    is_featured = db.Column(db.Boolean, default=False, index=True)
    show_on_homepage = db.Column(db.Boolean, default=False, index=True)
    show_on_rent = db.Column(db.Boolean, default=False, index=True)
    show_on_buy = db.Column(db.Boolean, default=False, index=True)

    # Contact info (submitted by owner)
    contact_name = db.Column(db.String(100))
    contact_email = db.Column(db.String(120))
    contact_phone = db.Column(db.String(20))

    # Timestamps
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    approved_at = db.Column(db.DateTime)
    rejected_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    bookings = db.relationship('Booking', backref='property', lazy='dynamic', cascade='all, delete-orphan')
    
    def set_amenities(self, amenities_list):
        """Set amenities from list"""
        self.amenities = json.dumps(amenities_list)
    
    def get_amenities(self):
        """Get amenities as list"""
        return json.loads(self.amenities) if self.amenities else []
    
    def set_images(self, images_list):
        """Set images from list"""
        self.images = json.dumps(images_list)
    
    def get_images(self):
        """Get images as list"""
        return json.loads(self.images) if self.images else []
    
    def to_dict(self):
        """Convert property to dictionary"""
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'type': self.type,
            'description': self.description,
            'city': self.city,
            'area': self.area,
            'address': self.address,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'price_per_seat': self.price_per_seat,
            'price_per_cabin': self.price_per_cabin,
            'price_per_month': self.price_per_month,
            'price_per_day': self.price_per_day,
            'amenities': self.get_amenities(),
            'images': self.get_images(),
            'total_seats': self.total_seats,
            'available_seats': self.available_seats,
            'status': self.status,
            'is_featured': self.is_featured,
            'show_on_homepage': self.show_on_homepage,
            'show_on_rent': self.show_on_rent,
            'show_on_buy': self.show_on_buy,
            'rejection_reason': self.rejection_reason,
            'contact_name': self.contact_name,
            'contact_email': self.contact_email,
            'contact_phone': self.contact_phone,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None,
            'approved_at': self.approved_at.isoformat() if self.approved_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Property {self.name} ({self.type})>'

"""
City-based data models for coworking, coliving, event spaces, etc.
"""

from extensions import db
from datetime import datetime
import json

class CoworkingSpace(db.Model):
    """Coworking space listings by city"""
    
    __tablename__ = 'coworking_spaces'
    
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100), nullable=False, index=True)
    space_id = db.Column(db.Integer, nullable=False)  # ID within city
    
    # Basic info
    name = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200))
    image = db.Column(db.String(500))
    images = db.Column(db.Text)  # JSON array
    
    # Pricing and rating
    rating = db.Column(db.Float)
    price = db.Column(db.String(100))
    period = db.Column(db.String(50))
    badge = db.Column(db.String(50))
    
    # Features
    amenities = db.Column(db.Text)  # JSON array
    capacity = db.Column(db.String(100))
    
    # City-level data
    city_name = db.Column(db.String(100))
    hero_image = db.Column(db.String(500))
    description = db.Column(db.Text)
    popular_locations = db.Column(db.Text)  # JSON array
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def set_images(self, images_list):
        self.images = json.dumps(images_list)
    
    def get_images(self):
        return json.loads(self.images) if self.images else []
    
    def set_amenities(self, amenities_list):
        self.amenities = json.dumps(amenities_list)
    
    def get_amenities(self):
        return json.loads(self.amenities) if self.amenities else []
    
    def set_popular_locations(self, locations_list):
        self.popular_locations = json.dumps(locations_list)
    
    def get_popular_locations(self):
        return json.loads(self.popular_locations) if self.popular_locations else []
    
    def to_dict(self):
        return {
            'id': self.space_id,
            'name': self.name,
            'location': self.location,
            'image': self.image,
            'images': self.get_images(),
            'rating': self.rating,
            'price': self.price,
            'period': self.period,
            'badge': self.badge,
            'amenities': self.get_amenities(),
            'capacity': self.capacity
        }
    
    def __repr__(self):
        return f'<CoworkingSpace {self.name} - {self.city}>'


class ColivingSpace(db.Model):
    """Coliving space listings by city"""
    
    __tablename__ = 'coliving_spaces'
    
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100), nullable=False, index=True)
    space_id = db.Column(db.Integer, nullable=False)
    
    # Basic info
    name = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200))
    image = db.Column(db.String(500))
    images = db.Column(db.Text)  # JSON array
    description = db.Column(db.Text)
    
    # Pricing and rating
    rating = db.Column(db.Float)
    price = db.Column(db.String(100))
    period = db.Column(db.String(50))
    badge = db.Column(db.String(50))
    occupancy = db.Column(db.String(100))
    
    # Features
    amenities = db.Column(db.Text)  # JSON array
    
    # City-level data
    city_name = db.Column(db.String(100))
    hero_image = db.Column(db.String(500))
    city_description = db.Column(db.Text)
    popular_locations = db.Column(db.Text)  # JSON array
    promo_cards = db.Column(db.Text)  # JSON
    promo_banner = db.Column(db.Text)  # JSON
    faqs = db.Column(db.Text)  # JSON array
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def set_images(self, images_list):
        self.images = json.dumps(images_list)
    
    def get_images(self):
        return json.loads(self.images) if self.images else []
    
    def set_amenities(self, amenities_list):
        self.amenities = json.dumps(amenities_list)
    
    def get_amenities(self):
        return json.loads(self.amenities) if self.amenities else []
    
    def to_dict(self):
        return {
            'id': self.space_id,
            'name': self.name,
            'location': self.location,
            'image': self.image,
            'images': self.get_images(),
            'description': self.description,
            'rating': self.rating,
            'price': self.price,
            'period': self.period,
            'badge': self.badge,
            'occupancy': self.occupancy,
            'amenities': self.get_amenities()
        }
    
    def __repr__(self):
        return f'<ColivingSpace {self.name} - {self.city}>'


class EventSpace(db.Model):
    """Event space listings by city"""
    
    __tablename__ = 'event_spaces'
    
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100), nullable=False, index=True)
    space_id = db.Column(db.Integer, nullable=False)
    
    # Basic info
    name = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200))
    images = db.Column(db.Text)  # JSON array
    
    # Rating and reviews
    rating = db.Column(db.Float)
    rating_text = db.Column(db.String(50))
    reviews = db.Column(db.Integer)
    stars = db.Column(db.Integer)
    
    # Pricing
    price = db.Column(db.Integer)
    original_price = db.Column(db.Integer)
    total_price = db.Column(db.Integer)
    discount = db.Column(db.Integer)
    member_price = db.Column(db.Boolean, default=False)
    
    # Features
    badge = db.Column(db.String(50))
    capacity = db.Column(db.String(100))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def set_images(self, images_list):
        self.images = json.dumps(images_list)
    
    def get_images(self):
        return json.loads(self.images) if self.images else []
    
    def to_dict(self):
        return {
            'id': self.space_id,
            'name': self.name,
            'location': self.location,
            'rating': self.rating,
            'ratingText': self.rating_text,
            'reviews': self.reviews,
            'stars': self.stars,
            'price': self.price,
            'originalPrice': self.original_price,
            'totalPrice': self.total_price,
            'discount': self.discount,
            'memberPrice': self.member_price,
            'images': self.get_images(),
            'badge': self.badge,
            'capacity': self.capacity
        }
    
    def __repr__(self):
        return f'<EventSpace {self.name} - {self.city}>'


class PartyHall(db.Model):
    """Party hall listings by city"""
    
    __tablename__ = 'party_halls'
    
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100), nullable=False, index=True)
    space_id = db.Column(db.Integer, nullable=False)
    
    # Basic info
    name = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200))
    images = db.Column(db.Text)  # JSON array
    
    # Rating and reviews
    rating = db.Column(db.Float)
    rating_text = db.Column(db.String(50))
    reviews = db.Column(db.Integer)
    stars = db.Column(db.Integer)
    
    # Pricing
    price = db.Column(db.Integer)
    original_price = db.Column(db.Integer)
    total_price = db.Column(db.Integer)
    discount = db.Column(db.Integer)
    member_price = db.Column(db.Boolean, default=False)
    
    # Features
    badge = db.Column(db.String(50))
    capacity = db.Column(db.String(100))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def set_images(self, images_list):
        self.images = json.dumps(images_list)
    
    def get_images(self):
        return json.loads(self.images) if self.images else []
    
    def to_dict(self):
        return {
            'id': self.space_id,
            'name': self.name,
            'location': self.location,
            'rating': self.rating,
            'ratingText': self.rating_text,
            'reviews': self.reviews,
            'stars': self.stars,
            'price': self.price,
            'originalPrice': self.original_price,
            'totalPrice': self.total_price,
            'discount': self.discount,
            'memberPrice': self.member_price,
            'images': self.get_images(),
            'badge': self.badge,
            'capacity': self.capacity
        }
    
    def __repr__(self):
        return f'<PartyHall {self.name} - {self.city}>'


class Hotel(db.Model):
    """Hotel listings by city"""
    
    __tablename__ = 'hotels'
    
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100), nullable=False, index=True)
    space_id = db.Column(db.Integer, nullable=False)
    
    name = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200))
    images = db.Column(db.Text)
    rating = db.Column(db.Float)
    rating_text = db.Column(db.String(50))
    reviews = db.Column(db.Integer)
    stars = db.Column(db.Integer)
    price = db.Column(db.Integer)
    original_price = db.Column(db.Integer)
    total_price = db.Column(db.Integer)
    discount = db.Column(db.Integer)
    member_price = db.Column(db.Boolean, default=False)
    badge = db.Column(db.String(50))
    room_type = db.Column(db.String(100))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_images(self, images_list):
        self.images = json.dumps(images_list)
    
    def get_images(self):
        return json.loads(self.images) if self.images else []
    
    def to_dict(self):
        return {
            'id': self.space_id,
            'name': self.name,
            'location': self.location,
            'rating': self.rating,
            'ratingText': self.rating_text,
            'reviews': self.reviews,
            'stars': self.stars,
            'price': self.price,
            'originalPrice': self.original_price,
            'totalPrice': self.total_price,
            'discount': self.discount,
            'memberPrice': self.member_price,
            'images': self.get_images(),
            'badge': self.badge,
            'roomType': self.room_type
        }


class PrivateTheatre(db.Model):
    """Private theatre listings by city"""
    
    __tablename__ = 'private_theatres'
    
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100), nullable=False, index=True)
    space_id = db.Column(db.Integer, nullable=False)
    
    name = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200))
    images = db.Column(db.Text)
    rating = db.Column(db.Float)
    rating_text = db.Column(db.String(50))
    reviews = db.Column(db.Integer)
    stars = db.Column(db.Integer)
    price = db.Column(db.Integer)
    original_price = db.Column(db.Integer)
    total_price = db.Column(db.Integer)
    discount = db.Column(db.Integer)
    member_price = db.Column(db.Boolean, default=False)
    badge = db.Column(db.String(50))
    seating_capacity = db.Column(db.String(100))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_images(self, images_list):
        self.images = json.dumps(images_list)
    
    def get_images(self):
        return json.loads(self.images) if self.images else []
    
    def to_dict(self):
        return {
            'id': self.space_id,
            'name': self.name,
            'location': self.location,
            'rating': self.rating,
            'ratingText': self.rating_text,
            'reviews': self.reviews,
            'stars': self.stars,
            'price': self.price,
            'originalPrice': self.original_price,
            'totalPrice': self.total_price,
            'discount': self.discount,
            'memberPrice': self.member_price,
            'images': self.get_images(),
            'badge': self.badge,
            'seatingCapacity': self.seating_capacity
        }

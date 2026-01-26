"""
Content data models for hero content, FAQs, and services
"""

from extensions import db
from datetime import datetime
import json

class HeroContent(db.Model):
    """Hero content for different pages"""
    
    __tablename__ = 'hero_content'
    
    id = db.Column(db.Integer, primary_key=True)
    page = db.Column(db.String(50), unique=True, nullable=False, index=True)  # home, coworking, coliving, virtualoffice
    
    # Title (JSON with line1, line2, line3)
    title = db.Column(db.Text, nullable=False)
    
    # Search placeholders (JSON with type, city)
    search_placeholder = db.Column(db.Text)
    
    # Labels and buttons
    search_button = db.Column(db.String(100))
    popular_cities_label = db.Column(db.String(100))
    
    # Options (JSON arrays)
    type_options = db.Column(db.Text)
    city_options = db.Column(db.Text)
    hero_images = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def set_title(self, title_dict):
        self.title = json.dumps(title_dict)
    
    def get_title(self):
        return json.loads(self.title) if self.title else {}
    
    def set_search_placeholder(self, placeholder_dict):
        self.search_placeholder = json.dumps(placeholder_dict)
    
    def get_search_placeholder(self):
        return json.loads(self.search_placeholder) if self.search_placeholder else {}
    
    def set_type_options(self, options_list):
        self.type_options = json.dumps(options_list)
    
    def get_type_options(self):
        return json.loads(self.type_options) if self.type_options else []
    
    def set_city_options(self, options_list):
        self.city_options = json.dumps(options_list)
    
    def get_city_options(self):
        return json.loads(self.city_options) if self.city_options else []
    
    def set_hero_images(self, images_list):
        self.hero_images = json.dumps(images_list)
    
    def get_hero_images(self):
        return json.loads(self.hero_images) if self.hero_images else []
    
    def to_dict(self):
        return {
            'title': self.get_title(),
            'searchPlaceholder': self.get_search_placeholder(),
            'searchButton': self.search_button,
            'popularCitiesLabel': self.popular_cities_label,
            'typeOptions': self.get_type_options(),
            'cityOptions': self.get_city_options(),
            'heroImages': self.get_hero_images()
        }
    
    def __repr__(self):
        return f'<HeroContent {self.page}>'


class FAQ(db.Model):
    """Frequently Asked Questions by category"""
    
    __tablename__ = 'faqs'
    
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False, index=True)  # coworking, coliving, virtualoffice
    faq_id = db.Column(db.Integer, nullable=False)
    
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)
    order = db.Column(db.Integer, default=0)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.faq_id,
            'question': self.question,
            'answer': self.answer
        }
    
    def __repr__(self):
        return f'<FAQ {self.category} - {self.faq_id}>'


class ServiceCategory(db.Model):
    """Service categories"""
    
    __tablename__ = 'service_categories'
    
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(100), unique=True, nullable=False, index=True)
    name = db.Column(db.String(200), nullable=False)
    icon = db.Column(db.String(10))
    description = db.Column(db.Text)
    
    # JSON arrays
    subcategories = db.Column(db.Text)
    service_descriptions = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    providers = db.relationship('ServiceProvider', backref='category', lazy='dynamic', cascade='all, delete-orphan')
    
    def set_subcategories(self, subcategories_list):
        self.subcategories = json.dumps(subcategories_list)
    
    def get_subcategories(self):
        return json.loads(self.subcategories) if self.subcategories else []
    
    def set_service_descriptions(self, descriptions_list):
        self.service_descriptions = json.dumps(descriptions_list)
    
    def get_service_descriptions(self):
        return json.loads(self.service_descriptions) if self.service_descriptions else []
    
    def to_dict(self, include_providers=False):
        data = {
            'id': self.slug,
            'name': self.name,
            'slug': self.slug,
            'icon': self.icon,
            'description': self.description,
            'subcategories': self.get_subcategories(),
            'serviceDescriptions': self.get_service_descriptions()
        }
        
        if include_providers:
            data['providers'] = [provider.to_dict() for provider in self.providers.all()]
        
        return data
    
    def __repr__(self):
        return f'<ServiceCategory {self.name}>'


class ServiceProvider(db.Model):
    """Service providers"""
    
    __tablename__ = 'service_providers'
    
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('service_categories.id'), nullable=False, index=True)
    provider_id = db.Column(db.Integer, nullable=False)
    
    # Provider details
    name = db.Column(db.String(200), nullable=False)
    expertise = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))
    location = db.Column(db.String(200))
    experience = db.Column(db.Integer)
    profile_summary = db.Column(db.Text)
    
    # Specializations (JSON array)
    specializations = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def set_specializations(self, specializations_list):
        self.specializations = json.dumps(specializations_list)
    
    def get_specializations(self):
        return json.loads(self.specializations) if self.specializations else []
    
    def to_dict(self):
        return {
            'id': self.provider_id,
            'name': self.name,
            'expertise': self.expertise,
            'phone': self.phone,
            'email': self.email,
            'location': self.location,
            'experience': self.experience,
            'profileSummary': self.profile_summary,
            'specializations': self.get_specializations()
        }
    
    def __repr__(self):
        return f'<ServiceProvider {self.name}>'

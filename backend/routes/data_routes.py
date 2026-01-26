"""
Data routes - API endpoints for frontend JSON data
"""

from flask import Blueprint, request, jsonify
from models.city_data import CoworkingSpace, ColivingSpace, EventSpace, PartyHall, Hotel, PrivateTheatre
from models.content_data import HeroContent, FAQ, ServiceCategory, ServiceProvider
from extensions import db
import json

data_bp = Blueprint('data', __name__)

# ============================================================================
# COWORKING ENDPOINTS
# ============================================================================

@data_bp.route('/coworking/<string:city>', methods=['GET'])
def get_coworking_by_city(city):
    """Get coworking spaces for a specific city"""
    try:
        city_lower = city.lower()
        
        # Get all spaces for this city
        spaces = CoworkingSpace.query.filter_by(city=city_lower).all()
        
        if not spaces:
            return jsonify({
                'success': False,
                'error': f'No coworking spaces found for {city}'
            }), 404
        
        # Get city-level data from first space
        first_space = spaces[0]
        
        response_data = {
            'cityName': first_space.city_name or city.capitalize(),
            'heroImage': first_space.hero_image,
            'description': first_space.description,
            'popularLocations': first_space.get_popular_locations(),
            'spaces': [space.to_dict() for space in spaces]
        }
        
        return jsonify({
            'success': True,
            'data': response_data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@data_bp.route('/coworking/<string:city>/<int:space_id>', methods=['GET'])
def get_coworking_space(city, space_id):
    """Get specific coworking space"""
    try:
        space = CoworkingSpace.query.filter_by(city=city.lower(), space_id=space_id).first()
        
        if not space:
            return jsonify({
                'success': False,
                'error': 'Coworking space not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': space.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================================================
# COLIVING ENDPOINTS
# ============================================================================

@data_bp.route('/coliving/<string:city>', methods=['GET'])
def get_coliving_by_city(city):
    """Get coliving spaces for a specific city"""
    try:
        city_lower = city.lower()
        
        spaces = ColivingSpace.query.filter_by(city=city_lower).all()
        
        if not spaces:
            return jsonify({
                'success': False,
                'error': f'No coliving spaces found for {city}'
            }), 404
        
        first_space = spaces[0]
        
        response_data = {
            'cityName': first_space.city_name or city.capitalize(),
            'heroImage': first_space.hero_image,
            'description': first_space.city_description,
            'popularLocations': json.loads(first_space.popular_locations) if first_space.popular_locations else [],
            'spaces': [space.to_dict() for space in spaces],
            'promoCards': json.loads(first_space.promo_cards) if first_space.promo_cards else [],
            'promoBanner': json.loads(first_space.promo_banner) if first_space.promo_banner else {},
            'faqs': json.loads(first_space.faqs) if first_space.faqs else []
        }
        
        return jsonify({
            'success': True,
            'data': response_data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@data_bp.route('/coliving/<string:city>/<int:space_id>', methods=['GET'])
def get_coliving_space(city, space_id):
    """Get specific coliving space"""
    try:
        space = ColivingSpace.query.filter_by(city=city.lower(), space_id=space_id).first()
        
        if not space:
            return jsonify({
                'success': False,
                'error': 'Coliving space not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': space.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================================================
# EVENT SPACES ENDPOINTS
# ============================================================================

@data_bp.route('/event-spaces/<string:city>', methods=['GET'])
def get_event_spaces_by_city(city):
    """Get event spaces for a specific city"""
    try:
        spaces = EventSpace.query.filter_by(city=city.lower()).all()
        
        if not spaces:
            return jsonify({
                'success': False,
                'error': f'No event spaces found for {city}'
            }), 404
        
        return jsonify({
            'success': True,
            'data': [space.to_dict() for space in spaces]
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@data_bp.route('/event-spaces/<string:city>/<int:space_id>', methods=['GET'])
def get_event_space(city, space_id):
    """Get specific event space"""
    try:
        space = EventSpace.query.filter_by(city=city.lower(), space_id=space_id).first()
        
        if not space:
            return jsonify({
                'success': False,
                'error': 'Event space not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': space.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================================================
# PARTY HALLS ENDPOINTS
# ============================================================================

@data_bp.route('/party-halls/<string:city>', methods=['GET'])
def get_party_halls_by_city(city):
    """Get party halls for a specific city"""
    try:
        halls = PartyHall.query.filter_by(city=city.lower()).all()
        
        if not halls:
            return jsonify({
                'success': False,
                'error': f'No party halls found for {city}'
            }), 404
        
        return jsonify({
            'success': True,
            'data': [hall.to_dict() for hall in halls]
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@data_bp.route('/party-halls/<string:city>/<int:space_id>', methods=['GET'])
def get_party_hall(city, space_id):
    """Get specific party hall"""
    try:
        hall = PartyHall.query.filter_by(city=city.lower(), space_id=space_id).first()
        
        if not hall:
            return jsonify({
                'success': False,
                'error': 'Party hall not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': hall.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================================================
# HOTELS ENDPOINTS
# ============================================================================

@data_bp.route('/hotels/<string:city>', methods=['GET'])
def get_hotels_by_city(city):
    """Get hotels for a specific city"""
    try:
        hotels = Hotel.query.filter_by(city=city.lower()).all()
        
        if not hotels:
            return jsonify({
                'success': False,
                'error': f'No hotels found for {city}'
            }), 404
        
        return jsonify({
            'success': True,
            'data': [hotel.to_dict() for hotel in hotels]
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================================================
# PRIVATE THEATRES ENDPOINTS
# ============================================================================

@data_bp.route('/private-theatres/<string:city>', methods=['GET'])
def get_private_theatres_by_city(city):
    """Get private theatres for a specific city"""
    try:
        theatres = PrivateTheatre.query.filter_by(city=city.lower()).all()
        
        if not theatres:
            return jsonify({
                'success': False,
                'error': f'No private theatres found for {city}'
            }), 404
        
        return jsonify({
            'success': True,
            'data': [theatre.to_dict() for theatre in theatres]
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================================================
# HERO CONTENT ENDPOINTS
# ============================================================================

@data_bp.route('/hero-content/<string:page>', methods=['GET'])
def get_hero_content(page):
    """Get hero content for a specific page"""
    try:
        content = HeroContent.query.filter_by(page=page.lower()).first()
        
        if not content:
            return jsonify({
                'success': False,
                'error': f'No hero content found for page: {page}'
            }), 404
        
        return jsonify({
            'success': True,
            'data': content.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================================================
# FAQ ENDPOINTS
# ============================================================================

@data_bp.route('/faqs/<string:category>', methods=['GET'])
def get_faqs_by_category(category):
    """Get FAQs for a specific category"""
    try:
        faqs = FAQ.query.filter_by(category=category.lower()).order_by(FAQ.order).all()
        
        if not faqs:
            return jsonify({
                'success': False,
                'error': f'No FAQs found for category: {category}'
            }), 404
        
        return jsonify({
            'success': True,
            'data': [faq.to_dict() for faq in faqs]
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================================================
# SERVICES ENDPOINTS
# ============================================================================

@data_bp.route('/services', methods=['GET'])
def get_all_services():
    """Get all service categories"""
    try:
        categories = ServiceCategory.query.all()
        
        return jsonify({
            'success': True,
            'data': {
                'categories': [cat.to_dict(include_providers=False) for cat in categories]
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@data_bp.route('/services/<string:category_slug>', methods=['GET'])
def get_service_category(category_slug):
    """Get service category with providers"""
    try:
        category = ServiceCategory.query.filter_by(slug=category_slug).first()
        
        if not category:
            return jsonify({
                'success': False,
                'error': f'Service category not found: {category_slug}'
            }), 404
        
        return jsonify({
            'success': True,
            'data': category.to_dict(include_providers=True)
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@data_bp.route('/services/<string:category_slug>/<int:provider_id>', methods=['GET'])
def get_service_provider(category_slug, provider_id):
    """Get specific service provider"""
    try:
        category = ServiceCategory.query.filter_by(slug=category_slug).first()
        
        if not category:
            return jsonify({
                'success': False,
                'error': f'Service category not found: {category_slug}'
            }), 404
        
        provider = ServiceProvider.query.filter_by(
            category_id=category.id,
            provider_id=provider_id
        ).first()
        
        if not provider:
            return jsonify({
                'success': False,
                'error': 'Service provider not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': provider.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================================================
# UTILITY ENDPOINTS
# ============================================================================

@data_bp.route('/cities', methods=['GET'])
def get_available_cities():
    """Get list of all available cities across all data types"""
    try:
        coworking_cities = db.session.query(CoworkingSpace.city).distinct().all()
        coliving_cities = db.session.query(ColivingSpace.city).distinct().all()
        event_cities = db.session.query(EventSpace.city).distinct().all()
        
        all_cities = set()
        for city_tuple in coworking_cities + coliving_cities + event_cities:
            all_cities.add(city_tuple[0])
        
        return jsonify({
            'success': True,
            'data': {
                'cities': sorted(list(all_cities))
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

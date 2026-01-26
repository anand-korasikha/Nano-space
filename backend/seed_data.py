"""
Data seeding script - Populate database from frontend JSON files
Run this script to import all JSON data into the database

Usage:
    python seed_data.py              # Seed all data
    python seed_data.py --clear      # Clear existing data and reseed
    python seed_data.py --test       # Test mode (don't commit)
"""

import os
import sys
import json
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from extensions import db
from models.city_data import CoworkingSpace, ColivingSpace, EventSpace, PartyHall
from models.content_data import HeroContent, FAQ, ServiceCategory, ServiceProvider

# Path to frontend data directory
FRONTEND_DATA_PATH = Path(__file__).parent.parent / 'frontend' / 'src' / 'data'


def clear_all_data():
    """Clear all existing data from tables"""
    print("🗑️  Clearing existing data...")
    
    try:
        CoworkingSpace.query.delete()
        ColivingSpace.query.delete()
        EventSpace.query.delete()
        PartyHall.query.delete()
        HeroContent.query.delete()
        FAQ.query.delete()
        ServiceProvider.query.delete()
        ServiceCategory.query.delete()
        
        db.session.commit()
        print("✅ Existing data cleared successfully")
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error clearing data: {str(e)}")
        raise


def seed_coworking_data():
    """Seed coworking spaces from cityCoworking.json"""
    print("\n📍 Seeding coworking spaces...")
    
    json_file = FRONTEND_DATA_PATH / 'cityCoworking.json'
    
    if not json_file.exists():
        print(f"⚠️  File not found: {json_file}")
        return
    
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    count = 0
    for city_key, city_data in data.items():
        for space in city_data.get('spaces', []):
            coworking = CoworkingSpace(
                city=city_key,
                space_id=space['id'],
                name=space['name'],
                location=space['location'],
                image=space['image'],
                rating=space.get('rating'),
                price=space.get('price'),
                period=space.get('period'),
                badge=space.get('badge'),
                city_name=city_data.get('cityName'),
                hero_image=city_data.get('heroImage'),
                description=city_data.get('description')
            )
            
            if 'amenities' in space:
                coworking.set_amenities(space['amenities'])
            
            if 'popularLocations' in city_data:
                coworking.set_popular_locations(city_data['popularLocations'])
            
            db.session.add(coworking)
            count += 1
    
    print(f"✅ Added {count} coworking spaces")


def seed_coliving_data():
    """Seed coliving spaces from cityColiving.json"""
    print("\n🏠 Seeding coliving spaces...")
    
    json_file = FRONTEND_DATA_PATH / 'cityColiving.json'
    
    if not json_file.exists():
        print(f"⚠️  File not found: {json_file}")
        return
    
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    count = 0
    for city_key, city_data in data.items():
        for space in city_data.get('spaces', []):
            coliving = ColivingSpace(
                city=city_key,
                space_id=space['id'],
                name=space['name'],
                location=space['location'],
                image=space['image'],
                description=space.get('description'),
                rating=space.get('rating'),
                price=space.get('price'),
                period=space.get('period'),
                badge=space.get('badge'),
                occupancy=space.get('occupancy'),
                city_name=city_data.get('cityName'),
                hero_image=city_data.get('heroImage'),
                city_description=city_data.get('description')
            )
            
            if 'images' in space:
                coliving.set_images(space['images'])
            
            if 'amenities' in space:
                coliving.set_amenities(space['amenities'])
            
            # Store city-level data in first space only
            if space['id'] == 1:
                if 'popularLocations' in city_data:
                    coliving.popular_locations = json.dumps(city_data['popularLocations'])
                if 'promoCards' in city_data:
                    coliving.promo_cards = json.dumps(city_data['promoCards'])
                if 'promoBanner' in city_data:
                    coliving.promo_banner = json.dumps(city_data['promoBanner'])
                if 'faqs' in city_data:
                    coliving.faqs = json.dumps(city_data['faqs'])
            
            db.session.add(coliving)
            count += 1
    
    print(f"✅ Added {count} coliving spaces")


def seed_event_spaces():
    """Seed event spaces from eventSpacesData.json"""
    print("\n🎉 Seeding event spaces...")
    
    json_file = FRONTEND_DATA_PATH / 'eventSpacesData.json'
    
    if not json_file.exists():
        print(f"⚠️  File not found: {json_file}")
        return
    
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    count = 0
    for city_key, spaces in data.items():
        for space in spaces:
            event_space = EventSpace(
                city=city_key,
                space_id=space['id'],
                name=space['name'],
                location=space['location'],
                rating=space.get('rating'),
                rating_text=space.get('ratingText'),
                reviews=space.get('reviews'),
                stars=space.get('stars'),
                price=space.get('price'),
                original_price=space.get('originalPrice'),
                total_price=space.get('totalPrice'),
                discount=space.get('discount'),
                member_price=space.get('memberPrice', False),
                badge=space.get('badge'),
                capacity=space.get('capacity')
            )
            
            if 'images' in space:
                event_space.set_images(space['images'])
            
            db.session.add(event_space)
            count += 1
    
    print(f"✅ Added {count} event spaces")


def seed_party_halls():
    """Seed party halls from partyHallsData.json"""
    print("\n🎊 Seeding party halls...")
    
    json_file = FRONTEND_DATA_PATH / 'partyHallsData.json'
    
    if not json_file.exists():
        print(f"⚠️  File not found: {json_file}")
        return
    
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    count = 0
    for city_key, halls in data.items():
        for hall in halls:
            party_hall = PartyHall(
                city=city_key,
                space_id=hall['id'],
                name=hall['name'],
                location=hall['location'],
                rating=hall.get('rating'),
                rating_text=hall.get('ratingText'),
                reviews=hall.get('reviews'),
                stars=hall.get('stars'),
                price=hall.get('price'),
                original_price=hall.get('originalPrice'),
                total_price=hall.get('totalPrice'),
                discount=hall.get('discount'),
                member_price=hall.get('memberPrice', False),
                badge=hall.get('badge'),
                capacity=hall.get('capacity')
            )
            
            if 'images' in hall:
                party_hall.set_images(hall['images'])
            
            db.session.add(party_hall)
            count += 1
    
    print(f"✅ Added {count} party halls")


def seed_hero_content():
    """Seed hero content from heroContent.json"""
    print("\n🎨 Seeding hero content...")
    
    json_file = FRONTEND_DATA_PATH / 'heroContent.json'
    
    if not json_file.exists():
        print(f"⚠️  File not found: {json_file}")
        return
    
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    count = 0
    for page_key, page_data in data.items():
        hero = HeroContent(
            page=page_key,
            search_button=page_data.get('searchButton'),
            popular_cities_label=page_data.get('popularCitiesLabel')
        )
        
        if 'title' in page_data:
            hero.set_title(page_data['title'])
        
        if 'searchPlaceholder' in page_data:
            hero.set_search_placeholder(page_data['searchPlaceholder'])
        
        if 'typeOptions' in page_data:
            hero.set_type_options(page_data['typeOptions'])
        
        if 'cityOptions' in page_data:
            hero.set_city_options(page_data['cityOptions'])
        
        if 'heroImages' in page_data:
            hero.set_hero_images(page_data['heroImages'])
        
        db.session.add(hero)
        count += 1
    
    print(f"✅ Added {count} hero content pages")


def seed_faqs():
    """Seed FAQs from faqData.json"""
    print("\n❓ Seeding FAQs...")
    
    json_file = FRONTEND_DATA_PATH / 'faqData.json'
    
    if not json_file.exists():
        print(f"⚠️  File not found: {json_file}")
        return
    
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    count = 0
    for category_key, faqs in data.items():
        for faq in faqs:
            faq_obj = FAQ(
                category=category_key,
                faq_id=faq['id'],
                question=faq['question'],
                answer=faq['answer'],
                order=faq['id']
            )
            
            db.session.add(faq_obj)
            count += 1
    
    print(f"✅ Added {count} FAQs")


def seed_services():
    """Seed services from servicesData.json"""
    print("\n🛠️  Seeding services...")
    
    json_file = FRONTEND_DATA_PATH / 'servicesData.json'
    
    if not json_file.exists():
        print(f"⚠️  File not found: {json_file}")
        return
    
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    category_count = 0
    provider_count = 0
    
    for category_data in data.get('categories', []):
        category = ServiceCategory(
            slug=category_data['slug'],
            name=category_data['name'],
            icon=category_data.get('icon'),
            description=category_data.get('description')
        )
        
        if 'subcategories' in category_data:
            category.set_subcategories(category_data['subcategories'])
        
        if 'serviceDescriptions' in category_data:
            category.set_service_descriptions(category_data['serviceDescriptions'])
        
        db.session.add(category)
        db.session.flush()  # Get category ID
        
        category_count += 1
        
        # Add providers
        for provider_data in category_data.get('providers', []):
            provider = ServiceProvider(
                category_id=category.id,
                provider_id=provider_data['id'],
                name=provider_data['name'],
                expertise=provider_data.get('expertise'),
                phone=provider_data.get('phone'),
                email=provider_data.get('email'),
                location=provider_data.get('location'),
                experience=provider_data.get('experience'),
                profile_summary=provider_data.get('profileSummary')
            )
            
            if 'specializations' in provider_data:
                provider.set_specializations(provider_data['specializations'])
            
            db.session.add(provider)
            provider_count += 1
    
    print(f"✅ Added {category_count} service categories and {provider_count} providers")


def main():
    """Main seeding function"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Seed database with frontend JSON data')
    parser.add_argument('--clear', action='store_true', help='Clear existing data before seeding')
    parser.add_argument('--test', action='store_true', help='Test mode (rollback instead of commit)')
    args = parser.parse_args()
    
    print("=" * 60)
    print("🌱 NANO SPACE DATA SEEDING SCRIPT")
    print("=" * 60)
    
    app = create_app()
    
    with app.app_context():
        try:
            if args.clear:
                clear_all_data()
            
            # Seed all data
            seed_coworking_data()
            seed_coliving_data()
            seed_event_spaces()
            seed_party_halls()
            seed_hero_content()
            seed_faqs()
            seed_services()
            
            if args.test:
                print("\n⚠️  TEST MODE: Rolling back changes...")
                db.session.rollback()
                print("✅ Test completed successfully (no data committed)")
            else:
                db.session.commit()
                print("\n" + "=" * 60)
                print("✅ ALL DATA SEEDED SUCCESSFULLY!")
                print("=" * 60)
        
        except Exception as e:
            db.session.rollback()
            print(f"\n❌ ERROR: {str(e)}")
            import traceback
            traceback.print_exc()
            sys.exit(1)


if __name__ == '__main__':
    main()

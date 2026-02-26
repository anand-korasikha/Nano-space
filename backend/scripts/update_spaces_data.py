import json
import re

# Read the JSON file
with open(r'c:\Users\KORASIKHA ANANDKUMAR\Desktop\Nano-space-main\src\data\topSpaces.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Function to create ID from name
def create_id(name):
    # Convert to lowercase, replace spaces and special chars with hyphens
    id_str = name.lower()
    id_str = re.sub(r'[^\w\s-]', '', id_str)
    id_str = re.sub(r'[\s_]+', '-', id_str)
    return id_str

# Process each city
for city_key, city_data in data.items():
    for space in city_data['spaces']:
        # Add ID if not present
        if 'id' not in space:
            space['id'] = create_id(space['name'])
        
        # Add rating if not present
        if 'rating' not in space:
            space['rating'] = 4.5
        
        # Add reviewsCount if not present
        if 'reviewsCount' not in space:
            space['reviewsCount'] = 500
        
        # Add trustBadge if not present
        if 'trustBadge' not in space:
            space['trustBadge'] = "Trusted by Nanospaces"
        
        # Add images array if not present
        if 'images' not in space:
            space['images'] = [
                space['image'],
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            ]
        
        # Add description if not present
        if 'description' not in space:
            space['description'] = f"Modern coworking space in {space['location']} offering premium amenities and a vibrant professional community."
        
        # Expand amenities if needed
        if len(space['amenities']) < 5:
            additional_amenities = ["Meeting Rooms", "Parking", "24/7 Access", "Air Conditioning", "Printer & Scanner", "Cafeteria"]
            for amenity in additional_amenities:
                if amenity not in space['amenities'] and len(space['amenities']) < 8:
                    space['amenities'].append(amenity)
        
        # Add priceDetails if not present
        if 'priceDetails' not in space:
            space['priceDetails'] = {
                "perSeat": space['price'],
                "perCabin": "₹45,000",
                "period": space['period']
            }

# Write back to file
with open(r'c:\Users\KORASIKHA ANANDKUMAR\Desktop\Nano-space-main\src\data\topSpaces.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("Successfully updated topSpaces.json with IDs and enhanced data!")

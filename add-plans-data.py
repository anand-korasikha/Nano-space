import json

# Read the JSON file
with open('src/data/cityVirtualOffice.json', 'r', encoding='utf-8') as f:
    city_data = json.load(f)

# Define the plans data
plans_data = [
    {
        "id": 1,
        "title": "Company Registration",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "features": [
            "Hassle-free company setup with expert guidance",
            "Get a professional business address for registration",
            "Fast & seamless documentation for smooth approval"
        ],
        "documentsLink": "#documents",
        "quoteLink": "#contact"
    },
    {
        "id": 2,
        "title": "GST Registration",
        "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "features": [
            "Get a GST approved virtual office address",
            "Quick & easy GST registration with minimal paperwork",
            "Support for multi-state GST registration"
        ],
        "documentsLink": "#documents",
        "quoteLink": "#contact"
    },
    {
        "id": 3,
        "title": "Business Address",
        "image": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "features": [
            "Premium virtual office address in prime locations",
            "Enhance credibility with a registered business address",
            "Ideal for startups, freelancers & remote businesses"
        ],
        "documentsLink": "#documents",
        "quoteLink": "#contact"
    }
]

# Add plans to each city that doesn't have it
for city_key in city_data:
    if 'plans' not in city_data[city_key]:
        city_data[city_key]['plans'] = plans_data
        print(f"✅ Added plans to {city_data[city_key]['name']}")
    else:
        print(f"⏭️  {city_data[city_key]['name']} already has plans")

# Write back to the JSON file
with open('src/data/cityVirtualOffice.json', 'w', encoding='utf-8') as f:
    json.dump(city_data, f, indent=4, ensure_ascii=False)

print('\n✅ Successfully added plans data to all cities!')

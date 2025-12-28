const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = path.join(__dirname, 'src', 'data', 'cityVirtualOffice.json');
const cityData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Define the plans data (same for all cities)
const plansData = [
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
];

// Add plans to each city
Object.keys(cityData).forEach(cityKey => {
    cityData[cityKey].plans = plansData;
});

// Write back to the JSON file
fs.writeFileSync(jsonPath, JSON.stringify(cityData, null, 4), 'utf8');

console.log('✅ Successfully added plans data to all cities!');

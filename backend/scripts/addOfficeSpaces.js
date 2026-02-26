const fs = require('fs');
const path = require('path');

// Read the current JSON file
const filePath = path.join(__dirname, 'src', 'data', 'cityVirtualOffice.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Office spaces template
const createOfficeSpaces = (cityName) => {
    const officeNames = {
        pune: [
            { name: "WeWork Hinjewadi", location: "Rajiv Gandhi Infotech Park, Hinjewadi, Pune", rating: 4.7 },
            { name: "Awfis Baner", location: "Baner Road, Baner, Pune", rating: 4.5 },
            { name: "91Springboard Viman Nagar", location: "Viman Nagar, Pune", rating: 4.6 },
            { name: "IndiQube Kharadi", location: "EON Free Zone, Kharadi, Pune", rating: 4.8 },
            { name: "Regus Magarpatta", location: "Magarpatta City, Hadapsar, Pune", rating: 4.4 },
            { name: "Smartworks Wakad", location: "Hinjewadi Road, Wakad, Pune", rating: 4.3 }
        ],
        delhi: [
            { name: "WeWork Connaught Place", location: "Connaught Place, New Delhi", rating: 4.9 },
            { name: "Awfis Nehru Place", location: "Nehru Place, New Delhi", rating: 4.6 },
            { name: "91Springboard Saket", location: "District Center, Saket, Delhi", rating: 4.7 },
            { name: "IndiQube Dwarka", location: "Sector 21, Dwarka, Delhi", rating: 4.5 },
            { name: "Regus Karol Bagh", location: "Karol Bagh, New Delhi", rating: 4.4 },
            { name: "Smartworks Rajouri Garden", location: "Rajouri Garden, Delhi", rating: 4.3 }
        ],
        mumbai: [
            { name: "WeWork BKC", location: "Bandra Kurla Complex, Mumbai", rating: 4.9 },
            { name: "Awfis Andheri", location: "Andheri East, Mumbai", rating: 4.7 },
            { name: "91Springboard Lower Parel", location: "Lower Parel, Mumbai", rating: 4.8 },
            { name: "IndiQube Powai", location: "Hiranandani, Powai, Mumbai", rating: 4.6 },
            { name: "Regus Nariman Point", location: "Nariman Point, Mumbai", rating: 4.5 },
            { name: "Smartworks Goregaon", location: "Goregaon East, Mumbai", rating: 4.4 }
        ],
        chennai: [
            { name: "WeWork OMR", location: "Old Mahabalipuram Road, Chennai", rating: 4.8 },
            { name: "Awfis Guindy", location: "Guindy, Chennai", rating: 4.6 },
            { name: "91Springboard T Nagar", location: "T Nagar, Chennai", rating: 4.5 },
            { name: "IndiQube Velachery", location: "Velachery, Chennai", rating: 4.7 },
            { name: "Regus Anna Nagar", location: "Anna Nagar, Chennai", rating: 4.4 },
            { name: "Smartworks Porur", location: "Porur, Chennai", rating: 4.3 }
        ],
        jaipur: [
            { name: "WeWork Malviya Nagar", location: "Malviya Nagar, Jaipur", rating: 4.6 },
            { name: "Awfis C Scheme", location: "C Scheme, Jaipur", rating: 4.4 },
            { name: "91Springboard Vaishali Nagar", location: "Vaishali Nagar, Jaipur", rating: 4.5 },
            { name: "IndiQube Mansarovar", location: "Mansarovar, Jaipur", rating: 4.7 },
            { name: "Regus MI Road", location: "MI Road, Jaipur", rating: 4.3 },
            { name: "Smartworks Jagatpura", location: "Jagatpura, Jaipur", rating: 4.2 }
        ],
        kolkata: [
            { name: "WeWork Salt Lake", location: "Sector V, Salt Lake, Kolkata", rating: 4.8 },
            { name: "Awfis Park Street", location: "Park Street, Kolkata", rating: 4.6 },
            { name: "91Springboard Rajarhat", location: "New Town, Rajarhat, Kolkata", rating: 4.7 },
            { name: "IndiQube Ballygunge", location: "Ballygunge, Kolkata", rating: 4.5 },
            { name: "Regus Alipore", location: "Alipore, Kolkata", rating: 4.4 },
            { name: "Smartworks Howrah", location: "Howrah, Kolkata", rating: 4.3 }
        ],
        ahmedabad: [
            { name: "WeWork SG Highway", location: "SG Highway, Ahmedabad", rating: 4.7 },
            { name: "Awfis Prahlad Nagar", location: "Prahlad Nagar, Ahmedabad", rating: 4.5 },
            { name: "91Springboard Satellite", location: "Satellite, Ahmedabad", rating: 4.6 },
            { name: "IndiQube Vastrapur", location: "Vastrapur, Ahmedabad", rating: 4.8 },
            { name: "Regus CG Road", location: "CG Road, Ahmedabad", rating: 4.4 },
            { name: "Smartworks Bodakdev", location: "Bodakdev, Ahmedabad", rating: 4.3 }
        ],
        chandigarh: [
            { name: "WeWork Sector 17", location: "Sector 17, Chandigarh", rating: 4.7 },
            { name: "Awfis Sector 35", location: "Sector 35, Chandigarh", rating: 4.5 },
            { name: "91Springboard Sector 8", location: "Sector 8, Chandigarh", rating: 4.6 },
            { name: "IndiQube Industrial Area", location: "Industrial Area Phase 1, Chandigarh", rating: 4.8 },
            { name: "Regus Elante Mall", location: "Elante Mall, Chandigarh", rating: 4.4 },
            { name: "Smartworks Mohali", location: "Mohali, Chandigarh", rating: 4.3 }
        ],
        kochi: [
            { name: "WeWork Infopark", location: "Infopark, Kakkanad, Kochi", rating: 4.8 },
            { name: "Awfis Edappally", location: "Edappally, Kochi", rating: 4.6 },
            { name: "91Springboard MG Road", location: "MG Road, Kochi", rating: 4.7 },
            { name: "IndiQube Kaloor", location: "Kaloor, Kochi", rating: 4.5 },
            { name: "Regus Marine Drive", location: "Marine Drive, Kochi", rating: 4.4 },
            { name: "Smartworks Vyttila", location: "Vyttila, Kochi", rating: 4.3 }
        ],
        indore: [
            { name: "WeWork Vijay Nagar", location: "Vijay Nagar, Indore", rating: 4.6 },
            { name: "Awfis MG Road", location: "MG Road, Indore", rating: 4.4 },
            { name: "91Springboard Palasia", location: "Palasia, Indore", rating: 4.5 },
            { name: "IndiQube Scheme 54", location: "Scheme 54, Indore", rating: 4.7 },
            { name: "Regus AB Road", location: "AB Road, Indore", rating: 4.3 },
            { name: "Smartworks Bhawarkua", location: "Bhawarkua, Indore", rating: 4.2 }
        ]
    };

    const images = [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ];

    const amenitiesList = [
        ["Wi-Fi & LAN Connectivity", "Housekeeping Services"],
        ["Super High-Speed Wifi", "Cafeteria/Food Court"]
    ];

    const cityOffices = officeNames[cityName] || [];

    return cityOffices.map((office, index) => ({
        id: index + 1,
        name: office.name,
        location: office.location,
        image: images[index],
        rating: office.rating,
        amenities: amenitiesList[index % 2],
        seats: `${280 + (index * 40)} Seats`,
        cabins: `${5 + index} Cabins`,
        meetingRooms: `${4 + index} Meeting Rooms`
    }));
};

// Add office spaces to cities that don't have them
const citiesToUpdate = ['pune', 'delhi', 'mumbai', 'chennai', 'jaipur', 'kolkata', 'ahmedabad', 'chandigarh', 'kochi', 'indore'];

citiesToUpdate.forEach(city => {
    if (data[city] && !data[city].officeSpaces) {
        data[city].officeSpaces = createOfficeSpaces(city);
        console.log(`Added office spaces to ${city}`);
    }
});

// Write the updated data back to the file
fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
console.log('Successfully updated cityVirtualOffice.json with office spaces for all cities!');

# Dynamic City Virtual Office Pages

## Overview
This implementation creates dynamic, single-page city-specific virtual office pages that load data from a JSON file.

## How It Works

### 1. Data Structure (`src/data/cityVirtualOffice.json`)
- Contains data for all cities (Hyderabad, Gurgaon, Bangalore, etc.)
- Each city has:
  - Basic info (name, title, heroImage)
  - Contact details (phone, email)
  - Features (Business Address, GST Registration, etc.)
  - Popular locations
  - Microlocations for the dropdown

### 2. Dynamic Page Component (`src/pages/CityVirtualOffice.jsx`)
- Uses React Router's `useParams()` to get the city name from URL
- Fetches corresponding city data from JSON file
- Renders a complete page with:
  - Hero section with city-specific background image
  - Features grid
  - Popular locations chips
  - Contact form with microlocation dropdown
  - Additional content section

### 3. Navigation Setup
- **TopVirtualOfficeCities Component**: Updated with click handlers
- **App.jsx**: Added dynamic route `/virtual-office/:cityName`
- When user clicks a city card, they're navigated to `/virtual-office/hyderabad` (or other city)

## Features

### Hero Section
- Full-width background image specific to each city
- City title and features displayed on the left
- Contact form on the right (desktop) or below (mobile)
- Popular location chips
- Call-to-action buttons (Get Quote, Phone)

### Contact Form
- Name, Email, Phone fields
- Microlocation dropdown (populated from JSON)
- "Enquire Now" button
- Contact expert section with phone and email

### Responsive Design
- Desktop: Form appears on right side of hero
- Mobile: Form appears below hero in separate section
- All elements are mobile-optimized

## Usage

### Adding a New City
1. Open `src/data/cityVirtualOffice.json`
2. Add new city object with this structure:
```json
"cityname": {
  "name": "City Name",
  "title": "Virtual Office in City Name",
  "heroImage": "image-url",
  "description": "Description",
  "phone": "9311328049",
  "email": "virtual@cofynd.com",
  "features": [...],
  "popularLocations": [...],
  "microlocations": [...]
}
```

### Customizing Features
Edit the `features` array in the JSON file. Each feature needs:
- `icon`: One of "MapPin", "FileText", "Building", "Clock"
- `title`: Feature title
- `description`: Feature description

### Customizing Locations
- `popularLocations`: Shows as chips in hero section (first 8 displayed)
- `microlocations`: Appears in the form dropdown (all displayed)

## File Structure
```
src/
├── data/
│   └── cityVirtualOffice.json          # City data
├── pages/
│   ├── CityVirtualOffice.jsx           # Dynamic city page
│   └── VirtualOffice.jsx               # Main virtual office page
├── components/
│   └── virtualoffice/
│       └── TopVirtualOfficeCities.jsx  # City grid with navigation
└── App.jsx                             # Routes configuration
```

## Routes
- `/virtual-office` - Main virtual office page
- `/virtual-office/hyderabad` - Hyderabad virtual office page
- `/virtual-office/gurgaon` - Gurgaon virtual office page
- `/virtual-office/:cityName` - Any city page (dynamic)

## Design Reference
The design matches the uploaded reference image with:
- Dark overlay on hero image
- White contact form card
- Blue primary color for buttons
- Clean, modern layout
- Responsive grid system

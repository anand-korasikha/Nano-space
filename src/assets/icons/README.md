# City Icons Documentation

## Overview
This document describes the local SVG icon system created for the Nanospace city grid.

## File Structure
```
src/
  assets/
    icons/
      cityIcons.jsx  ← Main icon library file
  components/
    home/
      CityGrid.jsx   ← Component using the icons
```

## Icon Components

### 1. **CityIcon** (Generic City)
- Used for: Pune, Indore, Chandigarh, Coimbatore
- Style: Building with windows and door
- Represents: Standard urban areas

### 2. **SkyscraperIcon** (Tech Hubs)
- Used for: Bangalore, Noida, Gurgaon
- Style: Tall modern building with horizontal lines
- Represents: Modern tech cities with high-rises

### 3. **MetroIcon** (Metropolitan Cities)
- Used for: Mumbai
- Style: Metro train/transit system
- Represents: Major metro cities with extensive transport

### 4. **HeritageIcon** (Historical Cities)
- Used for: Delhi, Kolkata, Jaipur, Lucknow
- Style: Shield with heritage symbol
- Represents: Cities with rich historical significance

### 5. **BusinessHubIcon** (Business Centers)
- Used for: Hyderabad, Ahmedabad, Surat
- Style: Corporate building/house
- Represents: Major business and commercial hubs

### 6. **PortIcon** (Port Cities)
- Used for: Chennai
- Style: Layered structure representing port/shipping
- Represents: Coastal cities with major ports

### 7. **BeachIcon** (Coastal/Tourist Cities)
- Used for: Kochi, Goa
- Style: Palm tree and beach
- Represents: Beach destinations and coastal tourism

### 8. **LandmarkIcon** (Alternative)
- Style: Layered pyramid structure
- Currently unused, available for future cities

## Usage

### Import the helper function:
```jsx
import { getCityIcon } from '../../assets/icons/cityIcons';
```

### Use in component:
```jsx
{getCityIcon(cityName)}
```

### Direct icon import (if needed):
```jsx
import { CityIcon, SkyscraperIcon, BeachIcon } from '../../assets/icons/cityIcons';
```

## City-Icon Mapping

| City | Icon Type | Reason |
|------|-----------|--------|
| Bangalore | Skyscraper | Tech hub with modern infrastructure |
| Mumbai | Metro | Major metropolitan with extensive transit |
| Delhi | Heritage | Capital city with historical monuments |
| Hyderabad | Business Hub | IT and business center |
| Chennai | Port | Major coastal port city |
| Pune | City | Growing urban center |
| Kolkata | Heritage | Historical and cultural capital |
| Ahmedabad | Business Hub | Industrial and commercial center |
| Jaipur | Heritage | Pink city with palaces |
| Surat | Business Hub | Diamond and textile hub |
| Lucknow | Heritage | City of Nawabs |
| Indore | City | Commercial center |
| Chandigarh | City | Planned city |
| Kochi | Beach | Coastal tourist destination |
| Coimbatore | City | Industrial city |
| Noida | Skyscraper | Modern satellite city |
| Gurgaon | Skyscraper | Corporate hub |
| Goa | Beach | Beach tourism destination |

## Customization

### To add a new city:
1. Add the city name to the `cities` array in `CityGrid.jsx`
2. Add the mapping in `cityIcons` object in `cityIcons.jsx`
3. Choose an existing icon or create a new one

### To create a new icon:
1. Create a new component function in `cityIcons.jsx`
2. Use the same SVG structure (24x24 viewBox)
3. Use `currentColor` for stroke/fill to inherit parent colors
4. Add to the `cityIcons` mapping object

## Styling
All icons inherit colors from their parent container:
- Default: `text-gray-400`
- Hover: `text-blue-500`
- Transitions are handled by the parent container

## Benefits
✅ **Local Control**: All icons are stored locally, no external dependencies
✅ **Customizable**: Easy to modify SVG paths and add new icons
✅ **Performance**: No external API calls or image loading
✅ **Consistency**: All icons follow the same design system
✅ **Type Safety**: Icons are React components with proper structure
✅ **Scalable**: SVG icons scale perfectly at any size

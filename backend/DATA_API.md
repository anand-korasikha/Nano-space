# Data API Endpoints - Quick Reference

## Overview

The Data API provides endpoints to serve all frontend JSON data dynamically from the database. This replaces static JSON file imports with live API calls.

## Base URL

```
http://localhost:5000/api/data
```

## Quick Start

### 1. Seed the Database

```bash
cd backend
python seed_data.py --clear
```

### 2. Test an Endpoint

```bash
curl http://localhost:5000/api/data/coworking/hyderabad
```

---

## API Endpoints

### Coworking Spaces

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/coworking/:city` | Get all coworking spaces in a city |
| GET | `/coworking/:city/:spaceId` | Get specific coworking space |

**Example:**
```bash
GET /api/data/coworking/hyderabad
GET /api/data/coworking/bangalore/1
```

---

### Coliving Spaces

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/coliving/:city` | Get all coliving spaces in a city |
| GET | `/coliving/:city/:spaceId` | Get specific coliving space |

**Example:**
```bash
GET /api/data/coliving/hyderabad
GET /api/data/coliving/bangalore/1
```

---

### Event Spaces

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/event-spaces/:city` | Get all event spaces in a city |
| GET | `/event-spaces/:city/:spaceId` | Get specific event space |

**Example:**
```bash
GET /api/data/event-spaces/hyderabad
GET /api/data/event-spaces/bangalore/5
```

---

### Party Halls

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/party-halls/:city` | Get all party halls in a city |
| GET | `/party-halls/:city/:spaceId` | Get specific party hall |

**Example:**
```bash
GET /api/data/party-halls/hyderabad
GET /api/data/party-halls/chennai/9
```

---

### Hotels

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/hotels/:city` | Get all hotels in a city |

**Example:**
```bash
GET /api/data/hotels/hyderabad
```

---

### Private Theatres

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/private-theatres/:city` | Get all private theatres in a city |

**Example:**
```bash
GET /api/data/private-theatres/hyderabad
```

---

### Hero Content

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/hero-content/:page` | Get hero content for a page |

**Pages:** `home`, `coworking`, `coliving`, `virtualoffice`

**Example:**
```bash
GET /api/data/hero-content/home
GET /api/data/hero-content/coworking
```

---

### FAQs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/faqs/:category` | Get FAQs for a category |

**Categories:** `coworking`, `coliving`, `virtualoffice`

**Example:**
```bash
GET /api/data/faqs/coworking
GET /api/data/faqs/coliving
```

---

### Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/services` | Get all service categories |
| GET | `/services/:categorySlug` | Get category with providers |
| GET | `/services/:categorySlug/:providerId` | Get specific provider |

**Example:**
```bash
GET /api/data/services
GET /api/data/services/it-development
GET /api/data/services/digital-marketing/11
```

---

### Utility

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cities` | Get list of all available cities |

**Example:**
```bash
GET /api/data/cities
```

---

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Seeding Script Usage

### Seed All Data
```bash
python seed_data.py
```

### Clear and Reseed
```bash
python seed_data.py --clear
```

### Test Mode (Don't Commit)
```bash
python seed_data.py --test
```

---

## Database Models

- **CoworkingSpace** - Coworking space listings
- **ColivingSpace** - Coliving space listings
- **EventSpace** - Event venue listings
- **PartyHall** - Party hall listings
- **Hotel** - Hotel listings
- **PrivateTheatre** - Private theatre listings
- **HeroContent** - Hero section content
- **FAQ** - Frequently asked questions
- **ServiceCategory** - Service categories
- **ServiceProvider** - Service provider profiles

---

## Frontend Integration

Replace JSON imports with API calls:

**Before:**
```javascript
import cityCoworking from '../data/cityCoworking.json';
```

**After:**
```javascript
const response = await fetch(`${API_BASE_URL}/api/data/coworking/hyderabad`);
const { data } = await response.json();
```

---

## Notes

- All endpoints are public (no authentication required)
- City names are case-insensitive
- Data is cached in the database for better performance
- Use the seeding script to update data from JSON files

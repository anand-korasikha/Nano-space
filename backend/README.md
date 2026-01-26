# Nano Space Backend API

Python Flask REST API for the Nano Space property management platform.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role management (customer, owner, admin)
- 🏢 **Property Management** - CRUD operations for coworking, coliving, virtual office spaces
- 📧 **OTP Verification** - Email and SMS OTP for user verification
- 📅 **Booking System** - Property reservation and enquiry management
- 👑 **Admin Dashboard** - Property approval workflow and statistics
- 📁 **File Upload** - Image upload for property listings
- 🔒 **Security** - Password hashing, JWT tokens, role-based access control

## Tech Stack

- **Framework**: Flask 3.0
- **Database**: SQLAlchemy (SQLite/PostgreSQL/MySQL)
- **Authentication**: Flask-JWT-Extended
- **Email**: Flask-Mail
- **SMS**: Twilio (optional)

## Project Structure

```
backend/
├── app.py                 # Application entry point
├── config.py              # Configuration settings
├── extensions.py          # Flask extensions
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
│
├── models/               # Database models
│   ├── __init__.py
│   ├── user.py          # User model
│   ├── property.py      # Property model
│   ├── otp.py           # OTP model
│   └── booking.py       # Booking model
│
├── routes/              # API endpoints
│   ├── __init__.py
│   ├── auth.py         # Authentication routes
│   ├── properties.py   # Property CRUD
│   ├── otp.py          # OTP verification
│   ├── bookings.py     # Booking management
│   └── admin.py        # Admin operations
│
├── services/           # Business logic
│   ├── __init__.py
│   ├── email_service.py
│   └── sms_service.py
│
└── utils/             # Utility functions
    ├── __init__.py
    └── file_utils.py
```

## Installation

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
```

### 2. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment

```bash
# Copy the example environment file
copy .env.example .env

# Edit .env and update with your settings
```

### 5. Initialize Database

```bash
python
>>> from app import create_app, db
>>> app = create_app()
>>> with app.app_context():
...     db.create_all()
>>> exit()
```

## Running the Server

### Development Mode

```bash
python app.py
```

The API will be available at `http://localhost:5000`

### Production Mode

```bash
# Using Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update user profile

### OTP Verification

- `POST /api/otp/send-email` - Send OTP to email
- `POST /api/otp/send-sms` - Send OTP to phone
- `POST /api/otp/verify` - Verify OTP
- `POST /api/otp/resend` - Resend OTP

### Properties

- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/<id>` - Get single property
- `POST /api/properties` - Create property (owner/admin)
- `PUT /api/properties/<id>` - Update property (owner/admin)
- `DELETE /api/properties/<id>` - Delete property (owner/admin)
- `GET /api/properties/my-properties` - Get owner's properties

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings/<id>` - Get single booking
- `PUT /api/bookings/<id>/cancel` - Cancel booking

### Admin

- `GET /api/admin/properties/pending` - Get pending properties
- `PUT /api/admin/properties/<id>/approve` - Approve property
- `PUT /api/admin/properties/<id>/reject` - Reject property
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users

## API Usage Examples

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "full_name": "John Doe",
    "role": "customer"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "user@example.com",
    "password": "password123"
  }'
```

### Create Property (with JWT)

```bash
curl -X POST http://localhost:5000/api/properties \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Premium Coworking Space",
    "type": "coworking",
    "city": "Bangalore",
    "address": "123 MG Road",
    "price_per_seat": 5000,
    "amenities": ["WiFi", "Coffee", "Meeting Rooms"]
  }'
```

## Database Schema

### Users
- id, email, phone, password_hash
- full_name, role (customer/owner/admin)
- email_verified, phone_verified
- created_at, updated_at, last_login

### Properties
- id, owner_id, name, type, description
- city, area, address, latitude, longitude
- pricing (per_seat, per_cabin, per_month, per_day)
- amenities, images, total_seats, available_seats
- status (pending/approved/rejected)
- timestamps

### OTPs
- id, identifier, otp_code
- attempts, verified
- created_at, expires_at, verified_at

### Bookings
- id, customer_id, property_id
- booking_type, quantity
- start_date, end_date, total_amount
- status (pending/confirmed/cancelled)
- customer details, notes
- timestamps

## Environment Variables

See `.env.example` for all available configuration options.

## Security Notes

- Change `SECRET_KEY` and `JWT_SECRET_KEY` in production
- Use strong passwords for database and email
- Enable HTTPS in production
- Configure CORS properly for your frontend domain
- Use environment variables for sensitive data

## Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=.
```

## License

MIT License

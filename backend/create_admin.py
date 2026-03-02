"""
Script to create / reset the admin user in MongoDB.
Run once:  python create_admin.py
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from dotenv import load_dotenv
load_dotenv()

from werkzeug.security import generate_password_hash
from mongo_client import db_mongo
from datetime import datetime

ADMIN_EMAIL    = 'admin@nanospace.com'
ADMIN_PASSWORD = 'Admin@123'
ADMIN_NAME     = 'Admin'
ADMIN_PHONE    = '+91-9876543210'

def create_admin():
    existing = db_mongo.users.find_one({'email': ADMIN_EMAIL})
    if existing:
        db_mongo.users.update_one(
            {'email': ADMIN_EMAIL},
            {'$set': {
                'role': 'admin',
                'email_verified': True,
                'phone_verified': True,
                'password_hash': generate_password_hash(ADMIN_PASSWORD),
            }}
        )
        print(f"\u2705 Admin user already exists — password, role & verification updated.")
        print(f"   Email: {ADMIN_EMAIL}")
    else:
        db_mongo.users.insert_one({
            'email': ADMIN_EMAIL,
            'phone': ADMIN_PHONE,
            'password_hash': generate_password_hash(ADMIN_PASSWORD),
            'full_name': ADMIN_NAME,
            'role': 'admin',
            'email_verified': True,
            'phone_verified': True,
            'created_at': datetime.utcnow(),
            'last_login': None,
        })
        print(f"\u2705 Admin user created in MongoDB!")
        print(f"   Email:    {ADMIN_EMAIL}")
        print(f"   Password: {ADMIN_PASSWORD}")
        print(f"   Role:     admin")

if __name__ == '__main__':
    create_admin()

"""
Quick script to create/update the admin user in the database.
Run once: python create_admin.py
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from extensions import db
from models.user import User

ADMIN_EMAIL    = 'admin@nanospace.com'
ADMIN_PASSWORD = 'Admin@123'
ADMIN_NAME     = 'Admin'
ADMIN_PHONE    = '+91-9876543210'

def create_admin():
    app = create_app()
    with app.app_context():
        existing = User.query.filter_by(email=ADMIN_EMAIL).first()
        if existing:
            # Update role to admin in case it was created as something else
            existing.role = 'admin'
            existing.email_verified = True
            existing.phone_verified = True
            existing.set_password(ADMIN_PASSWORD)
            db.session.commit()
            print(f"✅ Admin user already exists — password, role & verification updated.")
            print(f"   Email: {ADMIN_EMAIL}")
            print(f"   Role:  {existing.role}")
        else:
            admin = User(
                email=ADMIN_EMAIL,
                full_name=ADMIN_NAME,
                phone=ADMIN_PHONE,
                role='admin',
                email_verified=True,
                phone_verified=True
            )
            admin.set_password(ADMIN_PASSWORD)
            db.session.add(admin)
            db.session.commit()
            print(f"✅ Admin user created successfully!")
            print(f"   Email:    {ADMIN_EMAIL}")
            print(f"   Password: {ADMIN_PASSWORD}")
            print(f"   Role:     admin")

if __name__ == '__main__':
    create_admin()

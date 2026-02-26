"""
Migration: Add contact_name, contact_email, contact_phone columns to properties table.
Run this ONCE: python migrate_add_contact_fields.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from extensions import db
import sqlalchemy

app = create_app()
with app.app_context():
    inspector = sqlalchemy.inspect(db.engine)
    existing_cols = [c['name'] for c in inspector.get_columns('properties')]

    migrations = [
        ("contact_name",  "VARCHAR(100)"),
        ("contact_email", "VARCHAR(120)"),
        ("contact_phone", "VARCHAR(20)"),
    ]

    with db.engine.connect() as conn:
        for col_name, col_type in migrations:
            if col_name not in existing_cols:
                conn.execute(sqlalchemy.text(
                    f"ALTER TABLE properties ADD COLUMN {col_name} {col_type}"
                ))
                print(f"  ✅ Added column: {col_name}")
            else:
                print(f"  ⚠️  Column already exists: {col_name}")
        conn.commit()

    print("\n✅ Migration complete.")

"""
Migration: Add visibility and promotional flags to properties table.
Run this ONCE: python migrate_visibility_fields.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from extensions import db
import sqlalchemy

app = create_app()
with app.app_context():
    print(f"Checking columns in table 'properties'...")
    inspector = sqlalchemy.inspect(db.engine)
    existing_cols = [c['name'] for c in inspector.get_columns('properties')]

    migrations = [
        ("is_featured",      "BOOLEAN DEFAULT 0"),
        ("show_on_homepage", "BOOLEAN DEFAULT 0"),
        ("show_on_rent",     "BOOLEAN DEFAULT 0"),
        ("show_on_buy",      "BOOLEAN DEFAULT 0"),
    ]

    with db.engine.connect() as conn:
        for col_name, col_type in migrations:
            if col_name not in existing_cols:
                try:
                    conn.execute(sqlalchemy.text(
                        f"ALTER TABLE properties ADD COLUMN {col_name} {col_type}"
                    ))
                    print(f"  ✅ Added column: {col_name}")
                except Exception as e:
                    print(f"  ❌ Error adding column {col_name}: {e}")
            else:
                print(f"  ⚠️  Column already exists: {col_name}")
        conn.commit()

    print("\n✅ Visibility migration complete.")

import sys; sys.path.insert(0, '.')
from app import create_app
from extensions import db
from models.property import Property
from models.user import User
import sqlalchemy

app = create_app()
with app.app_context():
    admin = User.query.filter_by(email='admin@nanospace.com').first()
    print('Admin:', admin.id if admin else 'NOT FOUND', '| role:', admin.role if admin else '--')

    inspector = sqlalchemy.inspect(db.engine)
    cols = [c['name'] for c in inspector.get_columns('properties')]
    fields_to_check = [
        'contact_name', 'contact_email', 'contact_phone',
        'is_featured', 'show_on_homepage', 'show_on_rent', 'show_on_buy'
    ]
    for col in fields_to_check:
        status = 'OK' if col in cols else 'MISSING!'
        print(f'  Column {col}: {status}')

    props = Property.query.all()
    print(f'Total properties in DB: {len(props)}')
    for p in props:
        print(f'  id={p.id} name={repr(p.name)} status={p.status} owner={p.contact_name}')

import sys
sys.path.insert(0, '.')
from mongo_client import db_mongo
from werkzeug.security import check_password_hash

admin = db_mongo.users.find_one({'email': 'admin@nanospace.com'})
if not admin:
    print("ERROR: No admin user found in MongoDB!")
else:
    print("Admin found:")
    print("  email:", admin.get('email'))
    print("  role:", admin.get('role'))
    print("  full_name:", admin.get('full_name'))
    print("  has password_hash:", 'password_hash' in admin)
    if 'password_hash' in admin:
        test_passwords = ['Admin@123', 'admin123', 'Admin123', 'nanospace123', 'admin@123']
        for pwd in test_passwords:
            result = check_password_hash(admin['password_hash'], pwd)
            print("  check('%s') => %s" % (pwd, result))

import sys
sys.path.insert(0, '.')
from mongo_client import db_mongo

users_total = db_mongo.users.count_documents({})
enquiries_total = db_mongo.enquiries.count_documents({})
bookings_total = db_mongo.bookings.count_documents({})
properties_total = db_mongo.properties.count_documents({})

users = list(db_mongo.users.find({}, {'_id': 1, 'email': 1, 'full_name': 1, 'role': 1}))
enquiries = list(db_mongo.enquiries.find({}))

print("=== COUNTS ===")
print("Users:", users_total)
print("Enquiries:", enquiries_total)
print("Bookings:", bookings_total)
print("Properties (MongoDB):", properties_total)
print()
print("=== USERS ===")
for u in users:
    print(" ", u.get("email"), "| role:", u.get("role"))
print()
print("=== ENQUIRIES ===")
for e in enquiries:
    print("  name=%s | email=%s | status=%s | type=%s" % (
        e.get("name"), e.get("email"), e.get("status"), e.get("enquiry_type")
    ))

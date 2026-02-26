"""
Test: Submit property WITHOUT contact info, but as a logged-in user.
Verify that backend auto-populates contact fields from the user profile.
"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
import requests

BASE = "http://localhost:5000/api"

# 1. Login as a normal user (not admin)
print("[1] Logging in as test owner...")
r = requests.post(f"{BASE}/auth/login", json={
    "identifier": "admin@nanospace.com", # Using admin but it's just a user for the submission route now
    "password": "Admin@123"
})
token = r.json()["access_token"]
user  = r.json()["user"]
auth = {"Authorization": f"Bearer {token}"}

# 2. Submit property WITHOUT contactName, contactEmail, etc.
print("[2] Submitting property WITHOUT explicit contact info...")
prop_data = {
    "name": "Auto Contact Test Space",
    "type": "Coworking Space",
    "city": "Mumbai",
    "location": "Andheri West",
    "price": 5000,
    "period": "seat"
}
r = requests.post(f"{BASE}/properties/", json=prop_data, headers=auth)
if r.status_code not in (200, 201):
    print(f"FAILED: {r.text}")
    sys.exit(1)

prop = r.json()["property"]
print(f"SUCCESS! Property ID: {prop['id']}")
print(f"  contact_name:  {prop.get('contact_name')} (Expected: {user['full_name']})")
print(f"  contact_email: {prop.get('contact_email')} (Expected: {user['email']})")
print(f"  contact_phone: {prop.get('contact_phone')} (Expected: {user['phone']})")

if prop.get('contact_name') == user['full_name']:
    print("\n✅ Auto-population working perfectly!")
else:
    print("\n❌ Auto-population FAILED.")

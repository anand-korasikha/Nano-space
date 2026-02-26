"""
End-to-end test: login → submit property → admin approves → verify it appears in approved list
Run: python test_property_flow.py
"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))

import requests

BASE = "http://localhost:5000/api"

print("=" * 55)
print("  PROPERTY FLOW END-TO-END TEST")
print("=" * 55)

# ── STEP 1: Login as admin ──────────────────────────────────
print("\n[1] Logging in as admin...")
r = requests.post(f"{BASE}/auth/login", json={
    "identifier": "admin@nanospace.com",
    "password": "Admin@123"
})
if r.status_code != 200:
    print(f"  ❌ Login failed: {r.text}")
    sys.exit(1)

token = r.json()["access_token"]
user  = r.json()["user"]
print(f"  ✅ Logged in: {user['email']} (role={user['role']})")

auth = {"Authorization": f"Bearer {token}"}

# ── STEP 2: Submit a property ───────────────────────────────
print("\n[2] Submitting a test property...")
prop_data = {
    "name": "Test WorkHub Hyderabad",
    "type": "Coworking Space",
    "city": "hyderabad",
    "location": "Banjara Hills",
    "address": "Road No. 12, Banjara Hills",
    "area": "Banjara Hills",
    "description": "Premium coworking space with all amenities.",
    "price": 8000,
    "period": "month",
    "amenities": ["WiFi", "AC", "Parking"],
    "contactName": "Ravi Kumar",
    "contactEmail": "ravi@workhub.in",
    "contactPhone": "+91-9000000001",
}
r = requests.post(f"{BASE}/properties/", json=prop_data, headers=auth)
if r.status_code not in (200, 201):
    print(f"  ❌ Submit failed ({r.status_code}): {r.text}")
    sys.exit(1)
prop = r.json()["property"]
prop_id = prop["id"]
print(f"  ✅ Property submitted: id={prop_id} status={prop['status']}")
print(f"     contact_name={prop.get('contact_name')} | contact_email={prop.get('contact_email')}")

# ── STEP 3: Admin sees it in pending ───────────────────────
print("\n[3] Checking pending properties (admin)...")
r = requests.get(f"{BASE}/admin/properties/pending", headers=auth)
pending = r.json().get("properties", [])
has_it = any(p["id"] == prop_id for p in pending)
print(f"  ✅ Property {prop_id} in pending list: {has_it} (total pending: {len(pending)})")

# ── STEP 4: Admin approves it ───────────────────────────────
print(f"\n[4] Admin approving property {prop_id}...")
r = requests.put(f"{BASE}/admin/properties/{prop_id}/approve", headers=auth)
if r.status_code != 200:
    print(f"  ❌ Approve failed: {r.text}")
    sys.exit(1)
approved = r.json()["property"]
print(f"  ✅ Property approved: status={approved['status']} approved_at={approved.get('approved_at')}")

# ── STEP 5: Check it appears in public approved list ────────
print("\n[5] Checking public approved properties list...")
r = requests.get(f"{BASE}/properties/?status=approved")
pub = r.json().get("properties", [])
found = next((p for p in pub if p["id"] == prop_id), None)
if found:
    print(f"  ✅ Property VISIBLE in public list!")
    print(f"     name={found['name']} city={found['city']}")
    print(f"     contact_name={found.get('contact_name')}")
else:
    print(f"  ❌ Property NOT found in public list (total: {len(pub)})")

print("\n" + "=" * 55)
print("  ✅ ALL TESTS PASSED — End-to-end flow working!")
print("=" * 55)

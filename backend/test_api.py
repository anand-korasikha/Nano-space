import requests
import json

BASE_URL = "http://localhost:5000"

def test_health():
    print("\n🔍 Testing Health Check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        if response.status_code == 200:
            print("✅ Health Check Passed!")
        else:
            print("❌ Health Check Failed!")
    except Exception as e:
        print(f"❌ Error during health check: {e}")

def test_get_properties():
    print("\n🔍 Testing Get Properties API...")
    try:
        response = requests.get(f"{BASE_URL}/api/properties")
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            # If it's a list or a dict containing a list
            count = len(data) if isinstance(data, list) else len(data.get('properties', []))
            print(f"✅ Properties API Working! Found {count} properties.")
        else:
            print(f"❌ Properties API Failed! {response.text}")
    except Exception as e:
        print(f"❌ Error during properties test: {e}")

def test_login_invalid():
    print("\n🔍 Testing Login Auth (Negative Test)...")
    try:
        payload = {
            "identifier": "wrong@user.com",
            "password": "wrongpassword"
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        print(f"Status: {response.status_code} (Expected 401/404)")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        if response.status_code in [401, 404]:
            print("✅ Auth API responds correctly to invalid credentials.")
        else:
            print(f"❓ Auth API returned unexpected status: {response.status_code}")
    except Exception as e:
        print(f"❌ Error during auth test: {e}")

if __name__ == "__main__":
    print("🚀 Starting API Tests against " + BASE_URL)
    test_health()
    test_get_properties()
    test_login_invalid()
    print("\n🏁 Testing Finished!")

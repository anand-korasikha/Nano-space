import requests

def test_upload():
    login_url = "http://localhost:5000/api/auth/login"
    login_data = {"identifier": "admin@nanospace.com", "password": "Admin@123"}
    
    try:
        r = requests.post(login_url, json=login_data)
        r.raise_for_status()
        token = r.json()["access_token"]
        print("Login successful")
        
        upload_url = "http://localhost:5000/api/uploads/image"
        headers = {"Authorization": f"Bearer {token}"}
        
        # Create a dummy image file
        with open("test_img.png", "wb") as f:
            f.write(b"dummy image data")
            
        with open("test_img.png", "rb") as f:
            files = {"file": ("test_img.png", f, "image/png")}
            r = requests.post(upload_url, headers=headers, files=files)
            
        print(f"Status Code: {r.status_code}")
        print(f"Response: {r.text}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_upload()

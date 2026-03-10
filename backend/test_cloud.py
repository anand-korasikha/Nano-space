import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import base64

load_dotenv()

# Setup config exactly as in the app
cloudinary.config(
    cloud_name="dwybarocp",
    api_key=os.environ.get("CLOUDINARY_API_KEY", ""),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET", ""),
    secure=True,
)

print("Cloud Config:", cloudinary.config().cloud_name)
print("API Key configured?", bool(os.environ.get("CLOUDINARY_API_KEY")))
print("API Secret configured?", bool(os.environ.get("CLOUDINARY_API_SECRET")))

# A simple tiny 1x1 transparent PNG as base64
dummy_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="

try:
    print("Testing upload...")
    res = cloudinary.uploader.upload(
        dummy_img,
        folder="nanospace/test_upload",
        use_filename=True,
        unique_filename=True
    )
    print("Upload SUCCESS! URL:", res.get("secure_url"))
except Exception as e:
    print("Upload FAILED:", str(e))

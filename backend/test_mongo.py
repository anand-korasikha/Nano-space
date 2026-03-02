import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# Load environment variables
load_dotenv()

mongo_uri = os.environ.get('MONGO_URI') or os.environ.get('DATABASE_URL')
print(f"Connecting to: {mongo_uri}")

if not mongo_uri or "mongodb" not in mongo_uri:
    print("Error: Invalid or missing MongoDB URI in .env")
    exit(1)

try:
    # Use a short timeout so it doesn't hang indefinitely
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
    # The ismaster command is cheap and does not require auth.
    client.admin.command('ismaster')
    print("✅ Successfully connected to MongoDB Atlas!")
    
    # Check if we can get the databases
    db = client.get_database()
    print(f"✅ Active Database connection: {db.name}")

    collections = db.list_collection_names()
    print(f"✅ Collections found: {collections}")

except ConnectionFailure as e:
    print("❌ MongoDB Connection failed!")
    print(e)
except Exception as e:
    print("❌ An error occurred!")
    print(e)

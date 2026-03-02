import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

def get_mongo_db():
    mongo_uri = os.environ.get('MONGO_URI') or os.environ.get('DATABASE_URL')
    if not mongo_uri or "mongodb" not in mongo_uri:
        # Fallback for dev if not set
        mongo_uri = "mongodb://localhost:27017/nanospace"
    client = MongoClient(mongo_uri)
    return client.get_database()

db_mongo = get_mongo_db()

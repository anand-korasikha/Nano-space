import os
import certifi
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

# Force dnspython (used by pymongo for SRV resolution) to use Google public DNS
try:
    import dns.resolver
    dns.resolver.default_resolver = dns.resolver.Resolver(configure=False)
    dns.resolver.default_resolver.nameservers = ['8.8.8.8']
    dns.resolver.default_resolver.timeout = 5
    dns.resolver.default_resolver.lifetime = 5
except Exception:
    pass

def get_mongo_db():
    mongo_uri = os.environ.get('MONGO_URI') or os.environ.get('DATABASE_URL')
    if not mongo_uri or "mongodb" not in mongo_uri:
        mongo_uri = "mongodb://localhost:27017/nanospace"

    client = MongoClient(
        mongo_uri,
        tlsCAFile=certifi.where(),
        serverSelectionTimeoutMS=15000,
        connectTimeoutMS=15000,
        socketTimeoutMS=15000,
    )
    return client.get_database()

db_mongo = get_mongo_db()

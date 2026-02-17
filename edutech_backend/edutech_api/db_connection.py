from pymongo import MongoClient

def get_db_connection():
    username = 'luckylakshmanna64_db_user'
    password = 'EtZcOsGx6UUWJVMi'
    cluster = 'cluster0.zbira1f.mongodb.net'
    db_name = 'edulearn_db'
    
    mongo_uri = f"mongodb+srv://{username}:{password}@{cluster}/{db_name}?retryWrites=true&w=majority"
    client = MongoClient(mongo_uri)
    return client[db_name]

def get_collection(collection_name):
    db = get_db_connection()
    return db[collection_name]

from datetime import datetime
from bson import ObjectId
from edutech_api.db_connection import get_collection
import bcrypt

class User:
    collection = get_collection('users')
    
    @staticmethod
    def create_user(name, email, password, role='student'):
        if User.collection.find_one({'email': email}):
            return None
        
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        user_data = {
            'name': name,
            'email': email,
            'password': hashed_password.decode('utf-8'),
            'role': role,
            'status': 'active',
            'enrolled_courses': [],
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        result = User.collection.insert_one(user_data)
        user_data['_id'] = str(result.inserted_id)
        return user_data
    
    @staticmethod
    def authenticate(email, password):
        user = User.collection.find_one({'email': email})
        if not user:
            return None
        
        if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            user['_id'] = str(user['_id'])
            return user
        return None
    
    @staticmethod
    def get_by_id(user_id):
        user = User.collection.find_one({'_id': ObjectId(user_id)})
        if user:
            user['_id'] = str(user['_id'])
        return user
    
    @staticmethod
    def get_by_email(email):
        user = User.collection.find_one({'email': email})
        if user:
            user['_id'] = str(user['_id'])
        return user

from datetime import datetime
from bson import ObjectId
from edutech_api.db_connection import get_collection

class Payment:
    collection = get_collection('payments')
    
    @staticmethod
    def create_payment(data):
        payment_data = {
            'user_id': data.get('user_id'),
            'course_id': data.get('course_id'),
            'amount': float(data.get('amount', 0)),
            'payment_method': data.get('payment_method'),
            'status': 'completed',
            'transaction_id': data.get('transaction_id'),
            'created_at': datetime.utcnow()
        }
        
        result = Payment.collection.insert_one(payment_data)
        payment_data['_id'] = str(result.inserted_id)
        return payment_data
    
    @staticmethod
    def get_all_payments():
        payments = list(Payment.collection.find())
        for payment in payments:
            payment['_id'] = str(payment['_id'])
        return payments

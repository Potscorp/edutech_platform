from datetime import datetime
from bson import ObjectId
from edutech_api.db_connection import get_collection

class Course:
    collection = get_collection('courses')
    
    @staticmethod
    def create_course(data):
        course_data = {
            'title': data.get('title'),
            'description': data.get('description'),
            'category': data.get('category'),
            'price': float(data.get('price', 0)),
            'instructor_id': data.get('instructor_id'),
            'thumbnail': data.get('thumbnail', ''),
            'modules': data.get('modules', []),
            'students': [],
            'status': 'active',
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        result = Course.collection.insert_one(course_data)
        course_data['_id'] = str(result.inserted_id)
        return course_data
    
    @staticmethod
    def get_all_courses():
        courses = list(Course.collection.find({'status': 'active'}))
        for course in courses:
            course['_id'] = str(course['_id'])
        return courses
    
    @staticmethod
    def get_by_id(course_id):
        course = Course.collection.find_one({'_id': ObjectId(course_id)})
        if course:
            course['_id'] = str(course['_id'])
        return course
    
    @staticmethod
    def update_course(course_id, data):
        data['updated_at'] = datetime.utcnow()
        result = Course.collection.update_one(
            {'_id': ObjectId(course_id)},
            {'$set': data}
        )
        return result.modified_count > 0
    
    @staticmethod
    def delete_course(course_id):
        result = Course.collection.delete_one({'_id': ObjectId(course_id)})
        return result.deleted_count > 0

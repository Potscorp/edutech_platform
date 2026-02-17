from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from bson import ObjectId

@api_view(['POST'])
def signup(request):
    try:
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        role = request.data.get('role', 'student')
        
        if not all([name, email, password]):
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.create_user(name, email, password, role)
        
        if not user:
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        token = generate_token(user)
        
        return Response({
            'message': 'User created successfully',
            'token': token,
            'user': {
                'id': user['_id'],
                'name': user['name'],
                'email': user['email'],
                'role': user['role']
            }
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not all([email, password]):
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.authenticate(email, password)
        
        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        token = generate_token(user)
        
        return Response({
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user['_id'],
                'name': user['name'],
                'email': user['email'],
                'role': user['role']
            }
        }, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_user(request):
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        
        if not token:
            return Response({'error': 'Token required'}, status=status.HTTP_401_UNAUTHORIZED)
        
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        
        if not ObjectId.is_valid(payload['user_id']):
            return Response({'error': 'Invalid user ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.get_by_id(payload['user_id'])
        
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            'user': {
                'id': user['_id'],
                'name': user['name'],
                'email': user['email'],
                'role': user['role'],
                'status': user['status']
            }
        }, status=status.HTTP_200_OK)
    
    except jwt.ExpiredSignatureError:
        return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.InvalidTokenError:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def generate_token(user):
    payload = {
        'user_id': user['_id'],
        'email': user['email'],
        'role': user['role'],
        'exp': datetime.utcnow() + timedelta(hours=settings.JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

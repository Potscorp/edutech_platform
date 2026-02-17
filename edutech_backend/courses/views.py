from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Course
from .payments import Payment
from bson import ObjectId
from bson.errors import InvalidId

@api_view(['GET'])
def get_courses(request):
    try:
        courses = Course.get_all_courses()
        return Response({'courses': courses}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_course(request, course_id):
    try:
        if not ObjectId.is_valid(course_id):
            return Response({'error': 'Invalid course ID'}, status=status.HTTP_400_BAD_REQUEST)
        course = Course.get_by_id(course_id)
        if not course:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'course': course}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def create_course(request):
    try:
        course = Course.create_course(request.data)
        return Response({
            'message': 'Course created successfully',
            'course': course
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def update_course(request, course_id):
    try:
        if not ObjectId.is_valid(course_id):
            return Response({'error': 'Invalid course ID'}, status=status.HTTP_400_BAD_REQUEST)
        success = Course.update_course(course_id, request.data)
        if success:
            return Response({'message': 'Course updated successfully'}, status=status.HTTP_200_OK)
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def delete_course(request, course_id):
    try:
        if not ObjectId.is_valid(course_id):
            return Response({'error': 'Invalid course ID'}, status=status.HTTP_400_BAD_REQUEST)
        success = Course.delete_course(course_id)
        if success:
            return Response({'message': 'Course deleted successfully'}, status=status.HTTP_200_OK)
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def process_payment(request):
    try:
        payment = Payment.create_payment(request.data)
        return Response({
            'message': 'Payment processed successfully',
            'payment': payment
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_payments(request):
    try:
        payments = Payment.get_all_payments()
        return Response({'payments': payments}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

import requests
import json

BASE_URL = 'http://127.0.0.1:8000/api'

print("=" * 60)
print("EDULEARN API TEST SUITE")
print("=" * 60)

# Test 1: Signup
print("\n[TEST 1] User Signup")
signup_data = {
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "test123",
    "role": "student"
}

try:
    response = requests.post(f'{BASE_URL}/auth/signup/', json=signup_data)
    print(f"Status: {response.status_code}")
    result = response.json()
    print(f"Response: {json.dumps(result, indent=2)}")
    
    if response.status_code == 201:
        print("✓ PASS: Signup successful")
        token = result.get('token')
    else:
        print("✗ FAIL: Signup failed")
        token = None
except Exception as e:
    print(f"✗ ERROR: {e}")
    token = None

# Test 2: Login
print("\n[TEST 2] User Login")
login_data = {
    "email": "testuser@example.com",
    "password": "test123"
}

try:
    response = requests.post(f'{BASE_URL}/auth/login/', json=login_data)
    print(f"Status: {response.status_code}")
    result = response.json()
    print(f"Response: {json.dumps(result, indent=2)}")
    
    if response.status_code == 200:
        print("✓ PASS: Login successful")
        token = result.get('token')
    else:
        print("✗ FAIL: Login failed")
except Exception as e:
    print(f"✗ ERROR: {e}")

# Test 3: Get User Profile
if token:
    print("\n[TEST 3] Get User Profile")
    headers = {'Authorization': f'Bearer {token}'}
    
    try:
        response = requests.get(f'{BASE_URL}/auth/user/', headers=headers)
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if response.status_code == 200:
            print("✓ PASS: User profile retrieved")
        else:
            print("✗ FAIL: Failed to get user profile")
    except Exception as e:
        print(f"✗ ERROR: {e}")

# Test 4: Get Courses
print("\n[TEST 4] Get All Courses")
try:
    response = requests.get(f'{BASE_URL}/courses/')
    print(f"Status: {response.status_code}")
    result = response.json()
    print(f"Response: {json.dumps(result, indent=2)}")
    
    if response.status_code == 200:
        print("✓ PASS: Courses retrieved")
    else:
        print("✗ FAIL: Failed to get courses")
except Exception as e:
    print(f"✗ ERROR: {e}")

# Test 5: Create Course
print("\n[TEST 5] Create Course")
course_data = {
    "title": "Test Course",
    "description": "This is a test course",
    "category": "programming",
    "price": 49.99,
    "instructor_id": "test_instructor",
    "modules": [
        {
            "title": "Module 1",
            "lessons": [
                {"title": "Lesson 1", "type": "video", "duration": "10:00"}
            ]
        }
    ]
}

try:
    response = requests.post(f'{BASE_URL}/courses/create/', json=course_data)
    print(f"Status: {response.status_code}")
    result = response.json()
    print(f"Response: {json.dumps(result, indent=2)}")
    
    if response.status_code == 201:
        print("✓ PASS: Course created")
    else:
        print("✗ FAIL: Failed to create course")
except Exception as e:
    print(f"✗ ERROR: {e}")

# Test 6: Invalid Login
print("\n[TEST 6] Invalid Login (Should Fail)")
invalid_login = {
    "email": "wrong@example.com",
    "password": "wrongpass"
}

try:
    response = requests.post(f'{BASE_URL}/auth/login/', json=invalid_login)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 401:
        print("✓ PASS: Invalid login correctly rejected")
    else:
        print("✗ FAIL: Should have rejected invalid login")
except Exception as e:
    print(f"✗ ERROR: {e}")

print("\n" + "=" * 60)
print("TEST SUITE COMPLETED")
print("=" * 60)

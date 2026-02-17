# Django Backend Setup - EduLearn Platform

## MongoDB Atlas Connection Established ✅

**Database:** edulearn_db
**Username:** luckylakshmanna64_db_user
**Authentication:** SCRAM
**Role:** atlasAdmin@admin
**IP Whitelist:** 205.254.184.162/32

## Installation & Setup

### 1. Install Dependencies
```bash
cd edutech_backend
pip install -r requirements.txt
```

### 2. Environment Configuration
The `.env` file is already configured with your MongoDB credentials:
- MongoDB Atlas connection string
- JWT secret keys
- Database settings

### 3. Run Server
```bash
python manage.py runserver
```

Server will start at: `http://127.0.0.1:8000`

## API Endpoints

### Authentication APIs

#### 1. User Signup
**POST** `/api/auth/signup/`

Request Body:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
}
```

Response:
```json
{
    "message": "User created successfully",
    "token": "jwt_token_here",
    "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "student"
    }
}
```

#### 2. User Login
**POST** `/api/auth/login/`

Request Body:
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

Response:
```json
{
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "student"
    }
}
```

#### 3. Get User Profile
**GET** `/api/auth/user/`

Headers:
```
Authorization: Bearer jwt_token_here
```

Response:
```json
{
    "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "student",
        "status": "active"
    }
}
```

### Course APIs

#### 1. Get All Courses
**GET** `/api/courses/`

Response:
```json
{
    "courses": [
        {
            "_id": "course_id",
            "title": "Web Development",
            "description": "Learn web development",
            "category": "programming",
            "price": 49.99,
            "modules": []
        }
    ]
}
```

#### 2. Get Single Course
**GET** `/api/courses/<course_id>/`

#### 3. Create Course
**POST** `/api/courses/create/`

Request Body:
```json
{
    "title": "Complete Web Development",
    "description": "Full stack web development course",
    "category": "programming",
    "price": 49.99,
    "instructor_id": "instructor_id",
    "modules": [
        {
            "title": "Introduction",
            "lessons": [
                {
                    "title": "Getting Started",
                    "type": "video",
                    "duration": "10:30"
                }
            ]
        }
    ]
}
```

#### 4. Update Course
**PUT** `/api/courses/<course_id>/update/`

#### 5. Delete Course
**DELETE** `/api/courses/<course_id>/delete/`

## MongoDB Collections

### Users Collection
```javascript
{
    _id: ObjectId,
    name: String,
    email: String,
    password: String (hashed),
    role: String (student/instructor/admin),
    status: String (active/inactive),
    enrolled_courses: Array,
    created_at: DateTime,
    updated_at: DateTime
}
```

### Courses Collection
```javascript
{
    _id: ObjectId,
    title: String,
    description: String,
    category: String,
    price: Number,
    instructor_id: String,
    thumbnail: String,
    modules: Array,
    students: Array,
    status: String,
    created_at: DateTime,
    updated_at: DateTime
}
```

## Frontend Integration

### Update JavaScript to use API

Replace localStorage calls in `js/script.js`:

```javascript
// Login
async function handleLogin(event) {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    
    try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            closeModal('loginModal');
            showDashboard();
            alert('Login successful!');
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}

// Signup
async function handleSignup(event) {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const confirmPassword = event.target[3].value;
    const role = event.target[4].value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/signup/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            closeModal('signupModal');
            showDashboard();
            alert('Account created successfully!');
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Signup failed: ' + error.message);
    }
}

// Fetch Courses
async function loadCourses() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/courses/');
        const data = await response.json();
        renderCourses(data.courses);
    } catch (error) {
        console.error('Failed to load courses:', error);
    }
}
```

## Testing the API

### Using cURL

```bash
# Signup
curl -X POST http://127.0.0.1:8000/api/auth/signup/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123","role":"student"}'

# Login
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get Courses
curl http://127.0.0.1:8000/api/courses/
```

### Using Postman
1. Import the endpoints
2. Set Content-Type: application/json
3. For authenticated routes, add Authorization header: Bearer {token}

## Security Features

✅ Password hashing with bcrypt
✅ JWT token authentication
✅ CORS enabled for frontend
✅ MongoDB Atlas secure connection
✅ Environment variables for sensitive data

## Next Steps

1. **File Upload**: Add endpoints for video/image uploads
2. **Payment Integration**: Add Stripe/PayPal endpoints
3. **Email Verification**: Add email service
4. **Admin Panel**: Add admin-specific endpoints
5. **Analytics**: Add tracking endpoints

## Troubleshooting

### MongoDB Connection Issues
- Verify IP whitelist includes your current IP
- Check credentials in .env file
- Ensure MongoDB Atlas cluster is running

### CORS Errors
- CORS is enabled for all origins in development
- For production, update CORS_ALLOW_ALL_ORIGINS in settings.py

### JWT Token Issues
- Tokens expire after 24 hours
- Store token in localStorage on frontend
- Include in Authorization header for protected routes

## Production Deployment

1. Set DEBUG=False in .env
2. Update ALLOWED_HOSTS
3. Use environment variables for all secrets
4. Enable HTTPS
5. Configure proper CORS origins
6. Set up proper logging

---

**Backend is ready! Start the server and connect your frontend.**

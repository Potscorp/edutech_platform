# EduLearn Backend - Quick Start

## ✅ Status: READY TO USE

### MongoDB Connection
- **Status**: ✅ Connected
- **Cluster**: cluster0.zbira1f.mongodb.net
- **Database**: edulearn_db
- **Username**: luckylakshmanna64_db_user

### Start Server

**Option 1: Double-click**
```
start_server.bat
```

**Option 2: Command line**
```bash
cd edutech_backend
venv\Scripts\python manage.py runserver
```

Server runs at: **http://127.0.0.1:8000**

### API Endpoints

#### 1. Signup
```bash
POST http://127.0.0.1:8000/api/auth/signup/
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
}
```

#### 2. Login
```bash
POST http://127.0.0.1:8000/api/auth/login/
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
```

#### 3. Get User
```bash
GET http://127.0.0.1:8000/api/auth/user/
Authorization: Bearer YOUR_TOKEN
```

#### 4. Get Courses
```bash
GET http://127.0.0.1:8000/api/courses/
```

### Test with cURL

```bash
# Signup
curl -X POST http://127.0.0.1:8000/api/auth/signup/ -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"test123\",\"role\":\"student\"}"

# Login
curl -X POST http://127.0.0.1:8000/api/auth/login/ -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\",\"password\":\"test123\"}"
```

### Frontend Integration

Update `edutech-platform/js/script.js`:

```javascript
const API_URL = 'http://127.0.0.1:8000/api';

async function handleLogin(event) {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    
    const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });
    
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Login successful!');
    }
}

async function handleSignup(event) {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const role = event.target[4].value;
    
    const response = await fetch(`${API_URL}/auth/signup/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password, role})
    });
    
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Signup successful!');
    }
}
```

### All Set! 🎉
Backend is ready. Start the server and test the APIs!

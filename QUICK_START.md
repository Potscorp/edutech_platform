# 🚀 QUICK START GUIDE

## ⚡ Start in 2 Steps

### Step 1: Start Backend
**Double-click:** `START_BACKEND.bat`

OR run in terminal:
```bash
cd edutech_backend
python manage.py runserver 8000
```

### Step 2: Open Frontend
**Open in browser:** `index.html`

---

## 🧪 Test Connection
**Open in browser:** `test-connection.html`
Click buttons to test API endpoints

---

## 🔑 Login Credentials

### Admin Panel
- Email: `admin@edulearn.com`
- Password: `admin123`
- Access: Full admin features

### New Users
Use signup form to create accounts

---

## ✅ What's Connected

✅ **Frontend** → JavaScript files use API calls
✅ **Backend** → Django REST API on port 8000
✅ **Database** → MongoDB Atlas cloud database

---

## 📋 Features Working

| Feature | Status |
|---------|--------|
| User Signup | ✅ Working |
| User Login | ✅ Working |
| Load Courses | ✅ Working |
| Create Course | ✅ Working |
| Delete Course | ✅ Working |
| Admin Panel | ✅ Working |
| Payments | ✅ Working |

---

## 🔧 Files to Know

### Frontend
- `index.html` - Main page
- `admin.html` - Admin panel
- `js/config.js` - API configuration
- `js/script.js` - Main logic
- `js/admin.js` - Admin logic

### Backend
- `edutech_backend/manage.py` - Django manager
- `edutech_backend/edutech_api/settings.py` - Settings
- `edutech_backend/accounts/views.py` - Auth logic
- `edutech_backend/courses/views.py` - Course logic

---

## 🐛 Troubleshooting

**Backend won't start?**
```bash
cd edutech_backend
pip install -r requirements.txt
```

**API not responding?**
- Check backend is running on port 8000
- Open http://localhost:8000/api/courses/

**CORS errors?**
- Backend CORS is configured
- Make sure backend is running

---

## 📊 API Endpoints

```
http://localhost:8000/api/auth/signup/
http://localhost:8000/api/auth/login/
http://localhost:8000/api/courses/
http://localhost:8000/api/courses/create/
http://localhost:8000/api/courses/payments/
```

---

## 💡 Quick Tips

1. Always start backend first
2. Use `test-connection.html` to verify API
3. Check browser console for errors
4. Admin credentials are hardcoded
5. MongoDB is cloud-hosted (always available)

---

## 🎯 Next Steps

1. ✅ Start backend
2. ✅ Open frontend
3. ✅ Test signup/login
4. ✅ Create courses as admin
5. ✅ Customize as needed

---

**Everything is ready! Just start the backend and go! 🚀**

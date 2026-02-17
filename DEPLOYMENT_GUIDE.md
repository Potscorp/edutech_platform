# 🚀 CONNECT GITHUB PAGES FRONTEND TO BACKEND

## Current Setup
- **Frontend:** https://potscorp.github.io/edutech_platform/
- **Backend:** Needs to be deployed (currently local only)

---

## ✅ SOLUTION: Deploy Backend to Render (Free)

### Step 1: Deploy Backend to Render

1. **Go to:** https://render.com
2. **Sign up/Login** with GitHub
3. **Click:** "New +" → "Web Service"
4. **Connect Repository:** `Potscorp/edutech_platform`
5. **Configure:**
   ```
   Name: edutech-backend
   Root Directory: edutech_backend
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn edutech_api.wsgi:application
   ```
6. **Add Environment Variables:**
   ```
   PYTHON_VERSION=3.12.0
   ```
7. **Click:** "Create Web Service"
8. **Wait** for deployment (5-10 minutes)
9. **Copy** your backend URL (e.g., `https://edutech-backend.onrender.com`)

---

### Step 2: Update Frontend API Configuration

Update `js/config.js` with your Render backend URL:

```javascript
const API_CONFIG = {
    BASE_URL: 'https://YOUR-RENDER-URL.onrender.com/api',
    // ... rest of config
};
```

---

### Step 3: Push Updated Code to GitHub

```bash
cd edutech-platform
git add .
git commit -m "Update API config for production backend"
git push origin main
```

GitHub Pages will auto-update in 1-2 minutes.

---

## 🎯 ALTERNATIVE: Deploy Backend to Railway (Free)

### Step 1: Deploy to Railway

1. **Go to:** https://railway.app
2. **Sign up/Login** with GitHub
3. **Click:** "New Project" → "Deploy from GitHub repo"
4. **Select:** `Potscorp/edutech_platform`
5. **Configure:**
   ```
   Root Directory: edutech_backend
   Start Command: gunicorn edutech_api.wsgi:application
   ```
6. **Add Environment Variables:**
   ```
   PORT=8000
   ```
7. **Deploy** and copy your URL

---

## 🎯 ALTERNATIVE: Deploy Backend to PythonAnywhere (Free)

### Step 1: Deploy to PythonAnywhere

1. **Go to:** https://www.pythonanywhere.com
2. **Sign up** for free account
3. **Upload** your `edutech_backend` folder
4. **Configure** WSGI file
5. **Set** environment variables
6. **Start** web app
7. **Copy** your URL (e.g., `https://yourusername.pythonanywhere.com`)

---

## 🎯 QUICK SOLUTION: Use Ngrok (For Testing)

If you just want to test quickly:

### Step 1: Install Ngrok
```bash
# Download from https://ngrok.com/download
```

### Step 2: Start Backend Locally
```bash
cd edutech_backend
python manage.py runserver 8000
```

### Step 3: Expose with Ngrok
```bash
ngrok http 8000
```

### Step 4: Copy Ngrok URL
You'll get a URL like: `https://abc123.ngrok.io`

### Step 5: Update Frontend
Update `js/config.js`:
```javascript
const API_CONFIG = {
    BASE_URL: 'https://abc123.ngrok.io/api',
    // ...
};
```

**Note:** Ngrok URL changes every time you restart. Good for testing only.

---

## 📝 RECOMMENDED APPROACH

### For Production (Best):
1. ✅ Deploy backend to **Render** (free, reliable)
2. ✅ Update `js/config.js` with Render URL
3. ✅ Push to GitHub
4. ✅ GitHub Pages auto-updates

### For Testing (Quick):
1. ✅ Use **Ngrok** to expose local backend
2. ✅ Update `js/config.js` with Ngrok URL
3. ✅ Test immediately

---

## 🔧 UPDATED CONFIG.JS (Auto-Detect)

I've already updated your `config.js` to auto-detect environment:

```javascript
const API_CONFIG = {
    BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:8000/api' 
        : 'https://YOUR-BACKEND-URL.onrender.com/api',
    // ...
};
```

**Just replace `YOUR-BACKEND-URL` with your actual deployed backend URL!**

---

## ✅ CHECKLIST

- [ ] Deploy backend to Render/Railway/PythonAnywhere
- [ ] Copy backend URL
- [ ] Update `js/config.js` with backend URL
- [ ] Commit and push to GitHub
- [ ] Wait 1-2 minutes for GitHub Pages to update
- [ ] Test: https://potscorp.github.io/edutech_platform/
- [ ] Verify API calls work (check browser console)

---

## 🎯 NEXT STEPS

1. **Choose hosting:** Render (recommended)
2. **Deploy backend:** Follow steps above
3. **Update config:** Replace URL in `config.js`
4. **Push to GitHub:** `git push origin main`
5. **Test:** Open your GitHub Pages site

---

## 🆘 NEED HELP?

If you want me to:
1. Deploy to a specific service
2. Update the config with a specific URL
3. Create deployment scripts

Just let me know which hosting service you prefer!

---

**Current Status:**
- ✅ Backend code ready for deployment
- ✅ Frontend on GitHub Pages
- ⏳ Need to deploy backend
- ⏳ Need to update API URL in config.js

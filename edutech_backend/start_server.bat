@echo off
echo ========================================
echo Starting EduLearn Backend Server
echo ========================================
echo.
echo MongoDB: Connected to cluster0.zbira1f.mongodb.net
echo Database: edulearn_db
echo.
echo API Endpoints:
echo - POST http://127.0.0.1:8000/api/auth/signup/
echo - POST http://127.0.0.1:8000/api/auth/login/
echo - GET  http://127.0.0.1:8000/api/auth/user/
echo - GET  http://127.0.0.1:8000/api/courses/
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd /d "%~dp0"
venv\Scripts\python manage.py runserver 8000

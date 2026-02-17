@echo off
echo ========================================
echo   EduLearn Backend Server
echo ========================================
echo.
echo Starting Django backend on port 8000...
echo.
cd edutech_backend
python manage.py runserver 8000
pause

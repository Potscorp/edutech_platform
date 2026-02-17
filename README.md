# EduLearn - Complete EdTech Platform

A full-featured educational technology platform with user registration, admin panel, course creation, video uploads, payment integration, and comprehensive dashboards.

## 🚀 Features

### ✅ User Management
- **User Registration** - Students and instructors can register with role selection
- **Login System** - Secure authentication with localStorage
- **Admin Access** - Special admin login (admin@edulearn.com / admin123)
- **Role-based Access** - Different interfaces for students, instructors, and admins

### ✅ Admin Panel (`admin.html`)
Complete administrative dashboard with:
- **Dashboard Overview** - Statistics for courses, users, revenue, and activity
- **Course Management** - View, edit, and delete courses
- **User Management** - Manage users, toggle status, view enrollments
- **Payment Management** - Track all transactions and revenue
- **Settings** - Platform configuration

### ✅ Course Creation
Full course builder with:
- Course information (title, description, category, price)
- **Image Upload** - Course thumbnail upload with preview
- **Module System** - Add multiple modules to organize content
- **Lesson Management** - Add video or text lessons to each module
- **Video Upload** - Upload video lessons for each module
- Drag-and-drop file uploads

### ✅ Course Player (`course-player.html`)
Interactive learning interface:
- Video player with controls
- Course sidebar with modules and lessons
- Progress tracking
- Mark lessons as complete
- Download resources
- Lesson duration and metadata

### ✅ Payment Integration (`payment.html`)
Complete payment system:
- **Multiple Payment Methods** - Credit/Debit Card, PayPal, Stripe
- Order summary with price breakdown
- Secure payment form
- Card number formatting
- Payment processing simulation
- Transaction history

### ✅ Student Dashboard
Enhanced dashboard with:
- Course enrollment tracking
- Progress visualization
- Certificate management
- Learning statistics
- Course continuation
- Settings and profile management

## 📁 File Structure

```
edutech-platform/
│
├── index.html              # Main landing page
├── admin.html              # Admin panel
├── course-player.html      # Course viewing interface
├── payment.html            # Payment processing
│
├── css/
│   ├── styles.css          # Main styles
│   ├── admin.css           # Admin panel styles
│   ├── player.css          # Course player styles
│   └── payment.css         # Payment page styles
│
├── js/
│   ├── script.js           # Main functionality
│   ├── admin.js            # Admin panel logic
│   ├── player.js           # Course player logic
│   └── payment.js          # Payment processing
│
└── images/                 # Image assets
```

## 🔐 Login Credentials

### Admin Access
- Email: `admin@edulearn.com`
- Password: `admin123`

### Test User
- Register a new account or use localStorage

## 🎯 Usage Guide

### For Students
1. **Register** - Click "Sign Up" and select "Student" role
2. **Browse Courses** - Explore available courses
3. **Enroll** - Click on a course and proceed to payment
4. **Learn** - Access course content via course player
5. **Track Progress** - View progress in dashboard

### For Instructors
1. **Register** - Sign up with "Instructor" role
2. **Access Dashboard** - View your courses and students
3. **Create Content** - (Admin panel access required)

### For Admins
1. **Login** - Use admin credentials
2. **Create Courses** - Use the course creation form
3. **Upload Content** - Add videos, images, and modules
4. **Manage Users** - View and manage all users
5. **Track Payments** - Monitor revenue and transactions

## 🛠️ Course Creation Workflow

1. Navigate to Admin Panel
2. Click "Create Course"
3. Fill in course details
4. Upload course thumbnail
5. Add modules (e.g., "Introduction", "Advanced Topics")
6. Add lessons to each module
7. Upload video files for video lessons
8. Save course

## 💳 Payment Flow

1. User selects a course
2. Clicks "Enroll" or "Buy Now"
3. Redirected to payment page
4. Selects payment method
5. Enters payment details
6. Processes payment
7. Gets instant access to course

## 📊 Data Storage

All data is stored in browser localStorage:
- `registeredUsers` - User accounts
- `currentUser` - Active session
- `adminCourses` - Created courses
- `adminUsers` - User management data
- `adminPayments` - Payment transactions

## 🎨 Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #6366f1;
    --secondary: #8b5cf6;
    --success: #10b981;
}
```

### Add Payment Gateways
Integrate real payment APIs in `payment.js`:
- Stripe API
- PayPal SDK
- Razorpay

### Video Hosting
Replace placeholder video sources with:
- AWS S3
- Vimeo API
- YouTube embed
- Custom CDN

## 🔧 Technical Features

- **Responsive Design** - Works on all devices
- **LocalStorage** - Client-side data persistence
- **File Upload** - Image and video upload support
- **Form Validation** - Input validation on all forms
- **Modal System** - Login/signup modals
- **Dynamic Rendering** - JavaScript-based content generation
- **Progress Tracking** - Course completion tracking
- **Role-based UI** - Different views for different users

## 🚀 Deployment

### Local Development
1. Extract files
2. Open `index.html` in browser
3. No server required!

### Production Deployment
1. Upload to web hosting
2. Configure backend API (optional)
3. Set up database (optional)
4. Integrate real payment gateway
5. Add video hosting service

## 🔄 Backend Integration (Optional)

To connect with a backend:

1. Replace localStorage with API calls
2. Add authentication tokens
3. Implement file upload to server
4. Connect payment gateway
5. Add database for persistence

Example API endpoints needed:
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/courses` - Fetch courses
- `POST /api/courses` - Create course
- `POST /api/upload` - File upload
- `POST /api/payment` - Process payment

## 📱 Mobile App Ready

The platform is mobile-responsive and can be converted to:
- Progressive Web App (PWA)
- React Native app
- Flutter app
- Ionic app

## 🎓 Course Features

- Unlimited modules per course
- Unlimited lessons per module
- Video and text lessons
- Downloadable resources
- Progress tracking
- Completion certificates
- Student reviews (can be added)
- Discussion forums (can be added)

## 💰 Monetization Features

- Course pricing
- Payment processing
- Revenue tracking
- Transaction history
- Refund management (can be added)
- Subscription plans (can be added)
- Coupon codes (can be added)

## 🔒 Security Features

- Password validation
- Email verification (can be added)
- Secure payment forms
- Role-based access control
- Session management

## 📈 Analytics (Can be Added)

- User engagement tracking
- Course completion rates
- Revenue analytics
- Popular courses
- Student demographics

## 🌟 Future Enhancements

- Live classes
- Quiz system
- Assignment submission
- Peer reviews
- Gamification
- Social features
- Mobile apps
- AI recommendations

## 📞 Support

For issues or questions:
- Email: support@edulearn.com
- Documentation: Check this README
- Community: (Add forum link)

## 📄 License

Free to use for educational and commercial projects.

---

**Built with ❤️ for educators and learners worldwide**

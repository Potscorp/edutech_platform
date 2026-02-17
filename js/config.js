// API Configuration
const API_CONFIG = {
    BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:8000/api' 
        : 'https://edutech-backend.onrender.com/api',
    ENDPOINTS: {
        // Auth endpoints
        SIGNUP: '/auth/signup/',
        LOGIN: '/auth/login/',
        GET_USER: '/auth/user/',
        
        // Course endpoints
        GET_COURSES: '/courses/',
        GET_COURSE: '/courses/',
        CREATE_COURSE: '/courses/create/',
        UPDATE_COURSE: '/courses/',
        DELETE_COURSE: '/courses/',
        
        // Payment endpoints
        GET_PAYMENTS: '/courses/payments/',
        PROCESS_PAYMENT: '/courses/payment/process/'
    }
};

// API Helper Functions
const API = {
    // Make API request
    async request(endpoint, options = {}) {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        const token = localStorage.getItem('authToken');
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers
            },
            ...options
        };
        
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    // Auth methods
    async signup(userData) {
        return this.request(API_CONFIG.ENDPOINTS.SIGNUP, {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },
    
    async login(credentials) {
        return this.request(API_CONFIG.ENDPOINTS.LOGIN, {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    },
    
    async getUser() {
        return this.request(API_CONFIG.ENDPOINTS.GET_USER);
    },
    
    // Course methods
    async getCourses() {
        return this.request(API_CONFIG.ENDPOINTS.GET_COURSES);
    },
    
    async getCourse(courseId) {
        return this.request(`${API_CONFIG.ENDPOINTS.GET_COURSE}${courseId}/`);
    },
    
    async createCourse(courseData) {
        return this.request(API_CONFIG.ENDPOINTS.CREATE_COURSE, {
            method: 'POST',
            body: JSON.stringify(courseData)
        });
    },
    
    async updateCourse(courseId, courseData) {
        return this.request(`${API_CONFIG.ENDPOINTS.UPDATE_COURSE}${courseId}/update/`, {
            method: 'PUT',
            body: JSON.stringify(courseData)
        });
    },
    
    async deleteCourse(courseId) {
        return this.request(`${API_CONFIG.ENDPOINTS.DELETE_COURSE}${courseId}/delete/`, {
            method: 'DELETE'
        });
    },
    
    // Payment methods
    async getPayments() {
        return this.request(API_CONFIG.ENDPOINTS.GET_PAYMENTS);
    },
    
    async processPayment(paymentData) {
        return this.request(API_CONFIG.ENDPOINTS.PROCESS_PAYMENT, {
            method: 'POST',
            body: JSON.stringify(paymentData)
        });
    }
};

// Course Data
let courses = [];

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
    await loadCourses();
    renderCourses('all');
    setupEventListeners();
});

// Load courses from API
async function loadCourses() {
    try {
        const data = await API.getCourses();
        courses = data.courses.map(c => ({
            id: c._id,
            title: c.title,
            category: c.category,
            price: `$${c.price}`,
            rating: 4.8,
            students: c.students?.length || 0,
            instructor: c.instructor_id || 'Instructor',
            icon: getCategoryIcon(c.category)
        }));
    } catch (error) {
        console.error('Failed to load courses:', error);
        courses = [];
    }
}

function getCategoryIcon(category) {
    const icons = {
        programming: 'fa-code',
        design: 'fa-palette',
        business: 'fa-briefcase',
        marketing: 'fa-bullhorn'
    };
    return icons[category] || 'fa-book';
}

// Render Courses
function renderCourses(category) {
    const coursesGrid = document.getElementById('coursesGrid');
    const filteredCourses = category === 'all' 
        ? courses 
        : courses.filter(course => course.category === category);

    coursesGrid.innerHTML = filteredCourses.map(course => `
        <div class="course-card">
            <div class="course-image">
                <i class="fas ${course.icon}"></i>
            </div>
            <div class="course-content">
                <span class="course-category">${course.category}</span>
                <h3>${course.title}</h3>
                <div class="course-instructor">
                    <i class="fas fa-user"></i>
                    <span>${course.instructor}</span>
                </div>
                <div class="course-meta">
                    <div class="course-rating">
                        <i class="fas fa-star"></i> ${course.rating} (${course.students})
                    </div>
                    <div class="course-price">${course.price}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup Event Listeners
function setupEventListeners() {
    // Course filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderCourses(this.dataset.category);
        });
    });

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function switchModal(closeId, openId) {
    closeModal(closeId);
    openModal(openId);
}

// Close modal on outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Form Handlers
async function handleLogin(event) {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    
    // Check if admin
    if (email === 'admin@edulearn.com' && password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        window.location.href = 'admin.html';
        return;
    }
    
    try {
        const response = await API.login({ email, password });
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        closeModal('loginModal');
        showDashboard();
        alert('Login successful!');
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}

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
        const response = await API.signup({ name, email, password, role });
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        closeModal('signupModal');
        showDashboard();
        alert('Account created successfully!');
    } catch (error) {
        alert('Signup failed: ' + error.message);
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[1].value;
    const message = event.target[2].value;
    
    console.log('Contact:', name, email, message);
    alert('Message sent successfully! We will get back to you soon.');
    event.target.reset();
}

// Dashboard Functions
function showDashboard() {
    document.querySelector('.navbar').style.display = 'none';
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.features').style.display = 'none';
    document.querySelector('.courses').style.display = 'none';
    document.querySelector('.categories').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.testimonials').style.display = 'none';
    document.querySelector('.contact').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
    
    document.getElementById('dashboardPage').style.display = 'flex';
    showDashboardSection('overview');
}

function showDashboardSection(section) {
    const content = document.getElementById('dashboardContent');
    
    // Update active menu item
    document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
    event.target.closest('li').classList.add('active');
    
    switch(section) {
        case 'overview':
            content.innerHTML = `
                <h2>Dashboard Overview</h2>
                <div class="dashboard-cards">
                    <div class="dashboard-card">
                        <h3>Enrolled Courses</h3>
                        <div class="value">12</div>
                    </div>
                    <div class="dashboard-card">
                        <h3>Completed Courses</h3>
                        <div class="value">8</div>
                    </div>
                    <div class="dashboard-card">
                        <h3>Certificates Earned</h3>
                        <div class="value">8</div>
                    </div>
                    <div class="dashboard-card">
                        <h3>Learning Hours</h3>
                        <div class="value">156</div>
                    </div>
                </div>
                <h3>Continue Learning</h3>
                <div class="courses-grid">
                    ${courses.slice(0, 3).map(course => `
                        <div class="course-card">
                            <div class="course-image">
                                <i class="fas ${course.icon}"></i>
                            </div>
                            <div class="course-content">
                                <h3>${course.title}</h3>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${Math.random() * 100}%"></div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
            
        case 'my-courses':
            content.innerHTML = `
                <h2>My Courses</h2>
                <div class="courses-grid">
                    ${courses.map(course => `
                        <div class="course-card">
                            <div class="course-image">
                                <i class="fas ${course.icon}"></i>
                            </div>
                            <div class="course-content">
                                <span class="course-category">${course.category}</span>
                                <h3>${course.title}</h3>
                                <div class="course-instructor">
                                    <i class="fas fa-user"></i>
                                    <span>${course.instructor}</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${Math.random() * 100}%"></div>
                                </div>
                                <button class="btn-primary" style="margin-top: 1rem; width: 100%;">Continue Learning</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
            
        case 'progress':
            content.innerHTML = `
                <h2>Learning Progress</h2>
                <div class="dashboard-card" style="margin-bottom: 2rem;">
                    <h3>Overall Progress</h3>
                    <div class="progress-bar" style="height: 20px;">
                        <div class="progress-fill" style="width: 67%"></div>
                    </div>
                    <p style="margin-top: 1rem;">67% Complete - Keep going!</p>
                </div>
                ${courses.slice(0, 5).map(course => `
                    <div class="dashboard-card" style="margin-bottom: 1rem;">
                        <h3>${course.title}</h3>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.random() * 100}%"></div>
                        </div>
                    </div>
                `).join('')}
            `;
            break;
            
        case 'certificates':
            content.innerHTML = `
                <h2>My Certificates</h2>
                <div class="courses-grid">
                    ${courses.slice(0, 4).map(course => `
                        <div class="dashboard-card">
                            <i class="fas fa-certificate" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                            <h3>${course.title}</h3>
                            <p>Completed on: ${new Date().toLocaleDateString()}</p>
                            <button class="btn-primary" style="margin-top: 1rem; width: 100%;">Download Certificate</button>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
            
        case 'messages':
            content.innerHTML = `
                <h2>Messages</h2>
                <div class="dashboard-card">
                    <div style="padding: 2rem; text-align: center;">
                        <i class="fas fa-envelope" style="font-size: 3rem; color: var(--gray); margin-bottom: 1rem;"></i>
                        <p>No new messages</p>
                    </div>
                </div>
            `;
            break;
            
        case 'settings':
            content.innerHTML = `
                <h2>Settings</h2>
                <div class="dashboard-card">
                    <h3>Profile Settings</h3>
                    <form style="margin-top: 1rem;">
                        <input type="text" placeholder="Full Name" value="Student Name" style="width: 100%; padding: 1rem; margin-bottom: 1rem; border: 2px solid var(--light); border-radius: 8px;">
                        <input type="email" placeholder="Email" value="student@email.com" style="width: 100%; padding: 1rem; margin-bottom: 1rem; border: 2px solid var(--light); border-radius: 8px;">
                        <input type="tel" placeholder="Phone" style="width: 100%; padding: 1rem; margin-bottom: 1rem; border: 2px solid var(--light); border-radius: 8px;">
                        <button type="submit" class="btn-primary">Update Profile</button>
                    </form>
                </div>
                <div class="dashboard-card" style="margin-top: 2rem;">
                    <h3>Change Password</h3>
                    <form style="margin-top: 1rem;">
                        <input type="password" placeholder="Current Password" style="width: 100%; padding: 1rem; margin-bottom: 1rem; border: 2px solid var(--light); border-radius: 8px;">
                        <input type="password" placeholder="New Password" style="width: 100%; padding: 1rem; margin-bottom: 1rem; border: 2px solid var(--light); border-radius: 8px;">
                        <input type="password" placeholder="Confirm New Password" style="width: 100%; padding: 1rem; margin-bottom: 1rem; border: 2px solid var(--light); border-radius: 8px;">
                        <button type="submit" class="btn-primary">Change Password</button>
                    </form>
                </div>
            `;
            break;
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        document.getElementById('dashboardPage').style.display = 'none';
        document.querySelector('.navbar').style.display = 'block';
        document.querySelector('.hero').style.display = 'block';
        document.querySelector('.features').style.display = 'block';
        document.querySelector('.courses').style.display = 'block';
        document.querySelector('.categories').style.display = 'block';
        document.querySelector('.about').style.display = 'block';
        document.querySelector('.testimonials').style.display = 'block';
        document.querySelector('.contact').style.display = 'block';
        document.querySelector('.footer').style.display = 'block';
        
        window.scrollTo(0, 0);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .course-card, .category-card, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

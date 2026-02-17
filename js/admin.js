// Admin Data Storage
let adminData = {
    courses: [],
    users: [],
    payments: []
};

let currentCourse = {
    modules: []
};

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
    await loadAdminData();
    showAdminSection('dashboard');
});

// Load data from API
async function loadAdminData() {
    try {
        const data = await API.getCourses();
        adminData.courses = data.courses.map(c => ({
            id: c._id,
            title: c.title,
            description: c.description,
            category: c.category,
            price: c.price,
            modules: c.modules || [],
            students: c.students?.length || 0,
            status: c.status || 'Active'
        }));
        
        const paymentData = await API.getPayments();
        adminData.payments = paymentData.payments.map(p => ({
            id: p._id,
            user: p.user_id,
            course: p.course_id,
            amount: p.amount,
            status: p.status,
            date: new Date(p.created_at).toLocaleDateString()
        }));
    } catch (error) {
        console.error('Failed to load data:', error);
    }
}

// Show Admin Section
function showAdminSection(section) {
    const content = document.getElementById('adminContent');
    const title = document.getElementById('pageTitle');
    
    document.querySelectorAll('.admin-menu li').forEach(li => li.classList.remove('active'));
    event?.target.closest('li')?.classList.add('active');
    
    switch(section) {
        case 'dashboard':
            title.textContent = 'Dashboard';
            content.innerHTML = renderDashboard();
            break;
        case 'courses':
            title.textContent = 'Manage Courses';
            content.innerHTML = renderCourses();
            break;
        case 'create-course':
            title.textContent = 'Create New Course';
            content.innerHTML = renderCreateCourse();
            initializeFileUploads();
            break;
        case 'users':
            title.textContent = 'Manage Users';
            content.innerHTML = renderUsers();
            break;
        case 'payments':
            title.textContent = 'Payment Management';
            content.innerHTML = renderPayments();
            break;
        case 'settings':
            title.textContent = 'Settings';
            content.innerHTML = renderSettings();
            break;
    }
}

// Dashboard
function renderDashboard() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <i class="fas fa-book"></i>
                <h3>Total Courses</h3>
                <div class="value">${adminData.courses.length}</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-users"></i>
                <h3>Total Users</h3>
                <div class="value">${adminData.users.length}</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-dollar-sign"></i>
                <h3>Revenue</h3>
                <div class="value">$${adminData.payments.reduce((sum, p) => sum + parseFloat(p.amount), 0).toFixed(2)}</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-chart-line"></i>
                <h3>Active Students</h3>
                <div class="value">${adminData.users.filter(u => u.status === 'active').length}</div>
            </div>
        </div>
        <div class="table-container">
            <h3 style="padding: 1rem;">Recent Activity</h3>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Action</th>
                        <th>Course</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>Enrolled</td>
                        <td>Web Development</td>
                        <td>${new Date().toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td>Jane Smith</td>
                        <td>Completed</td>
                        <td>Python Basics</td>
                        <td>${new Date().toLocaleDateString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// Courses Management
function renderCourses() {
    return `
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Students</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${adminData.courses.map(course => `
                        <tr>
                            <td>${course.title}</td>
                            <td>${course.category}</td>
                            <td>$${course.price}</td>
                            <td>${course.students || 0}</td>
                            <td><span class="badge badge-success">${course.status || 'Active'}</span></td>
                            <td class="action-btns">
                                <button class="btn-primary btn-sm" onclick="editCourse(${course.id})">Edit</button>
                                <button class="btn-danger btn-sm" onclick="deleteCourse(${course.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                    ${adminData.courses.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No courses yet. Create your first course!</td></tr>' : ''}
                </tbody>
            </table>
        </div>
    `;
}

// Create Course Form
function renderCreateCourse() {
    return `
        <form onsubmit="handleCreateCourse(event)" class="table-container" style="padding: 2rem;">
            <h3>Course Information</h3>
            <div class="form-group">
                <label>Course Title *</label>
                <input type="text" name="title" required>
            </div>
            <div class="form-group">
                <label>Description *</label>
                <textarea name="description" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label>Category *</label>
                <select name="category" required>
                    <option value="">Select Category</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                </select>
            </div>
            <div class="form-group">
                <label>Price ($) *</label>
                <input type="number" name="price" step="0.01" required>
            </div>
            
            <h3 style="margin-top: 2rem;">Course Thumbnail</h3>
            <div class="file-upload" onclick="document.getElementById('thumbnailUpload').click()">
                <i class="fas fa-image"></i>
                <p>Click to upload course thumbnail</p>
                <input type="file" id="thumbnailUpload" accept="image/*" onchange="handleImageUpload(event, 'thumbnail')">
            </div>
            <div id="thumbnailPreview" class="preview-container"></div>
            
            <h3 style="margin-top: 2rem;">Course Modules & Lessons</h3>
            <div id="modulesContainer"></div>
            <button type="button" class="btn-secondary" onclick="addModule()">+ Add Module</button>
            
            <div style="margin-top: 2rem;">
                <button type="submit" class="btn-primary">Create Course</button>
                <button type="button" class="btn-secondary" onclick="showAdminSection('courses')">Cancel</button>
            </div>
        </form>
    `;
}

// Add Module
function addModule() {
    const moduleId = currentCourse.modules.length;
    currentCourse.modules.push({ id: moduleId, title: '', lessons: [] });
    renderModules();
}

// Render Modules
function renderModules() {
    const container = document.getElementById('modulesContainer');
    container.innerHTML = currentCourse.modules.map((module, idx) => `
        <div class="module-item">
            <div class="module-header">
                <input type="text" placeholder="Module ${idx + 1} Title" value="${module.title}" 
                    onchange="currentCourse.modules[${idx}].title = this.value" 
                    style="flex: 1; padding: 0.5rem; border: 2px solid var(--light); border-radius: 6px;">
                <button type="button" class="btn-danger btn-sm" onclick="removeModule(${idx})">Remove</button>
            </div>
            <div id="lessons-${idx}">
                ${module.lessons.map((lesson, lessonIdx) => `
                    <div class="lesson-item">
                        <span>${lesson.title}</span>
                        <button type="button" class="btn-danger btn-sm" onclick="removeLesson(${idx}, ${lessonIdx})">Remove</button>
                    </div>
                `).join('')}
            </div>
            <button type="button" class="btn-secondary btn-sm" onclick="addLesson(${idx})">+ Add Lesson</button>
        </div>
    `).join('');
}

// Add Lesson
function addLesson(moduleIdx) {
    const lessonTitle = prompt('Enter lesson title:');
    if (!lessonTitle) return;
    
    const lessonType = confirm('Is this a video lesson? (OK = Video, Cancel = Text)');
    
    if (lessonType) {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'video/*';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                currentCourse.modules[moduleIdx].lessons.push({
                    title: lessonTitle,
                    type: 'video',
                    file: file.name,
                    duration: '10:00'
                });
                renderModules();
            }
        };
        fileInput.click();
    } else {
        currentCourse.modules[moduleIdx].lessons.push({
            title: lessonTitle,
            type: 'text',
            content: ''
        });
        renderModules();
    }
}

// Remove Module/Lesson
function removeModule(idx) {
    if (confirm('Remove this module?')) {
        currentCourse.modules.splice(idx, 1);
        renderModules();
    }
}

function removeLesson(moduleIdx, lessonIdx) {
    if (confirm('Remove this lesson?')) {
        currentCourse.modules[moduleIdx].lessons.splice(lessonIdx, 1);
        renderModules();
    }
}

// Handle Image Upload
function handleImageUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById(type + 'Preview');
        preview.innerHTML = `
            <div class="preview-item">
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
            </div>
        `;
    };
    reader.readAsDataURL(file);
}

// Initialize File Uploads
function initializeFileUploads() {
    renderModules();
}

// Handle Create Course
async function handleCreateCourse(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const courseData = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        instructor_id: 'admin',
        modules: currentCourse.modules
    };
    
    try {
        await API.createCourse(courseData);
        alert('Course created successfully!');
        currentCourse = { modules: [] };
        await loadAdminData();
        showAdminSection('courses');
    } catch (error) {
        alert('Failed to create course: ' + error.message);
    }
}

// Delete Course
async function deleteCourse(id) {
    if (confirm('Delete this course?')) {
        try {
            await API.deleteCourse(id);
            await loadAdminData();
            showAdminSection('courses');
        } catch (error) {
            alert('Failed to delete course: ' + error.message);
        }
    }
}

// Users Management
function renderUsers() {
    return `
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Enrolled Courses</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${adminData.users.map(user => `
                        <tr>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.role}</td>
                            <td>${user.enrolled}</td>
                            <td><span class="badge badge-${user.status === 'active' ? 'success' : 'danger'}">${user.status}</span></td>
                            <td class="action-btns">
                                <button class="btn-primary btn-sm" onclick="toggleUserStatus(${user.id})">Toggle Status</button>
                                <button class="btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Toggle User Status
function toggleUserStatus(id) {
    const user = adminData.users.find(u => u.id === id);
    user.status = user.status === 'active' ? 'inactive' : 'active';
    localStorage.setItem('adminUsers', JSON.stringify(adminData.users));
    showAdminSection('users');
}

// Delete User
function deleteUser(id) {
    if (confirm('Delete this user?')) {
        adminData.users = adminData.users.filter(u => u.id !== id);
        localStorage.setItem('adminUsers', JSON.stringify(adminData.users));
        showAdminSection('users');
    }
}

// Payments Management
function renderPayments() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Revenue</h3>
                <div class="value">$${adminData.payments.reduce((sum, p) => sum + parseFloat(p.amount), 0).toFixed(2)}</div>
            </div>
            <div class="stat-card">
                <h3>This Month</h3>
                <div class="value">$${(Math.random() * 5000).toFixed(2)}</div>
            </div>
            <div class="stat-card">
                <h3>Pending</h3>
                <div class="value">${adminData.payments.filter(p => p.status === 'pending').length}</div>
            </div>
        </div>
        <div class="table-container">
            <h3 style="padding: 1rem;">Payment History</h3>
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>User</th>
                        <th>Course</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${adminData.payments.map(payment => `
                        <tr>
                            <td>#${payment.id}</td>
                            <td>${payment.user}</td>
                            <td>${payment.course}</td>
                            <td>$${payment.amount}</td>
                            <td><span class="badge badge-${payment.status === 'completed' ? 'success' : 'warning'}">${payment.status}</span></td>
                            <td>${payment.date}</td>
                        </tr>
                    `).join('')}
                    ${adminData.payments.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No payments yet</td></tr>' : ''}
                </tbody>
            </table>
        </div>
    `;
}

// Settings
function renderSettings() {
    return `
        <div class="table-container" style="padding: 2rem;">
            <h3>Platform Settings</h3>
            <form onsubmit="handleSettings(event)">
                <div class="form-group">
                    <label>Platform Name</label>
                    <input type="text" value="EduLearn">
                </div>
                <div class="form-group">
                    <label>Support Email</label>
                    <input type="email" value="support@edulearn.com">
                </div>
                <div class="form-group">
                    <label>Payment Gateway</label>
                    <select>
                        <option>Stripe</option>
                        <option>PayPal</option>
                        <option>Razorpay</option>
                    </select>
                </div>
                <button type="submit" class="btn-primary">Save Settings</button>
            </form>
        </div>
    `;
}

function handleSettings(event) {
    event.preventDefault();
    alert('Settings saved successfully!');
}

const courseData = {
    title: "Complete Web Development Bootcamp",
    modules: [
        {
            id: 1,
            title: "Introduction to Web Development",
            lessons: [
                { id: 1, title: "What is Web Development?", duration: "10:30", completed: false },
                { id: 2, title: "Setting Up Your Environment", duration: "15:20", completed: false },
                { id: 3, title: "Your First HTML Page", duration: "12:45", completed: false }
            ]
        },
        {
            id: 2,
            title: "HTML Fundamentals",
            lessons: [
                { id: 4, title: "HTML Tags and Elements", duration: "18:30", completed: false },
                { id: 5, title: "Forms and Inputs", duration: "20:15", completed: false },
                { id: 6, title: "Semantic HTML", duration: "14:50", completed: false }
            ]
        },
        {
            id: 3,
            title: "CSS Styling",
            lessons: [
                { id: 7, title: "CSS Basics", duration: "16:40", completed: false },
                { id: 8, title: "Flexbox Layout", duration: "22:30", completed: false },
                { id: 9, title: "CSS Grid", duration: "25:10", completed: false }
            ]
        }
    ]
};

let currentLesson = null;

document.addEventListener('DOMContentLoaded', function() {
    renderModules();
    loadLesson(1);
});

function renderModules() {
    const container = document.getElementById('courseModules');
    container.innerHTML = courseData.modules.map(module => `
        <div class="module">
            <div class="module-title" onclick="toggleModule(${module.id})">
                <span>${module.title}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="module-lessons" id="module-${module.id}">
                ${module.lessons.map(lesson => `
                    <div class="lesson ${lesson.completed ? 'completed' : ''}" onclick="loadLesson(${lesson.id})">
                        <div style="display: flex; justify-content: space-between;">
                            <span><i class="fas ${lesson.completed ? 'fa-check-circle' : 'fa-play-circle'}"></i> ${lesson.title}</span>
                            <span>${lesson.duration}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function toggleModule(moduleId) {
    const moduleContent = document.getElementById(`module-${moduleId}`);
    moduleContent.style.display = moduleContent.style.display === 'none' ? 'block' : 'none';
}

function loadLesson(lessonId) {
    let lesson = null;
    courseData.modules.forEach(module => {
        const found = module.lessons.find(l => l.id === lessonId);
        if (found) lesson = found;
    });
    
    if (!lesson) return;
    
    currentLesson = lesson;
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('lessonDescription').textContent = `This lesson covers ${lesson.title.toLowerCase()}.`;
    
    document.querySelectorAll('.lesson').forEach(el => el.classList.remove('active'));
    event?.target.closest('.lesson')?.classList.add('active');
}

function markComplete() {
    if (!currentLesson) return;
    currentLesson.completed = true;
    renderModules();
    alert('Lesson marked as complete!');
}

function downloadResources() {
    alert('Resources downloaded!');
}

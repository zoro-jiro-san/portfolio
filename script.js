// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    html.classList.add(savedTheme);
    updateThemeToggleIcon(savedTheme);
}

function updateThemeToggleIcon(theme) {
    themeToggle.textContent = theme === 'dark-mode' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    
    html.classList.remove(currentTheme);
    html.classList.add(newTheme);
    
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
});

// Initialize theme on page load
initializeTheme();

// Smooth scroll behavior is handled by CSS scroll-behavior: smooth
// But we can add additional scroll effects

// Navigation active state
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling dynamically
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--color-primary);
        border-bottom-color: var(--color-primary);
    }
`;
document.head.appendChild(style);

// Scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards and skill cards
document.querySelectorAll('.project-card, .skill-card, .timeline-item, .social-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Mobile menu enhancement (if needed in future)
console.log('ZoroAI Portfolio loaded successfully! 🚀');

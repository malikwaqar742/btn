const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const themeToggle = document.getElementById('themeToggle');
const progressBar = document.getElementById('progressBar');
const backToTop = document.getElementById('backToTop');
const wellnessTip = document.getElementById('wellnessTip');
const testimonialTrack = document.getElementById('testimonialTrack');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');

const wellnessTips = [
    'Practice yoga for 15 minutes daily.',
    'Stay hydrated throughout the day.',
    'Focus on deep breathing.',
    'Spend time in nature.',
    'Stretch after long sitting periods.',
    'Maintain a balanced diet.',
    'Sleep at least 7-8 hours.',
    'Meditate for mental clarity.'
];

const testimonialSlides = Array.from(document.querySelectorAll('.testimonial-slide'));
let activeTip = 0;
let activeTestimonial = 0;
let testimonialInterval;

function toggleMobileNav() {
    if (mainNav) mainNav.classList.toggle('open');
}

function updateTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    if (themeToggle) themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('backtonature-theme', isDark ? 'dark' : 'light');
}

function applySavedTheme() {
    const saved = localStorage.getItem('backtonature-theme');
    if (saved === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    }
}

function updateTip() {
    if (!wellnessTip) return;
    activeTip = (activeTip + 1) % wellnessTips.length;
    wellnessTip.classList.remove('fade-in');
    void wellnessTip.offsetWidth;
    wellnessTip.textContent = wellnessTips[activeTip];
    wellnessTip.classList.add('fade-in');
}

function showTestimonial(index) {
    testimonialSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === index);
    });
    activeTestimonial = index;
}

function nextTestimonial() {
    showTestimonial((activeTestimonial + 1) % testimonialSlides.length);
}

function prevTestimonial() {
    showTestimonial((activeTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length);
}

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (backToTop) {
        if (scrollTop > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
}

function handleScroll() {
    updateScrollProgress();
}

function smoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
                mainNav?.classList.remove('open');
            }
        });
    });
}

function initRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.18 });

    document.querySelectorAll('.reveal, .reveal-card').forEach((element) => {
        observer.observe(element);
    });
}

function initTestimonialCarousel() {
    if (!testimonialTrack || testimonialSlides.length === 0) return;
    testimonialInterval = setInterval(nextTestimonial, 4000);
    prevSlide?.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        prevTestimonial();
        testimonialInterval = setInterval(nextTestimonial, 4000);
    });
    nextSlide?.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        nextTestimonial();
        testimonialInterval = setInterval(nextTestimonial, 4000);
    });
}

function initBackToTop() {
    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initPage() {
    applySavedTheme();
    smoothAnchors();
    initRevealObserver();
    initTestimonialCarousel();
    initBackToTop();
    updateScrollProgress();
    setInterval(updateTip, 5000);
    menuToggle?.addEventListener('click', toggleMobileNav);
    themeToggle?.addEventListener('click', updateTheme);
    window.addEventListener('scroll', handleScroll);
    document.querySelectorAll('.button.ripple').forEach((button) => {
        button.addEventListener('click', (event) => {
            const x = event.clientX - button.getBoundingClientRect().left;
            const y = event.clientY - button.getBoundingClientRect().top;
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);
        });
    });
    const yearElements = document.querySelectorAll('.footer-year');
    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
}

document.addEventListener('DOMContentLoaded', initPage);

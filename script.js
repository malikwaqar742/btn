// Simple JavaScript for smooth scrolling and animations
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0s';
        }
    });
});

document.querySelectorAll('.pose').forEach(pose => {
    observer.observe(pose);
});

// Background animation
let angle = 0;
function animateBackground() {
    angle += 0.5;
    document.body.style.background = `linear-gradient(${angle}deg, #667eea 0%, #764ba2 100%)`;
    requestAnimationFrame(animateBackground);
}
animateBackground();
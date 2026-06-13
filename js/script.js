const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
    mainNav?.classList.toggle('open');
});

const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            mainNav?.classList.remove('open');
        }
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.18
});

document.querySelectorAll('.reveal, .reveal-card').forEach(section => {
    revealObserver.observe(section);
});

const tipText = document.getElementById('tipText');
const healthTips = [
    'Practice yoga for 15 minutes daily.',
    'Stay hydrated throughout the day.',
    'Focus on deep breathing.',
    'Spend time in nature.',
    'Stretch after long sitting periods.',
    'Maintain a balanced diet.',
    'Sleep at least 7-8 hours.',
    'Meditate for mental clarity.'
];
let tipIndex = 1;

function updateHealthTip() {
    if (!tipText) return;
    tipText.textContent = healthTips[tipIndex];
    tipIndex = (tipIndex + 1) % healthTips.length;
}

setInterval(updateHealthTip, 5000);

const footerYear = document.querySelector('.footer-year');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }
        contactSuccess.hidden = false;
        contactSuccess.classList.add('show');
        contactForm.reset();
        contactForm.querySelectorAll('input, textarea').forEach(field => field.blur());
    });
}

const leaves = document.querySelectorAll('.leaf');
let leafOffset = 0;
function animateLeaves() {
    leafOffset += 0.3;
    leaves.forEach((leaf, index) => {
        const drift = Math.sin((leafOffset + index * 10) / 10) * 18;
        leaf.style.transform = `translateX(${drift}px) rotate(45deg)`;
    });
    requestAnimationFrame(animateLeaves);
}
animateLeaves();

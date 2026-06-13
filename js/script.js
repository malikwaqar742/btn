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

document.querySelectorAll('.reveal').forEach(section => {
    revealObserver.observe(section);
});

const footerYear = document.querySelector('.footer-year');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
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

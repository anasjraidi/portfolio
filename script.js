// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

// Typing Animation Effect
const typingTexts = ['Fullstack Developer', 'Creative Coder', 'Tech Enthusiast', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingElement = document.querySelector('.typing-text-content');
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
});

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', typeEffect);

// Mouse cursor trail effect
let mouseTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({x: e.clientX, y: e.clientY});

    if (mouseTrail.length > trailLength) {
        mouseTrail.shift();
    }

    updateTrail();
});

function updateTrail() {
    // Remove existing trail elements
    document.querySelectorAll('.mouse-trail').forEach(el => el.remove());

    mouseTrail.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = point.x + 'px';
        trail.style.top = point.y + 'px';
        trail.style.opacity = (index / trailLength) * 0.5;
        trail.style.transform = `scale(${index / trailLength})`;
        document.body.appendChild(trail);

        // Remove trail element after animation
        setTimeout(() => trail.remove(), 1000);
    });
}

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// New Skills animation for icon-based design
function animateNewSkillBars() {
    const skillBars = document.querySelectorAll('.level-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level');

                // Animate the bar with gradient
                setTimeout(() => {
                    bar.style.background = `linear-gradient(90deg, var(--main-color) 0%, var(--main-color) ${level}%, rgba(255, 255, 255, 0.2) ${level}%, rgba(255, 255, 255, 0.2) 100%)`;
                    bar.style.boxShadow = `0 0 15px rgba(0, 212, 255, 0.5)`;

                    // Add glow effect
                    bar.style.setProperty('--glow-intensity', '1');
                }, Math.random() * 500 + 200);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Trigger new skill bar animation when skills section is visible
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNewSkillBars();
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}
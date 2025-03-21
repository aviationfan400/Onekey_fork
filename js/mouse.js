// Create and style cursor
let circle = document.createElement("div");
circle.id = "circle";
document.body.appendChild(circle);

document.head.appendChild(Object.assign(document.createElement("style"), {
    innerHTML: `
        #circle {
            position: fixed;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgba(145, 145, 145, 1);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        }
        
        #circle.menu-hover {
            width: 32px;
            height: 24px;
            border-radius: 4px;
            transition: width 0.15s ease-out, height 0.15s ease-out, border-radius 0.15s ease-out;
        }

        #circle.contact-hover {
            width: 5px;
            height: 24px;
            border-radius: 4px;
        }
    `
}));

// Simple mouse following without any delay
document.addEventListener("mousemove", e => {
    circle.style.left = e.clientX + 'px';
    circle.style.top = e.clientY + 'px';
});


const menuToggle = document.querySelector('.menu-toggle');
const logo = document.querySelector('.logo');


const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

menuToggle.addEventListener('mouseenter', () => {
    circle.classList.add('menu-hover');
    circle.classList.remove('contact-hover');
});
menuToggle.addEventListener('mouseleave', () => circle.classList.remove('menu-hover'));

// form input hover effect
formInputs.forEach(input => {
    input.addEventListener('mouseenter', () => {
        circle.classList.add('contact-hover');

        circle.style.width = '';
        circle.style.height = '';
    });
    input.addEventListener('mouseleave', () => {
        circle.classList.remove('contact-hover');
    });
});

logo.addEventListener('mouseenter', () => {
    circle.style.width = '24px';
    circle.style.height = '24px';
});

logo.addEventListener('mouseleave', () => {
    circle.style.width = '16px';
    circle.style.height = '16px';
});

// Track what element we're currently hovering over
let currentHoverElement = null;

// Update the current hover element
document.addEventListener('mouseover', (e) => {
    // Check if we're hovering over an input or the menu toggle
    if (e.target.matches('.form-group input, .form-group textarea')) {
        currentHoverElement = 'input';
    } else if (e.target === menuToggle) {
        currentHoverElement = 'menu';
    } else if (e.target === logo) {
        currentHoverElement = 'logo';
    } else {
        currentHoverElement = null;
    }
});

// Mouse click effect
document.addEventListener("mousedown", () => {
    // Save the current hover state
    if (!currentHoverElement) {
        circle.style.width = "13px";
        circle.style.height = "13px";
    }
});

document.addEventListener("mouseup", () => {
    // Restore the appropriate state based on what we're hovering over
    if (currentHoverElement === 'input') {
        circle.classList.add('contact-hover');
        circle.style.width = '';
        circle.style.height = '';
    } else if (currentHoverElement === 'menu') {
        circle.classList.add('menu-hover');
        circle.style.width = '';
        circle.style.height = '';
    } else if (currentHoverElement === 'logo') {
        circle.style.width = '24px';
        circle.style.height = '24px';
    } else {
        circle.style.width = "16px";
        circle.style.height = "16px";
    }
});

// allows for scrolling
document.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    circle.style.top = `${mouseY + scrollY}px`;
});

document.addEventListener("click", () => {
    // Empty function to override any previous click handlers
});

document.addEventListener("mouseleave", () => {
    circle.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
    circle.style.opacity = "0.65";
});

// Add hover effect ONLY for menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const logo = document.querySelector('.logo');
const input = document.querySelector('.form-group');

menuToggle.addEventListener('mouseenter', () => {
    circle.classList.add('menu-hover');
    circle.classList.remove('contact-hover'); // Remove other classes
});
menuToggle.addEventListener('mouseleave', () => {
    circle.classList.remove('menu-hover');
});

input.addEventListener('mouseenter', () => {
    circle.classList.add('contact-hover');
    circle.classList.remove('menu-hover'); // Remove other classes
    // Reset inline styles that might interfere
    circle.style.width = '';
    circle.style.height = '';
});
input.addEventListener('mouseleave', () => {
    circle.classList.remove('contact-hover');
    // Reset to default size
    circle.style.width = '16px';
    circle.style.height = '16px';
});

logo.addEventListener('mouseenter', () => {
    // Remove classes that might interfere
    circle.classList.remove('menu-hover');
    circle.classList.remove('contact-hover');
    circle.style.width = '24px';
    circle.style.height = '24px';
});

// Mouse up should check if we're hovering over special elements
document.addEventListener("mouseup", () => {
    // Check if we're over any special elements and restore appropriate state
    if (isHovering(input)) {
        circle.classList.add('contact-hover');
        circle.style.width = '';
        circle.style.height = '';
    } else if (isHovering(menuToggle)) {
        circle.classList.add('menu-hover');
        circle.style.width = '';
        circle.style.height = '';
    } else if (isHovering(logo)) {
        circle.style.width = '24px';
        circle.style.height = '24px';
    } else {
        circle.style.width = '16px';
        circle.style.height = '16px';
    }
});

// Helper function to check if mouse is over an element
function isHovering(element) {
    const rect = element.getBoundingClientRect();
    const mouseX = parseInt(circle.style.left);
    const mouseY = parseInt(circle.style.top);
    
    return mouseX >= rect.left && mouseX <= rect.right && 
           mouseY >= rect.top && mouseY <= rect.bottom;
} 
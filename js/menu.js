document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const logo = document.querySelector('.logo');
    const header = document.querySelector('header');

    // Add transition duration variable
    const TRANSITION_DURATION = 400; // 400ms = 0.4 seconds (matches CSS)

    let isAnimating = false;

    // Initialize menu state
    const initializeMenu = () => {
        if (navLinks) {
            navLinks.classList.add('nav-transition');
        }
        if (logo) {
            logo.classList.add('menu-transition');
        }
        if (menuToggle) {
            menuToggle.classList.add('menu-transition');
        }
    };

    // Run initialization
    initializeMenu();

    // Fix cursor issues
    document.documentElement.style.cursor = 'auto';
    document.body.style.cursor = 'auto';
    
    const links = document.querySelectorAll('a, button, .menu-toggle');
    links.forEach(link => {
        link.style.cursor = 'pointer';
    });

    // Function to close menu
    const closeMenu = () => {
        if (isAnimating) return;
        isAnimating = true;
        
        navLinks.classList.remove('active');
        if (logo) logo.classList.remove('menu-active');
        if (menuToggle) menuToggle.classList.remove('active');
        body.style.overflow = 'auto';
        
        setTimeout(() => {
            isAnimating = false;
        }, TRANSITION_DURATION);
    };

    // Function to open menu
    const openMenu = () => {
        if (isAnimating) return;
        isAnimating = true;
        
        navLinks.classList.add('active');
        if (logo) logo.classList.add('menu-active');
        if (menuToggle) menuToggle.classList.add('active');
        body.style.overflow = 'hidden';
        
        setTimeout(() => {
            isAnimating = false;
        }, TRANSITION_DURATION);
    };

    // Create close button for mobile menu
    const createCloseButton = () => {
        const closeButton = document.createElement('button');
        closeButton.className = 'menu-close';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.setAttribute('aria-label', 'Close navigation menu');
        closeButton.setAttribute('tabindex', '0');
        closeButton.addEventListener('click', closeMenu);
        
        // Add keyboard support
        closeButton.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeMenu();
            }
        });
        
        return closeButton;
    };

    // Add close button to nav links
    if (navLinks) {
        const closeButton = createCloseButton();
        navLinks.appendChild(closeButton);
    }

    // Toggle menu with proper animations
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Prevent multiple clicks during animation
            if (isAnimating) return;
            
            const isOpening = !navLinks.classList.contains('active');
            
            if (isOpening) {
                openMenu();
            } else {
                closeMenu();
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && !navLinks.contains(e.target) && menuToggle && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // Handle link clicks - let the main transition system handle navigation
    if (navLinks) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Close the menu immediately when a link is clicked
                closeMenu();
                
                // Don't prevent default - let the transition system handle it
            });
        });
    }

    // Add aria labels and roles for accessibility
    if (menuToggle) {
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        menuToggle.setAttribute('role', 'button');
        menuToggle.setAttribute('tabindex', '0');
    }

    // Add transparent menu styles for top bar
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Handle keyboard navigation
    if (menuToggle) {
        menuToggle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuToggle.click();
            }
        });
    }

    // Initialize intersection observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Select all sections and elements you want to animate
    document.querySelectorAll('section, .card, .project-card').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}); 
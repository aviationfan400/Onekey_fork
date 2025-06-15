// Enhanced smooth scroll animations with bidirectional support
document.addEventListener('DOMContentLoaded', () => {
    // Force smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';
    
    // Enhanced CSS smooth scrolling
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth !important;
        }
        
        * {
            scroll-behavior: smooth !important;
        }
        
        /* Enhanced scroll animations */
        .scroll-animate-enhanced {
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Create intersection observer for scroll animations (bidirectional)
    const observerOptions = {
        threshold: [0, 0.1, 0.2, 0.3],
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is coming into view
                entry.target.classList.add('animate');
                entry.target.classList.remove('animate-out');
            } else {
                // Element is going out of view - prepare for re-animation
                if (entry.boundingClientRect.top > 0) {
                    // Element is above viewport (scrolling up)
                    entry.target.classList.remove('animate');
                    entry.target.classList.add('animate-out');
                }
            }
        });
    }, observerOptions);
    
    // Add scroll animation classes to elements
    function addScrollAnimations() {
        // Main content sections
        const sections = document.querySelectorAll('section, .Mission, .Contact, .intro, .story-container, .values-section, .join-us, .hero');
        sections.forEach((section, index) => {
            section.classList.add('scroll-animate-enhanced');
            if (index % 2 === 0) {
                section.classList.add('scroll-animate');
            } else {
                section.classList.add('scroll-animate-left');
            }
            observer.observe(section);
        });
        
        // Individual elements
        const elements = document.querySelectorAll('h1, h2, h3, .pillar, .team-member, .value-item, .mission-statement, .impact-stats, .contact-form-container, .mission-pillars, .mission-impact');
        elements.forEach((element, index) => {
            element.classList.add('scroll-animate-enhanced');
            if (index % 3 === 0) {
                element.classList.add('scroll-animate');
            } else if (index % 3 === 1) {
                element.classList.add('scroll-animate-left');
            } else {
                element.classList.add('scroll-animate-right');
            }
            observer.observe(element);
        });
        
        // Special animations for stats with staggered delays
        const stats = document.querySelectorAll('.stat');
        stats.forEach((stat, index) => {
            stat.classList.add('scroll-animate', 'scroll-animate-enhanced');
            stat.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(stat);
        });
        
        // Form elements with staggered animation
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.classList.add('scroll-animate', 'scroll-animate-enhanced');
            group.style.transitionDelay = `${index * 0.08}s`;
            observer.observe(group);
        });
        
        // Cards and interactive elements
        const cards = document.querySelectorAll('.card, .project-card, .Volunteering-Box, .Performances-Box');
        cards.forEach((card, index) => {
            card.classList.add('scroll-animate', 'scroll-animate-enhanced');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }
    
    // Initialize animations
    addScrollAnimations();
    
    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        });
    });
    
    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the page transition handle this
            return;
        });
    });
    
    // Smooth scroll behavior for programmatic scrolling
    let isScrolling = false;
    
    function smoothScrollTo(targetY, duration = 800) {
        if (isScrolling) return;
        
        isScrolling = true;
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();
        
        function scrollStep(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (cubic-bezier equivalent)
            const easeProgress = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startY + distance * easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            } else {
                isScrolling = false;
            }
        }
        
        requestAnimationFrame(scrollStep);
    }
    
    // Enhanced scroll behavior for better performance
    let ticking = false;
    let lastScrollY = window.pageYOffset;
    
    function updateScrollAnimations() {
        const currentScrollY = window.pageYOffset;
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        
        // Add scroll direction class to body for CSS animations
        document.body.classList.toggle('scrolling-down', scrollDirection === 'down');
        document.body.classList.toggle('scrolling-up', scrollDirection === 'up');
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollAnimations);
            ticking = true;
        }
    }, { passive: true });
    
    // Reduced parallax effect for better performance
    const parallaxElements = document.querySelectorAll('.bg-gradient, #shapesCanvas');
    let parallaxTicking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3; // Reduced intensity
        
        parallaxElements.forEach(element => {
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
        
        parallaxTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    }, { passive: true });
    
    // Keyboard navigation support for smooth scrolling
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            smoothScrollTo(window.pageYOffset + window.innerHeight * 0.8);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            smoothScrollTo(window.pageYOffset - window.innerHeight * 0.8);
        } else if (e.key === 'Home') {
            e.preventDefault();
            smoothScrollTo(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            smoothScrollTo(document.body.scrollHeight);
        }
    });
}); 
// Performance optimization and smooth UX enhancements
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PRELOAD CRITICAL RESOURCES
    function preloadCriticalResources() {
        const criticalResources = [
            '../images/team-photo.jpg',
            '../images/placeholder-1.jpg',
            '../images/placeholder-2.jpg',
            '../images/placeholder-3.jpg',
            'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Poppins:wght@300;400;500;600&display=swap'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = resource.includes('.jpg') ? 'image' : 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }
    
    // 2. LAZY LOADING FOR IMAGES
    function setupLazyLoading() {
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.transition = 'opacity 0.3s ease';
                    img.style.opacity = '0';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // 3. SMOOTH PAGE LOADING ANIMATION
    function setupPageLoadAnimation() {
        const body = document.body;
        body.style.opacity = '0';
        body.style.transform = 'translateY(20px)';
        body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            body.style.opacity = '1';
            body.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // 4. MICRO-INTERACTIONS FOR BUTTONS AND LINKS
    function setupMicroInteractions() {
        const interactiveElements = document.querySelectorAll('a, button, .cta-button, .pillar, .team-member, .value-item');
        
        interactiveElements.forEach(element => {
            element.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease';
            
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-2px) scale(1.02)';
                element.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
                element.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            });
            
            element.addEventListener('mousedown', () => {
                element.style.transform = 'translateY(0) scale(0.98)';
            });
            
            element.addEventListener('mouseup', () => {
                element.style.transform = 'translateY(-2px) scale(1.02)';
            });
        });
    }
    
    // 5. SMOOTH FORM INTERACTIONS
    function setupFormEnhancements() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            const parent = input.parentElement;
            
            // Add focus animations
            input.addEventListener('focus', () => {
                parent.style.transform = 'scale(1.02)';
                parent.style.transition = 'transform 0.2s ease';
                input.style.borderColor = '#3498db';
                input.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
            });
            
            input.addEventListener('blur', () => {
                parent.style.transform = 'scale(1)';
                input.style.borderColor = '#e9ecef';
                input.style.boxShadow = 'none';
            });
            
            // Add typing animation
            input.addEventListener('input', () => {
                input.style.transform = 'scale(1.01)';
                setTimeout(() => {
                    input.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }
    
    // 6. LOADING STATES FOR NAVIGATION
    function setupLoadingStates() {
        const navLinks = document.querySelectorAll('a[href$=".html"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add loading state
                link.style.opacity = '0.7';
                link.style.transform = 'scale(0.95)';
                
                // Create loading indicator
                const loader = document.createElement('div');
                loader.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: linear-gradient(90deg, #3498db, #5dade2);
                    z-index: 10000;
                    animation: loadingBar 1s ease-in-out;
                `;
                
                document.body.appendChild(loader);
                
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.remove();
                    }
                }, 1000);
            });
        });
        
        // Add loading bar animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes loadingBar {
                0% { transform: translateX(-100%); }
                50% { transform: translateX(0%); }
                100% { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 7. ENHANCED SCROLL INDICATORS
    function setupScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #3498db, #5dade2);
            z-index: 9999;
            transition: width 0.1s ease;
            width: 0%;
        `;
        document.body.appendChild(indicator);
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = scrollPercent + '%';
        }, { passive: true });
    }
    
    // 8. SMOOTH SECTION TRANSITIONS
    function setupSectionTransitions() {
        const sections = document.querySelectorAll('section, .Mission, .Contact, main');
        
        sections.forEach(section => {
            section.style.transition = 'all 0.3s ease';
        });
        
        // Add intersection observer for section highlighting
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.backgroundColor = 'rgba(52, 152, 219, 0.02)';
                    entry.target.style.borderRadius = '8px';
                } else {
                    entry.target.style.backgroundColor = 'transparent';
                }
            });
        }, { threshold: 0.3 });
        
        sections.forEach(section => sectionObserver.observe(section));
    }
    
    // 9. PERFORMANCE MONITORING
    function setupPerformanceMonitoring() {
        // Monitor frame rate
        let lastTime = performance.now();
        let frameCount = 0;
        
        function checkPerformance() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // Adjust animations based on performance
                if (fps < 30) {
                    document.body.classList.add('low-performance');
                } else {
                    document.body.classList.remove('low-performance');
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkPerformance);
        }
        
        requestAnimationFrame(checkPerformance);
    }
    
    // Initialize all enhancements
    preloadCriticalResources();
    setupLazyLoading();
    setupPageLoadAnimation();
    setupMicroInteractions();
    setupFormEnhancements();
    setupLoadingStates();
    setupScrollIndicator();
    setupSectionTransitions();
    setupPerformanceMonitoring();
    
    console.log('🚀 Performance optimizations loaded!');
}); 
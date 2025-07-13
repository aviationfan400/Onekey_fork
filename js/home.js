/* Enhanced Home Page JavaScript with Particle Effects */

// Particle System
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePos = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const numParticles = Math.min(100, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)` // Blue to purple range
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mousePos.x - particle.x;
            const dy = this.mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Constrain to canvas
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            
            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = particle.color;
                        this.ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                        this.ctx.stroke();
                    }
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupCountUpAnimations();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Trigger count-up animation
                    if (entry.target.hasAttribute('data-target')) {
                        this.animateCountUp(entry.target);
                    }
                }
            });
        }, options);

        // Observe elements
        document.querySelectorAll('.stat, .program-card, .mission-content').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }

    setupCountUpAnimations() {
        this.countUpAnimated = new Set();
    }

    animateCountUp(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const numberElement = element.querySelector('.stat-number');
        
        if (this.countUpAnimated.has(element) || !numberElement) return;
        this.countUpAnimated.add(element);
        
        let current = 0;
        const increment = target / 60; // 60 frames for 1 second
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            numberElement.textContent = Math.floor(current) + '+';
        }, 16);
    }
}

// Enhanced Typography Effects
class TypingEffect {
    constructor() {
        this.init();
    }

    init() {
        const subtitle = document.querySelector('.title-subtitle');
        if (subtitle) {
            this.typeText(subtitle, subtitle.textContent, 100);
        }
    }

    typeText(element, text, speed) {
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Enhanced Hover Effects
class HoverEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupCardHoverEffects();
        this.setupButtonHoverEffects();
    }

    setupCardHoverEffects() {
        document.querySelectorAll('.program-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e.target, e.pageX, e.pageY);
            });
            
            card.addEventListener('mousemove', (e) => {
                this.updateCardTilt(e.target, e.pageX, e.pageY);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.resetCardTilt(e.target);
            });
        });
    }

    setupButtonHoverEffects() {
        document.querySelectorAll('.cta-primary, .cta-secondary').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createButtonGlow(e.target);
            });
        });
    }

    createRippleEffect(element, x, y) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(102, 126, 234, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (x - element.offsetLeft - 25) + 'px';
        ripple.style.top = (y - element.offsetTop - 25) + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        ripple.style.pointerEvents = 'none';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    updateCardTilt(card, mouseX, mouseY) {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        const rotateX = (mouseY - cardCenterY) / 10;
        const rotateY = (cardCenterX - mouseX) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    }

    resetCardTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }

    createButtonGlow(button) {
        const glow = document.createElement('div');
        glow.style.position = 'absolute';
        glow.style.top = '0';
        glow.style.left = '0';
        glow.style.width = '100%';
        glow.style.height = '100%';
        glow.style.background = 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent)';
        glow.style.borderRadius = 'inherit';
        glow.style.pointerEvents = 'none';
        glow.style.animation = 'buttonGlow 0.6s ease';
        
        button.appendChild(glow);
        
        setTimeout(() => {
            glow.remove();
        }, 600);
    }
}

// Page Load Animations
class PageLoadAnimations {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.animatePageLoad();
        });
    }

    animatePageLoad() {
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Animate slideshow
        const slideshow = document.querySelector('.hero-visual');
        if (slideshow) {
            slideshow.style.opacity = '0';
            slideshow.style.transform = 'translateX(50px)';
            
            setTimeout(() => {
                slideshow.style.transition = 'opacity 1s ease, transform 1s ease';
                slideshow.style.opacity = '1';
                slideshow.style.transform = 'translateX(0)';
            }, 800);
        }
    }
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes buttonGlow {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }

    .program-card {
        transition: transform 0.3s ease !important;
    }

    .title-subtitle {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize particle system if canvas exists
    if (document.getElementById('particleCanvas')) {
        new ParticleSystem();
    }
    
    new ScrollAnimations();
    new TypingEffect();
    new HoverEffects();
    new PageLoadAnimations();
});

// Performance optimization
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Throttled scroll events
            ticking = false;
        });
        ticking = true;
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Clean up any running animations
    document.querySelectorAll('.program-card').forEach(card => {
        card.style.transform = 'none';
    });
}); 
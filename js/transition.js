// Enhanced smooth page transition system
class PageTransition {
    constructor() {
        this.isTransitioning = false;
        this.transitionDuration = 400; // Shorter duration for snappier feel
        this.init();
    }

    init() {
        // Prevent flash of unstyled content
        document.documentElement.style.visibility = 'hidden';
        
        // Initialize page when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializePage());
        } else {
            this.initializePage();
        }
        
        // Setup navigation listeners
        this.setupNavigation();
        
        // Add page fade overlay
        this.createFadeOverlay();
    }

    initializePage() {
        // Show page smoothly
        setTimeout(() => {
            document.documentElement.style.visibility = 'visible';
            document.documentElement.style.opacity = '1';
            
            const main = document.querySelector('main');
            if (main) {
                main.style.opacity = '1';
                main.classList.add('page-loaded');
            }
            
            // Remove any existing fade overlay
            const overlay = document.querySelector('.page-fade-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            }
        }, 50);
    }

    createFadeOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'page-fade-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        document.body.appendChild(overlay);
    }

    setupNavigation() {
        // Handle all navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            // Skip if not an internal navigation link
            if (!this.isInternalLink(link)) return;

            e.preventDefault();
            this.navigateToPage(link.href);
        });
    }

    isInternalLink(link) {
        // More permissive internal link detection
        if (!link.href || 
            link.target === '_blank' ||
            link.href.startsWith('mailto:') ||
            link.href.startsWith('tel:') ||
            link.href.startsWith('javascript:') ||
            (link.href.startsWith('http') && !link.href.includes(window.location.hostname))) {
            return false;
        }
        
        // Allow same-page anchors but handle them differently
        if (link.href.includes('#') && link.href.split('#')[0] === window.location.href.split('#')[0]) {
            return false;
        }
        
        return true;
    }

    async navigateToPage(url) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        document.body.classList.add('transitioning');

        // Create fade overlay for smooth transition
        const overlay = document.createElement('div');
        overlay.className = 'page-fade-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            z-index: 9999;
            opacity: 0;
            transition: opacity ${this.transitionDuration}ms ease;
            pointer-events: none;
        `;
        document.body.appendChild(overlay);

        try {
            // Start fade out animation
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
            });
            
            // Wait for fade animation to complete
            await this.wait(this.transitionDuration);
            
            // Navigate to new page
            window.location.href = url;
            
        } catch (error) {
            console.error('Transition error:', error);
            overlay.remove();
            window.location.href = url;
        }
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize transition system
const pageTransition = new PageTransition();

// Preload pages for faster navigation
document.addEventListener('DOMContentLoaded', () => {
    // Preload all internal navigation links
    const links = document.querySelectorAll('a[href$=".html"], a[href*="/"]');
    links.forEach(link => {
        if (pageTransition.isInternalLink(link)) {
            // Prefetch the page
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = link.href;
            document.head.appendChild(prefetchLink);
            
            // Also preload DNS for external resources
            const preconnectLink = document.createElement('link');
            preconnectLink.rel = 'preconnect';
            preconnectLink.href = link.href;
            document.head.appendChild(preconnectLink);
        }
    });
    
    // Preload critical resources
    const criticalResources = [
        'css/base.css',
        'css/navigation.css',
        'css/transition.css',
        'js/menu.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
});

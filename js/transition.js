// Advanced smooth page transition system
class PageTransition {
    constructor() {
        this.isTransitioning = false;
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
        }, 50);
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
        // Skip external links, anchors, and special links
        if (!link.href || 
            link.href.includes('#') || 
            link.target === '_blank' ||
            link.href.startsWith('mailto:') ||
            link.href.startsWith('tel:') ||
            link.href.startsWith('http') && !link.href.includes(window.location.hostname)) {
            return false;
        }
        return true;
    }

    async navigateToPage(url) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        document.body.classList.add('transitioning');

        const main = document.querySelector('main');
        if (!main) {
            window.location.href = url;
            return;
        }

        try {
            // Start exit animation
            main.classList.add('slide-out');
            
            // Wait for animation to complete
            await this.wait(600);
            
            // Navigate to new page
            window.location.href = url;
            
        } catch (error) {
            console.error('Transition error:', error);
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
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        if (pageTransition.isInternalLink(link)) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = link.href;
            document.head.appendChild(prefetchLink);
        }
    });
});

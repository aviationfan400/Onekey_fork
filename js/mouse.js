// Simple and Reliable Custom Cursor System
(function() {
    'use strict';
    
    let cursorDot, cursorOutline;
    let mouseX = 0, mouseY = 0;
    let isInitialized = false;
    
    // Check if mobile device
    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Create cursor elements
    function createCursorElements() {
        // Remove any existing cursor elements
        const existingDot = document.querySelector('.cursor-dot');
        const existingOutline = document.querySelector('.cursor-outline');
        if (existingDot) existingDot.remove();
        if (existingOutline) existingOutline.remove();
        
        // Create new cursor elements
        cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        
        cursorOutline = document.createElement('div');
        cursorOutline.className = 'cursor-outline';
        
        // Add to body
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);
        
        console.log('Cursor elements created');
    }
    
    // Apply cursor styles directly
    function applyCursorStyles() {
        if (!cursorDot || !cursorOutline) return;
        
        // Cursor dot styles
        Object.assign(cursorDot.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '8px',
            height: '8px',
            backgroundColor: '#3498db',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            transform: 'translate(-50%, -50%)',
            transition: 'transform 0.2s ease',
            opacity: '1',
            visibility: 'visible'
        });
        
        // Cursor outline styles
        Object.assign(cursorOutline.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '40px',
            height: '40px',
            border: '2px solid #3498db',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9998',
            transform: 'translate(-50%, -50%)',
            transition: 'transform 0.3s ease',
            opacity: '1',
            visibility: 'visible',
            backgroundColor: 'transparent'
        });
        
        console.log('Cursor styles applied');
    }
    
    // Hide default cursor
    function hideDefaultCursor() {
        const style = document.createElement('style');
        style.id = 'cursor-hide-style';
        style.textContent = `
            * { cursor: none !important; }
            html, body { cursor: none !important; }
        `;
        document.head.appendChild(style);
        console.log('Default cursor hidden');
    }
    
    // Update cursor position
    function updateCursor(e) {
        if (!cursorDot || !cursorOutline) return;
        
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        cursorOutline.style.left = mouseX + 'px';
        cursorOutline.style.top = mouseY + 'px';
    }
    
    // Setup hover effects
    function setupHoverEffects() {
        const elements = document.querySelectorAll('a, button, .menu-toggle, .cta-button, .value-item, .member-image, .nav-links li, .footer-social a, .pillar, .team-member, .fab, .submit-btn, input, textarea, select');
        
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (cursorOutline) {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorOutline.style.borderColor = '#5dade2';
                }
                if (cursorDot) {
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorDot.style.backgroundColor = '#5dade2';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (cursorOutline) {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorOutline.style.borderColor = '#3498db';
                }
                if (cursorDot) {
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorDot.style.backgroundColor = '#3498db';
                }
            });
        });
    }
    
    // Initialize cursor system
    function initCursor() {
        if (isInitialized || isMobile()) return;
        
        console.log('Initializing cursor system...');
        
        createCursorElements();
        applyCursorStyles();
        hideDefaultCursor();
        setupHoverEffects();
        
        // Add mouse move listener
        document.addEventListener('mousemove', updateCursor);
        
        // Show cursors
        if (cursorDot && cursorOutline) {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        }
        
        isInitialized = true;
        console.log('Cursor system initialized successfully');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCursor);
    } else {
        initCursor();
    }
    
    // Reinitialize on page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && !isMobile()) {
            setTimeout(initCursor, 100);
        }
    });
    
})();

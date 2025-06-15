// Simple iPad Pro Style Cursor - Circle Only
(function() {
    'use strict';
    
    let cursor = null;
    let isInitialized = false;
    let mouseX = 0;
    let mouseY = 0;
    let animationId = null;
    
    function createCursor() {
        if (cursor) return cursor;
        
        cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
        return cursor;
    }
    
    function updateCursorPosition() {
        if (!cursor) return;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
    
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!animationId) {
            animationId = requestAnimationFrame(() => {
                updateCursorPosition();
                animationId = null;
            });
        }
    }
    
    function handleMouseLeave() {
        if (cursor) cursor.style.opacity = '0';
    }
    
    function handleMouseEnter() {
        if (cursor) cursor.style.opacity = '1';
    }
    
    function init() {
        if (isInitialized) return;
        
        // Skip on mobile/touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            return;
        }
        
        createCursor();
        
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
        
        isInitialized = true;
    }
    
    // Initialize immediately if DOM is ready
    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    }
    
})(); 
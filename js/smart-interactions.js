// Smart Interactions and UX Enhancements
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SMART NAVIGATION HINTS
    function setupNavigationHints() {
        const navLinks = document.querySelectorAll('a[href$=".html"]');
        
        navLinks.forEach(link => {
            // Add preview tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'nav-tooltip';
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.8rem;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                z-index: 10000;
            `;
            
            // Set tooltip text based on link
            const href = link.getAttribute('href');
            if (href.includes('about')) tooltip.textContent = 'Learn about our story';
            else if (href.includes('mission')) tooltip.textContent = 'Discover our mission';
            else if (href.includes('contact')) tooltip.textContent = 'Get in touch with us';
            else if (href.includes('index')) tooltip.textContent = 'Return to homepage';
            
            document.body.appendChild(tooltip);
            
            link.addEventListener('mouseenter', (e) => {
                const rect = link.getBoundingClientRect();
                tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
                tooltip.style.top = rect.bottom + 10 + 'px';
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            });
            
            link.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(-10px)';
            });
        });
    }
    
    // 2. SMART SCROLL SUGGESTIONS
    function setupScrollSuggestions() {
        let scrollSuggestion = null;
        
        function createScrollSuggestion() {
            scrollSuggestion = document.createElement('div');
            scrollSuggestion.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span>Scroll to explore</span>
                    <div style="animation: bounce 2s infinite;">↓</div>
                </div>
            `;
            scrollSuggestion.style.cssText = `
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(52, 152, 219, 0.9);
                color: white;
                padding: 12px 20px;
                border-radius: 25px;
                font-size: 0.9rem;
                z-index: 1000;
                transition: all 0.3s ease;
                cursor: none !important;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-5px); }
                    60% { transform: translateY(-3px); }
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(scrollSuggestion);
            
            // Hide after user scrolls
            let hasScrolled = false;
            window.addEventListener('scroll', () => {
                if (!hasScrolled && window.scrollY > 100) {
                    hasScrolled = true;
                    scrollSuggestion.style.opacity = '0';
                    scrollSuggestion.style.transform = 'translateX(-50%) translateY(20px)';
                    setTimeout(() => {
                        if (scrollSuggestion.parentNode) {
                            scrollSuggestion.remove();
                        }
                    }, 300);
                }
            }, { passive: true });
        }
        
        // Show scroll suggestion after page loads
        setTimeout(createScrollSuggestion, 2000);
    }
    
    // 3. CONTEXTUAL ACTION BUTTONS
    function setupContextualActions() {
        // Back to top button
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑';
        backToTop.className = 'fab back-to-top';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3498db, #5dade2);
            color: white;
            border: none;
            font-size: 1.2rem;
            cursor: none !important;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
        `;
        
        document.body.appendChild(backToTop);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'scale(1)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'scale(0)';
            }
        }, { passive: true });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Share button (if supported)
        if (navigator.share) {
            const shareButton = document.createElement('button');
            shareButton.innerHTML = '📤';
            shareButton.className = 'fab share-button';
            shareButton.style.cssText = `
                position: fixed;
                bottom: 160px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: white;
                border: none;
                font-size: 1rem;
                cursor: none !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 1000;
            `;
            
            document.body.appendChild(shareButton);
            
            shareButton.addEventListener('click', async () => {
                try {
                    await navigator.share({
                        title: document.title,
                        text: 'Check out this amazing organization!',
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Share failed:', err);
                }
            });
        }
    }
    
    // 4. SMART FORM VALIDATION
    function setupSmartFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                // Real-time validation feedback
                input.addEventListener('input', () => {
                    validateField(input);
                });
                
                input.addEventListener('blur', () => {
                    validateField(input);
                });
            });
            
            form.addEventListener('submit', (e) => {
                let isValid = true;
                inputs.forEach(input => {
                    if (!validateField(input)) {
                        isValid = false;
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    showFormError('Please fix the errors above');
                }
            });
        });
        
        function validateField(input) {
            const value = input.value.trim();
            const type = input.type;
            let isValid = true;
            let message = '';
            
            // Remove existing feedback
            const existingFeedback = input.parentNode.querySelector('.field-feedback');
            if (existingFeedback) {
                existingFeedback.remove();
            }
            
            // Validation rules
            if (input.required && !value) {
                isValid = false;
                message = 'This field is required';
            } else if (type === 'email' && value && !isValidEmail(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            } else if (input.name === 'phone' && value && !isValidPhone(value)) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
            
            // Visual feedback
            if (!isValid) {
                input.style.borderColor = '#e74c3c';
                input.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
                showFieldFeedback(input, message, 'error');
            } else if (value) {
                input.style.borderColor = '#27ae60';
                input.style.boxShadow = '0 0 0 3px rgba(39, 174, 96, 0.1)';
                showFieldFeedback(input, 'Looks good!', 'success');
            } else {
                input.style.borderColor = '#e9ecef';
                input.style.boxShadow = 'none';
            }
            
            return isValid;
        }
        
        function showFieldFeedback(input, message, type) {
            const feedback = document.createElement('div');
            feedback.className = 'field-feedback';
            feedback.textContent = message;
            feedback.style.cssText = `
                font-size: 0.8rem;
                margin-top: 5px;
                color: ${type === 'error' ? '#e74c3c' : '#27ae60'};
                opacity: 0;
                transform: translateY(-5px);
                transition: all 0.3s ease;
            `;
            
            input.parentNode.appendChild(feedback);
            
            setTimeout(() => {
                feedback.style.opacity = '1';
                feedback.style.transform = 'translateY(0)';
            }, 10);
        }
        
        function showFormError(message) {
            // Create or update form error message
            let errorDiv = document.querySelector('.form-error');
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'form-error';
                errorDiv.style.cssText = `
                    background: #e74c3c;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 6px;
                    margin: 20px 0;
                    font-size: 0.9rem;
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: all 0.3s ease;
                `;
                
                const form = document.querySelector('form');
                if (form) {
                    form.insertBefore(errorDiv, form.firstChild);
                }
            }
            
            errorDiv.textContent = message;
            errorDiv.style.opacity = '1';
            errorDiv.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                errorDiv.style.opacity = '0';
                errorDiv.style.transform = 'translateY(-10px)';
            }, 5000);
        }
        
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        function isValidPhone(phone) {
            return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''));
        }
    }
    
    // 5. KEYBOARD SHORTCUTS
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only activate if not typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch (e.key.toLowerCase()) {
                case 'h':
                    e.preventDefault();
                    window.location.href = 'index.html';
                    break;
                case 'a':
                    e.preventDefault();
                    window.location.href = 'html/about.html';
                    break;
                case 'm':
                    e.preventDefault();
                    window.location.href = 'html/mission.html';
                    break;
                case 'c':
                    e.preventDefault();
                    window.location.href = 'html/contact.html';
                    break;
                case '?':
                    e.preventDefault();
                    showKeyboardShortcuts();
                    break;
            }
        });
        
        function showKeyboardShortcuts() {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            modal.innerHTML = `
                <div style="
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    max-width: 400px;
                    width: 90%;
                    transform: scale(0.9);
                    transition: transform 0.3s ease;
                ">
                    <h3 style="margin-bottom: 20px; color: #2c3e50;">Keyboard Shortcuts</h3>
                    <div style="display: grid; gap: 10px; font-size: 0.9rem;">
                        <div><kbd>H</kbd> - Home page</div>
                        <div><kbd>A</kbd> - About page</div>
                        <div><kbd>M</kbd> - Mission page</div>
                        <div><kbd>C</kbd> - Contact page</div>
                        <div><kbd>?</kbd> - Show this help</div>
                        <div><kbd>Esc</kbd> - Close dialogs</div>
                    </div>
                    <button onclick="this.closest('.modal').remove()" style="
                        margin-top: 20px;
                        padding: 8px 16px;
                        background: #3498db;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: none !important;
                    ">Got it!</button>
                </div>
            `;
            
            modal.className = 'modal';
            document.body.appendChild(modal);
            
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.querySelector('div').style.transform = 'scale(1)';
            }, 10);
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
            
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        }
    }
    
    // 6. SMART LOADING STATES
    function setupSmartLoading() {
        // Show loading for slow connections
        let loadingTimeout = setTimeout(() => {
            const loader = document.createElement('div');
            loader.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.95);
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                text-align: center;
            `;
            
            loader.innerHTML = `
                <div style="
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 15px;
                "></div>
                <div style="color: #666;">Loading amazing content...</div>
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(loader);
            
            window.addEventListener('load', () => {
                loader.remove();
            });
        }, 1000);
        
        window.addEventListener('load', () => {
            clearTimeout(loadingTimeout);
        });
    }
    
    // Initialize all smart interactions
    setupNavigationHints();
    setupScrollSuggestions();
    setupContextualActions();
    setupSmartFormValidation();
    setupKeyboardShortcuts();
    setupSmartLoading();
    
    console.log('🧠 Smart interactions loaded!');
}); 
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('shapesCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Call resize on load and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Shape class
    class Shape {
        constructor(x, y, size, color, speed, type) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.opacity = Math.random() * 0.3 + 0.1; // More varied opacity for fluidity
            this.speed = speed;
            this.type = type;
            this.angle = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 0.007; // Slower rotation
            this.vx = (Math.random() - 0.5) * speed;
            this.vy = (Math.random() - 0.5) * speed;
            this.sizeChange = (Math.random() - 0.5) * 0.1; // Add size pulsing
        }
        
        update() {
            // Move
            this.x += this.vx;
            this.y += this.vy;
            
            // Rotate
            this.angle += this.rotationSpeed;
            
            // Pulse size
            this.size += this.sizeChange;
            if (this.size < 20 || this.size > 70) {
                this.sizeChange *= -1;
            }
            
            // Bounce off edges with some buffer
            if (this.x < -100 || this.x > canvas.width + 100) this.vx *= -1;
            if (this.y < -100 || this.y > canvas.height + 100) this.vy *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            
            switch(this.type) {
                case 'square':
                    ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
                    break;
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 'triangle':
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size/2);
                    ctx.lineTo(this.size/2, this.size/2);
                    ctx.lineTo(-this.size/2, this.size/2);
                    ctx.closePath();
                    ctx.fill();
                    break;
            }
            
            ctx.restore();
        }
    }
    
    // Create shapes - more of them for fluid background
    const shapes = [];
    const shapeColors = ['#3498db', '#2c3e50', '#e74c3c', '#ecf0f1', '#34495e'];
    const shapeTypes = ['square', 'circle', 'triangle'];
    
    for (let i = 0; i < 40; i++) { // More shapes
        const x = Math.random() * (canvas.width + 200) - 100; // Allow shapes off screen
        const y = Math.random() * (canvas.height + 200) - 100;
        const size = Math.random() * 50 + 20;
        const color = shapeColors[Math.floor(Math.random() * shapeColors.length)];
        const speed = 0.3; // Slower speed for more fluid feel
        const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        
        shapes.push(new Shape(x, y, size, color, speed, type));
    }
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw shapes
        shapes.forEach(shape => {
            shape.update();
            shape.draw();
        });
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Add scroll-based animation for content sections
    const observerOptions = {
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('.section-content, .team-member, .value-card, .join-section').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}); 
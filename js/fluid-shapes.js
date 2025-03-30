document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('shapesCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    canvas.style.pointerEvents = 'none';
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class FluidShape {
        constructor() {
            this.centerX = Math.random() * canvas.width;
            this.centerY = Math.random() * canvas.height;
            this.radius = Math.random() * 100 + 50;
            this.color = this.getRandomColor();
            this.points = [];
            this.numPoints = Math.floor(Math.random() * 3) + 6; 
            this.createPoints();
            this.speed = Math.random() * 0.001 + 0.0005;
            this.angle = 0;
            this.xMovement = (Math.random() - 0.5) * 0.3;
            this.yMovement = (Math.random() - 0.5) * 0.3;
        }
        
        getRandomColor() {
            const colors = [
                'rgba(52, 152, 219, 0.15)', 
                'rgba(41, 128, 185, 0.15)', 
                'rgba(142, 68, 173, 0.10)', 
                'rgba(52, 73, 94, 0.08)',   
                'rgba(26, 188, 156, 0.12)'  
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        createPoints() {
            for (let i = 0; i < this.numPoints; i++) {
                const angle = (i / this.numPoints) * Math.PI * 2;
                const randomRadius = this.radius * (0.8 + Math.random() * 0.4);
                this.points.push({
                    x: Math.cos(angle) * randomRadius,
                    y: Math.sin(angle) * randomRadius,
                    originX: Math.cos(angle) * randomRadius,
                    originY: Math.sin(angle) * randomRadius,
                    noiseOffsetX: Math.random() * 1000,
                    noiseOffsetY: Math.random() * 1000,
                    speed: Math.random() * 0.01 + 0.01
                });
            }
        }
        
        update() {
            this.angle += this.speed;
            this.centerX += this.xMovement;
            this.centerY += this.yMovement;
            
            
            if (this.centerX < -this.radius || this.centerX > canvas.width + this.radius) {
                this.xMovement *= -1;
            }
            if (this.centerY < -this.radius || this.centerY > canvas.height + this.radius) {
                this.yMovement *= -1;
            }
            
            
            for (let i = 0; i < this.numPoints; i++) {
                const point = this.points[i];
                
                point.noiseOffsetX += point.speed;
                point.noiseOffsetY += point.speed;
                
                
                point.x = point.originX + Math.sin(point.noiseOffsetX) * 15;
                point.y = point.originY + Math.cos(point.noiseOffsetY) * 15;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            
            
            ctx.moveTo(
                this.centerX + this.points[0].x,
                this.centerY + this.points[0].y
            );
            
            
            for (let i = 0; i < this.numPoints; i++) {
                const nextIndex = (i + 1) % this.numPoints;
                const nextPoint = this.points[nextIndex];
                const currentPoint = this.points[i];
                
                
                const cpX1 = this.centerX + currentPoint.x + (nextPoint.x - currentPoint.x) * 0.5;
                const cpY1 = this.centerY + currentPoint.y;
                const cpX2 = this.centerX + nextPoint.x - (nextPoint.x - currentPoint.x) * 0.5;
                const cpY2 = this.centerY + nextPoint.y;
                
                ctx.bezierCurveTo(
                    cpX1, cpY1,
                    cpX2, cpY2,
                    this.centerX + nextPoint.x, 
                    this.centerY + nextPoint.y
                );
            }
            
            ctx.closePath();
            ctx.fill();
        }
    }
    
    
    const shapes = [];
    const numShapes = 6;
    
    for (let i = 0; i < numShapes; i++) {
        shapes.push(new FluidShape());
    }
    
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        shapes.forEach(shape => {
            shape.update();
            shape.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        const parallaxElements = document.querySelectorAll('.member-image, .story-image');
        
        parallaxElements.forEach(el => {
            const speed = 0.05;
            el.style.transform = `translateY(${scrollPos * speed}px)`;
        });
    });
}); 
// JavaScript for carousel functionality
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-items').style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

const video = document.getElementById('backgroundVideo');
video.playbackRate = 0.5; // Slow down the video to half speed

// Fireflies effect
const canvas = document.getElementById('fireflyCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to window dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireflies = [];
const numFireflies = 100;

class Firefly {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Size between 2 and 5
        this.alpha = Math.random() * 0.5 + 0.5; // Alpha between 0.5 and 1
        this.speed = Math.random() * 0.5 + 0.5; // Speed between 0.5 and 1
        this.direction = Math.random() * Math.PI * 2; // Random direction
    }

    update() {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
            this.direction = Math.PI - this.direction; // Change direction
        }
        if (this.y > canvas.height || this.y < 0) {
            this.direction = -this.direction; // Change direction
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Set shadow properties
        ctx.shadowColor = 'rgba(255, 255, 0, 0.5)'; // Yellow shadow
        ctx.shadowBlur = 10; // Control the blur level for glow effect
        ctx.fillStyle = `rgba(255, 255, 0, ${this.alpha})`; // Yellow firefly color
        ctx.fill();

        // Reset shadow properties for other drawings
        ctx.shadowColor = 'transparent'; // Reset shadow to transparent
        ctx.shadowBlur = 0; // Reset shadow blur
    }
}

// Initialize fireflies
for (let i = 0; i < numFireflies; i++) {
    fireflies.push(new Firefly());
}

// Animation loop for fireflies
function animateFireflies() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    fireflies.forEach(firefly => {
        firefly.update();
        firefly.draw();
    });

    requestAnimationFrame(animateFireflies);
}

// Start the firefly animation
animateFireflies();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Custom cursor functionality
const customCursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.pageX}px`;
    customCursor.style.top = `${e.pageY}px`;
});

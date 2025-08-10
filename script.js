// Navbar scroll effect
window.addEventListener('scroll', function(){
    const navbar = this.document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Crazy hover effects for nav items
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.3) rotate(' + (Math.random() * 20 - 10) + 'deg)';
        this.style.background = getRandomGradient();
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.background = 'rgba(255,255,255,0.2)';
    });
});

function getRandomGradient() {
    const colors = ['#ff00aa', '#00ffff', '#ff0066', '#00ffaa', '#cc00ff'];
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(45deg, ${color1}, ${color2})`;
}

 // Make flavor cards wobble on hover
const flavorCards = document.querySelectorAll('.flavor-card');
flavorCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = `rotate(${Math.random()*10 - 5} deg) scale(1.1)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

const orderCards = document.querySelectorAll('.order-card');

orderCards.forEach(card => {
    card.addEventListener('click', function () {
        // Reset transform in case it's already applied
        this.style.transition = 'none';
        this.style.transform = 'rotate(0deg)';

        // Force reflow to apply the initial state
        void this.offsetWidth; // This line forces the reflow

        // Apply spinning transform with transition
        this.style.transition = 'transform 1s ease';
        this.style.transform = 'rotate(360deg)';

        // Reset after animation completes
        setTimeout(() => {
            this.style.transition = '';
            this.style.transform = '';
        }, 1000);
    });
});


// Add confetti to button clicks
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        createConfetti(this);
        setTimeout(() => {
            window.location.href = this.getAttribute('href');
        }, 1000);
    });
});

function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#ff00aa', '#00ffff', '#ff0066', '#00ffaa', '#cc00ff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = (rect.left + rect.width/2) + 'px';
        confetti.style.top = (rect.top + rect.height/2) + 'px';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        document.body.appendChild(confetti);
        
        let posX = rect.left + rect.width/2;
        let posY = rect.top + rect.height/2;
        let opacity = 1;
        
        const animate = () => {
            posX += x;
            posY += y + 0.1; // gravity
            opacity -= 0.02;
            
            confetti.style.left = posX + 'px';
            confetti.style.top = posY + 'px';
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

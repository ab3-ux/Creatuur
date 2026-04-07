// ==== COSMIC CANVAS SETUP ====
const canvas = document.getElementById("cosmicCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ==== STELLAR SYSTEM ====
class Star {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.sz = z;
        this.radius = Math.random() * 1.5 + 0.5;
        this.speed = Math.random() * 0.02 + 0.01;
        this.color = ['#00f0ff', '#a855f7', '#ff00ff', '#00ff88'][Math.floor(Math.random() * 4)];
        this.pulsePhase = Math.random() * Math.PI * 2;
    }
    
    update() {
        this.z -= this.speed;
        if (this.z <= 0) {
            this.z = 1000;
            this.x = (Math.random() - 0.5) * canvas.width * 2;
            this.y = (Math.random() - 0.5) * canvas.height * 2;
        }
    }
    
    draw() {
        const x = (this.x / this.z) * canvas.width + canvas.width / 2;
        const y = (this.y / this.z) * canvas.height + canvas.height / 2;
        const r = this.radius * (1 - this.z / 1000);
        
        if (r > 0.1) {
            // Calcul du pulse
            const pulse = Math.sin(this.pulsePhase + Date.now() * 0.003) * 0.5 + 0.5;
            const finalRadius = r * (0.5 + pulse * 0.5);
            
            ctx.beginPath();
            ctx.arc(x, y, finalRadius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 15 * pulse;
            ctx.fill();
        }
    }
}

// ==== NEBULA CLOUD SYSTEM ====
class NebulaParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 100 + 50;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = ['rgba(0, 240, 255, ', 'rgba(168, 85, 247, ', 'rgba(255, 0, 255, '][Math.floor(Math.random() * 3)];
        this.pulseSpeed = Math.random() * 0.002 + 0.001;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += (Math.random() - 0.5) * 0.01;
        
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;
        
        this.opacity = Math.max(0.05, Math.min(0.4, this.opacity));
    }
    
    draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color + this.opacity * 1.5 + ')');
        gradient.addColorStop(0.5, this.color + this.opacity + ')');
        gradient.addColorStop(1, this.color + '0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
}

// ==== WORMHOLE EFFECT ====
class WormholeParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.age = 0;
        this.lifespan = Math.random() * 60 + 40;
        this.radius = Math.random() * 30 + 20;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#00f0ff' : '#a855f7';
    }
    
    update() {
        this.age++;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.radius -= 0.3;
    }
    
    draw() {
        const progress = this.age / this.lifespan;
        const opacity = 1 - progress;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
    
    isDead() {
        return this.age >= this.lifespan;
    }
}

// ==== INITIALIZATION ====
let stars = [];
let nebulaParticles = [];
let wormholeParticles = [];

// Créer les étoiles
for (let i = 0; i < 500; i++) {
    const x = (Math.random() - 0.5) * canvas.width * 2;
    const y = (Math.random() - 0.5) * canvas.height * 2;
    const z = Math.random() * 1000;
    stars.push(new Star(x, y, z));
}

// Créer les nuages de nébula
for (let i = 0; i < 8; i++) {
    nebulaParticles.push(new NebulaParticle());
}

// ==== ANIMATION LOOP ====
function animate() {
    // Fond avec dégradé cosmique
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Mettre à jour et dessiner les étoiles
    for (let star of stars) {
        star.update();
        star.draw();
    }
    
    // Mettre à jour et dessiner les nébulas
    for (let nebula of nebulaParticles) {
        nebula.update();
        nebula.draw();
    }
    
    // Nettoyer les wormhole particles mortes
    wormholeParticles = wormholeParticles.filter(p => !p.isDead());
    
    // Mettre à jour et dessiner les wormhole particles
    for (let particle of wormholeParticles) {
        particle.update();
        particle.draw();
    }
    
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    
    requestAnimationFrame(animate);
}

animate();

// ==== EVENT LISTENERS ====
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ==== WEB3 INTERACTIONS ====
function activateCreature() {
    const img = document.getElementById("creature");
    
    // Effet de pulse
    img.style.transform = "scale(1.15) rotateY(360deg)";
    img.style.filter = "drop-shadow(0 0 50px #00f0ff) drop-shadow(0 0 100px #a855f7)";
    
    // Créer un wormhole à la position de la créature
    const creatureRect = document.querySelector(".creature-container").getBoundingClientRect();
    const cx = creatureRect.left + creatureRect.width / 2;
    const cy = creatureRect.top + creatureRect.height / 2;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            wormholeParticles.push(new WormholeParticle(cx, cy));
        }, i * 20);
    }
    
    // Vibration du changement de statut
    updateNetworkStatus("ACTIVATED");
    
    setTimeout(() => {
        img.style.transform = "scale(1)";
        img.style.filter = "drop-shadow(0 0 30px rgba(0, 240, 255, 0.6)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.4))";
    }, 600);
}

function openPortal() {
    // Créer un portail de particules partout sur l'écran
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            wormholeParticles.push(new WormholeParticle(x, y));
        }, i * 10);
    }
    
    // Flash visuel
    const effectsLayer = document.querySelector(".effects-layer");
    effectsLayer.style.background = 'rgba(0, 240, 255, 0.2)';
    
    setTimeout(() => {
        effectsLayer.style.background = 'repeating-linear-gradient(0deg, rgba(0, 240, 255, 0.03), rgba(0, 240, 255, 0.03) 1px, transparent 1px, transparent 2px)';
    }, 300);
    
    updateNetworkStatus("PORTAL OPENING");
    
    setTimeout(() => {
        updateNetworkStatus("Connected");
    }, 2000);
}

function updateNetworkStatus(status) {
    const statusStat = document.getElementById("status-stat");
    statusStat.textContent = status;
    statusStat.style.textShadow = '0 0 20px rgba(0, 240, 255, 0.8), 0 0 40px rgba(168, 85, 247, 0.6)';
    
    setTimeout(() => {
        statusStat.textContent = 'Connected';
        statusStat.style.textShadow = '0 0 10px rgba(0, 240, 255, 0.5)';
    }, 1500);
}

// ==== PARTICLE FLOAT EFFECT IN HTML ====
function createFloatingParticles() {
    const particlesContainer = document.getElementById("particles");
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        
        const x = Math.random() * 100 - 50;
        const y = Math.random() * 100 - 50;
        const delay = Math.random() * 4;
        
        particle.style.left = Math.random() * window.innerWidth + "px";
        particle.style.top = Math.random() * window.innerHeight + "px";
        particle.style.--x = x + "px";
        particle.style.setProperty('--x', `${x}px`);
        particle.style.animationDelay = delay + "s";
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
            createFloatingParticles();
        }, 8000);
    }
}

createFloatingParticles();

// ==== COSMIC EVENTS ====
// Événements cosmiques aléatoires
setInterval(() => {
    if (Math.random() > 0.7) {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                wormholeParticles.push(new WormholeParticle(x, y));
            }, i * 5);
        }
    }
}, 5000);

// ==== MOUSE TRACKING ====
document.addEventListener("mousemove", (e) => {
    // Créer des particules au suiveur de souris
    if (Math.random() > 0.8) {
        wormholeParticles.push(new WormholeParticle(e.clientX, e.clientY));
    }
});

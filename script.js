// Variables globales
let cursor = null;
let particles = [];
let mouseX = 0;
let mouseY = 0;
let particleContainer = null;

// Inicialización cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    // Ocultar pantalla de carga después de 3 segundos
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading');
        loadingScreen.classList.add('hide');
    }, 3000);

    // Inicializar efectos
    initCursor();
    initParticles();
    initButton();
    initSoundEffects();
});

// Cursor personalizado
function initCursor() {
    cursor = document.getElementById('cursor');
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Crear partículas que siguen el cursor ocasionalmente
        if (Math.random() < 0.1) {
            createCursorParticle(mouseX, mouseY);
        }
    });
    
    // Efectos en hover de elementos interactivos
    const interactiveElements = document.querySelectorAll('.mystery-button, .greetings span');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.querySelector('.cursor-dot').style.background = '#ff69b4';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.querySelector('.cursor-dot').style.background = '#fbff00';
        });
    });
}

// Sistema de partículas
function initParticles() {
    particleContainer = document.getElementById('particles');
    
    // Crear partículas de fondo
    for (let i = 0; i < 30; i++) {
        createBackgroundParticle();
    }
    
    // Regenerar partículas constantemente
    setInterval(createBackgroundParticle, 2000);
}

function createBackgroundParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight + 50;
    const duration = Math.random() * 10 + 15;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.animationDuration = duration + 's';
    
    particleContainer.appendChild(particle);
    
    // Remover partícula después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.background = '#fbff00';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9998';
    particle.style.boxShadow = '0 0 10px #fbff00';
    
    document.body.appendChild(particle);
    
    // Animar partícula
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 20;
    const targetX = x + Math.cos(angle) * distance;
    const targetY = y + Math.sin(angle) * distance;
    
    particle.animate([
        {
            transform: 'translate(0, 0) scale(1)',
            opacity: 1
        },
        {
            transform: `translate(${targetX - x}px, ${targetY - y}px) scale(0)`,
            opacity: 0
        }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = function() {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    };
}

// Botón interactivo
function initButton() {
    const button = document.getElementById('mysteryButton');
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Sonido de click
        playClickSound();
        
        // Animación de salida y redirección
        setTimeout(() => {
            createExitAnimation();
            
            setTimeout(() => {
                window.location.href = 'flores.html';
            }, 1000);
        }, 500);
    });
    
    // Efecto hover adicional
    button.addEventListener('mouseenter', function() {
        createHoverParticles(this);
    });
}

function createHoverParticles(button) {
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#fbff00';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.opacity = '0.8';
            
            document.body.appendChild(particle);
            
            particle.animate([
                {
                    transform: 'translateY(0) scale(1)',
                    opacity: 0.8
                },
                {
                    transform: 'translateY(-50px) scale(0)',
                    opacity: 0
                }
            ], {
                duration: 2000,
                easing: 'ease-out'
            }).onfinish = function() {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
        }, i * 100);
    }
}

function createExitAnimation() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.animate([
        {
            opacity: 1,
            transform: 'scale(1) rotate(0deg)',
            filter: 'blur(0px)'
        },
        {
            opacity: 0,
            transform: 'scale(0.8) rotate(5deg)',
            filter: 'blur(5px)'
        }
    ], {
        duration: 1000,
        easing: 'ease-in'
    });
    
    // Crear partículas de salida
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createCursorParticle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 20);
    }
}

// Sistema de sonido
function initSoundEffects() {
    // Función vacía - sonido ambiente deshabilitado
}

function playClickSound() {
    // Crear sonido sintético si no hay archivo de audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Efectos adicionales al scroll (aunque está deshabilitado)
document.addEventListener('wheel', function(e) {
    if (Math.random() < 0.3) {
        createCursorParticle(mouseX, mouseY);
    }
});

// Efectos de teclado para interactividad adicional
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' || e.code === 'Enter') {
        const button = document.getElementById('mysteryButton');
        if (button) {
            button.click();
        }
    }
});

// Optimización de rendimiento - limpiar partículas viejas
setInterval(() => {
    const allParticles = document.querySelectorAll('.particle');
    if (allParticles.length > 100) {
        for (let i = 0; i < 20; i++) {
            if (allParticles[i] && allParticles[i].parentNode) {
                allParticles[i].parentNode.removeChild(allParticles[i]);
            }
        }
    }
}, 10000);
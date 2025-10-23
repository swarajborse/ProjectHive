// ---------- DOM Elements ----------
const lightBtn = document.getElementById("lightBtn");
const flame = document.querySelector(".flame");
const diya = document.querySelector(".diya");
const makeGreeting = document.getElementById("makeGreeting");
const nameInput = document.getElementById("nameInput");
const greetingText = document.getElementById("greetingText");
const fireworksCanvas = document.getElementById("fireworksCanvas");
const ctx = fireworksCanvas.getContext("2d");

// ---------- Sounds ----------
const aartiSound = document.getElementById("aartiSound");
const firework1 = document.getElementById("firework1");
const firework2 = document.getElementById("firework2");

let diyaLit = false;
let fireworks = [];

fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

// ---------- Event Listeners ----------
lightBtn.addEventListener("click", () => {
  diyaLit = !diyaLit;
  flame.style.opacity = diyaLit ? "1" : "0";
  diya.classList.toggle("diya-lit", diyaLit);

  if (diyaLit) {
    safePlay(aartiSound);
    safePlay(firework1);
    safePlay(firework2);
    startFireworks();
    lightBtn.textContent = "Extinguish";
  } else {
    aartiSound.pause();
    firework1.pause();
    firework2.pause();
    aartiSound.currentTime = 0;
    firework1.currentTime = 0;
    firework2.currentTime = 0;
    fireworks = [];
    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    lightBtn.textContent = "Light the Diya";
  }
});

// Greeting generator
makeGreeting.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name) {
    greetingText.textContent =
      `🎉 Happy Diwali, ${name}! May your life glow like this Diya 🪔`;
  } else {
    greetingText.textContent = "Please enter your name to get your greeting!";
  }
});

// ---------- Utility: autoplay-safe play ----------
function safePlay(audio) {
  // Play will only work after user interaction; catch errors silently
  audio.currentTime = 0;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
}

// ---------- Fireworks Animation ----------
class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particles = [];
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: x,
        y: y,
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 6 - 3,
        life: 100 + Math.random() * 30
      });
    }
  }
  update() {
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += 0.05; // gravity
      p.life -= 2;
    });
  }
  draw() {
    this.particles.forEach(p => {
      ctx.fillStyle = this.color;
      ctx.fillRect(p.x, p.y, 2, 2);
    });
  }
}

function startFireworks() {
  animate();
}

function animate() {
  if (!diyaLit) return;
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

  if (Math.random() < 0.05) {
    const x = Math.random() * fireworksCanvas.width;
    const y = Math.random() * fireworksCanvas.height / 2;
    const colors = ["red", "gold", "blue", "purple", "orange", "lime"];
    fireworks.push(new Firework(x, y, colors[Math.floor(Math.random() * colors.length)]));
    safePlay(firework1);
  }

  fireworks.forEach(f => {
    f.update();
    f.draw();
  });

  fireworks = fireworks.filter(f => f.particles.some(p => p.life > 0));
  requestAnimationFrame(animate);
}
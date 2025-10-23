const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const audioFileInput = document.getElementById("audioFile");
const playPauseBtn = document.getElementById("playPause");
const generateToneBtn = document.getElementById("generateTone");
const info = document.getElementById("info");
const modeButtons = document.querySelectorAll(".mode-btn");

let audioContext;
let analyser;
let dataArray;
let bufferLength;
let audio;
let source;
let isPlaying = false;
let animationId;
let currentMode = "bars";

// Set canvas size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

window.addEventListener("resize", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

// Create background particles
const particlesContainer = document.getElementById("particles");
for (let i = 0; i < 50; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.width = Math.random() * 5 + 2 + "px";
  particle.style.height = particle.style.width;
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 15 + "s";
  particle.style.animationDuration = Math.random() * 10 + 10 + "s";
  particlesContainer.appendChild(particle);
}

// Mode selection
modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    modeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
  });
});

// Audio file handling
audioFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    if (audio) {
      audio.pause();
    }
    audio = new Audio();
    audio.src = URL.createObjectURL(file);
    info.textContent = `Loaded: ${file.name}`;
    playPauseBtn.disabled = false;
    setupAudioContext();
  }
});

// Generate tone
generateToneBtn.addEventListener("click", () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (source) {
    source.disconnect();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

  if (!analyser) {
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  }

  oscillator.connect(gainNode);
  gainNode.connect(analyser);
  analyser.connect(audioContext.destination);

  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
  }, 2000);

  if (!animationId) {
    visualize();
  }

  info.textContent = "Playing 440Hz tone";
});

// Play/Pause
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "Play";
    isPlaying = false;
  } else {
    audio.play();
    playPauseBtn.textContent = "Pause";
    isPlaying = true;
    if (!animationId) {
      visualize();
    }
  }
});

function setupAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (source) {
    source.disconnect();
  }

  source = audioContext.createMediaElementSource(audio);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);
  analyser.connect(audioContext.destination);
}

function visualize() {
  animationId = requestAnimationFrame(visualize);

  if (!analyser) return;

  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = "rgba(26, 26, 46, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (currentMode === "bars") {
    drawBars();
  } else if (currentMode === "wave") {
    drawWave();
  } else if (currentMode === "circular") {
    drawCircular();
  } else if (currentMode === "spectrum") {
    drawSpectrum();
  }
}

function drawBars() {
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = (dataArray[i] / 255) * canvas.height;

    const hue = (i / bufferLength) * 360;
    ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

function drawWave() {
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#f093fb";
  ctx.beginPath();

  const sliceWidth = canvas.width / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 255;
    const y = v * canvas.height;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  ctx.stroke();
}

function drawCircular() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) / 3;

  for (let i = 0; i < bufferLength; i++) {
    const angle = (i / bufferLength) * Math.PI * 2;
    const barHeight = (dataArray[i] / 255) * 100;

    const x1 = centerX + Math.cos(angle) * radius;
    const y1 = centerY + Math.sin(angle) * radius;
    const x2 = centerX + Math.cos(angle) * (radius + barHeight);
    const y2 = centerY + Math.sin(angle) * (radius + barHeight);

    const hue = (i / bufferLength) * 360;
    ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

function drawSpectrum() {
  const barWidth = canvas.width / bufferLength;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = (dataArray[i] / 255) * canvas.height;

    const gradient = ctx.createLinearGradient(
      0,
      canvas.height - barHeight,
      0,
      canvas.height
    );
    gradient.addColorStop(0, "#f093fb");
    gradient.addColorStop(0.5, "#f5576c");
    gradient.addColorStop(1, "#4facfe");

    ctx.fillStyle = gradient;
    ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
  }
}

const fileInput = document.getElementById('audio-file');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

let audioCtx;
let analyser;
let source;
let dataArray;
let bufferLength;

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

fileInput.addEventListener('change', function () {
  if (audioCtx) {
    audioCtx.close();
  }

  const files = this.files;
  if (files.length === 0) return;

  const audioFile = files[0];
  const audioURL = URL.createObjectURL(audioFile);

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const audio = new Audio(audioURL);
  audio.crossOrigin = "anonymous";
  audio.loop = true;
  audio.play();

  source = audioCtx.createMediaElementSource(audio);
  analyser = audioCtx.createAnalyser();

  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  analyser.fftSize = 256;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  draw();
});

function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    const red = barHeight + 25;
    const green = 250 * (i / bufferLength);
    const blue = 50;

    ctx.fillStyle = `rgb(${red},${green},${blue})`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

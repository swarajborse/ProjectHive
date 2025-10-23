const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const workLength = 25 * 60; // 25 minutes in seconds
const breakLength = 5 * 60; // 5 minutes in seconds

let isRunning = false;
let isWorkSession = true;
let timeLeft = workLength;
let timerInterval;

function updateTimerDisplay(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  timerDisplay.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function switchSession() {
  isWorkSession = !isWorkSession;
  timeLeft = isWorkSession ? workLength : breakLength;
  updateTimerDisplay(timeLeft);
  alert(isWorkSession ? "Work session started! Focus!" : "Break time! Relax!");
}

function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimerDisplay(timeLeft);
  } else {
    switchSession();
  }
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(tick, 1000);
  }
});

pauseBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  isRunning = false;
  isWorkSession = true;
  timeLeft = workLength;
  updateTimerDisplay(timeLeft);
});

updateTimerDisplay(timeLeft);

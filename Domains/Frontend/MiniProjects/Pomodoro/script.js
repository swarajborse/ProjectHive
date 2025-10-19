let workDuration = 25;
let breakDuration = 5;
let timeLeft = workDuration * 60;
let isRunning = false;
let isWorkSession = true;
let timerInterval = null;
let sessionsCompleted = 0;
let totalFocusTime = 0;

const timerDisplay = document.getElementById("timerDisplay");
const timerLabel = document.getElementById("timerLabel");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const progressCircle = document.getElementById("progressCircle");
const workBadge = document.getElementById("workBadge");
const breakBadge = document.getElementById("breakBadge");

const circumference = 2 * Math.PI * 90;
progressCircle.style.strokeDasharray = circumference;

/**
 * Updates the timer display with formatted time and progress ring
 */
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const totalTime = isWorkSession ? workDuration * 60 : breakDuration * 60;
  const progress = 1 - timeLeft / totalTime;
  progressCircle.style.strokeDashoffset = circumference * (1 - progress);
}

/**
 * Updates the session badges and label
 */
function updateBadges() {
  if (isWorkSession) {
    workBadge.classList.add("active");
    breakBadge.classList.remove("active");
    timerLabel.textContent = "Work Session";
  } else {
    breakBadge.classList.add("active");
    workBadge.classList.remove("active");
    timerLabel.textContent = "Break Time";
  }
}

/**
 * Starts the timer countdown
 */
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startBtn.textContent = "Running";
  startBtn.disabled = true;
  pauseBtn.disabled = false;

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      completeSession();
    }
  }, 1000);
}

/**
 * Pauses the timer
 */
function pauseTimer() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(timerInterval);
  startBtn.textContent = "Resume";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

/**
 * Resets the timer to its initial state
 */
function resetTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  timeLeft = isWorkSession ? workDuration * 60 : breakDuration * 60;
  updateDisplay();
  startBtn.textContent = "Start";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

/**
 * Handles session completion and switches between work/break
 */
function completeSession() {
  clearInterval(timerInterval);
  isRunning = false;

  if (isWorkSession) {
    sessionsCompleted++;
    totalFocusTime += workDuration;
    document.getElementById("sessionsCompleted").textContent =
      sessionsCompleted;
    document.getElementById("focusTime").textContent = `${Math.floor(
      totalFocusTime / 60
    )}h`;
  }

  isWorkSession = !isWorkSession;
  timeLeft = isWorkSession ? workDuration * 60 : breakDuration * 60;
  updateDisplay();
  updateBadges();

  startBtn.textContent = "Start";
  startBtn.disabled = false;
  pauseBtn.disabled = true;

  playNotification();
}

/**
 * Applies new duration settings and resets the timer
 */
function applySettings() {
  const newWork = parseInt(document.getElementById("workDuration").value);
  const newBreak = parseInt(document.getElementById("breakDuration").value);

  if (newWork > 0 && newWork <= 60) workDuration = newWork;
  if (newBreak > 0 && newBreak <= 30) breakDuration = newBreak;

  resetTimer();
}

/**
 * Plays a notification sound when a session completes
 */
function playNotification() {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (e) {
    console.log("Audio notification not supported");
  }
}

// Initialize the timer display
updateDisplay();
updateBadges();

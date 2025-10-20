const timerDisplay = document.getElementById('timer-display');
const startStopBtn = document.getElementById('start-stop-btn');
const lapResetBtn = document.getElementById('lap-reset-btn');
const lapsList = document.getElementById('laps-list');

let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 1;

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTimer, 10); // Update every 10ms for centiseconds

        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.remove('start');
        startStopBtn.classList.add('stop');

        lapResetBtn.textContent = 'Lap';
        lapResetBtn.disabled = false;
        
        running = true;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('stop');
        startStopBtn.classList.add('start');

        lapResetBtn.textContent = 'Reset';
        
        running = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerDisplay.textContent = '00:00:00.00';
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('stop');
    startStopBtn.classList.add('start');

    lapResetBtn.textContent = 'Lap';
    lapResetBtn.disabled = true;

    difference = 0;
    running = false;
    lapCounter = 1;
    lapsList.innerHTML = '';
}

function updateTimer() {
    updatedTime = new Date().getTime() - startTime;
    timerDisplay.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    let centiseconds = Math.floor((time % 1000) / 10);

    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    centiseconds = String(centiseconds).padStart(2, '0');

    return `${minutes}:${seconds}:${centiseconds}`;
}

function addLap() {
    if (running) {
        const lapTime = timerDisplay.textContent;
        const li = document.createElement('li');
        li.innerHTML = `<span class="lap-label">Lap ${lapCounter}</span> <span>${lapTime}</span>`;
        lapsList.prepend(li);
        lapCounter++;
    }
}

startStopBtn.addEventListener('click', () => {
    if (running) {
        stopTimer();
    } else {
        startTimer();
    }
});

lapResetBtn.addEventListener('click', () => {
    if (running) {
        addLap();
    } else {
        resetTimer();
    }
});
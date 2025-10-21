const paragraphs = [
    "The quick brown fox jumps over the lazy dog while the sun sets behind the mountains painting the sky in shades of orange and purple.",
    "Technology advances rapidly changing how we live and work. Innovation drives progress and creates new opportunities for everyone to explore and grow.",
    "Practice makes perfect when learning new skills. Consistent effort and dedication lead to mastery over time with patience and perseverance.",
    "Nature provides endless inspiration with its beauty and complexity. From tiny insects to massive mountains everything connects in harmony.",
    "Music transcends language barriers bringing people together through rhythm and melody. Every culture contributes unique sounds to our world.",
    "Reading opens doors to new worlds and perspectives. Books transport us across time and space teaching valuable lessons along the journey.",
    "Creativity flourishes when we allow ourselves to think differently. Breaking free from conventional patterns leads to innovative solutions.",
    "Friendship enriches our lives with shared experiences and support. True connections withstand the test of time through ups and downs."
];

let currentText = '';
let startTime = null;
let isRacing = false;
let bestWpm = localStorage.getItem('typingRaceBestWpm') ? parseInt(localStorage.getItem('typingRaceBestWpm')) : 0;
let ghostInterval = null;
let ghostStartTime = null;

const textDisplay = document.getElementById('textDisplay');
const inputArea = document.getElementById('inputArea');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const wpmDisplay = document.getElementById('wpmDisplay');
const accuracyDisplay = document.getElementById('accuracyDisplay');
const timeDisplay = document.getElementById('timeDisplay');
const bestWpmDisplay = document.getElementById('bestWpmDisplay');
const resultsModal = document.getElementById('resultsModal');
const raceAgainBtn = document.getElementById('raceAgainBtn');
const playerProgress = document.getElementById('playerProgress');
const ghostProgress = document.getElementById('ghostProgress');
const playerPercent = document.getElementById('playerPercent');
const ghostPercent = document.getElementById('ghostPercent');

function initGame() {
    currentText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    displayText();
    updateBestDisplay();
}

function displayText() {
    textDisplay.innerHTML = currentText
        .split('')
        .map((char, i) => `<span class="char" data-index="${i}">${char}</span>`)
        .join('');
}

function startRace() {
    isRacing = true;
    startTime = Date.now();
    ghostStartTime = Date.now();
    inputArea.disabled = false;
    inputArea.value = '';
    inputArea.focus();
    startBtn.disabled = true;
    resetBtn.disabled = false;
    playerProgress.style.width = '0%';
    ghostProgress.style.width = '0%';
    
    if (bestWpm > 0) {
        startGhostRace();
    }
}

function startGhostRace() {
    const textLength = currentText.length;
    const charsPerSecond = (bestWpm * 5) / 60;
    
    ghostInterval = setInterval(() => {
        if (!isRacing) {
            clearInterval(ghostInterval);
            return;
        }
        
        const elapsed = (Date.now() - ghostStartTime) / 1000;
        const ghostChars = Math.floor(charsPerSecond * elapsed);
        const ghostProgressPercent = Math.min((ghostChars / textLength) * 100, 100);
        
        ghostProgress.style.width = ghostProgressPercent + '%';
        ghostPercent.textContent = Math.round(ghostProgressPercent) + '%';
        
        if (ghostProgressPercent >= 100) {
            clearInterval(ghostInterval);
        }
    }, 100);
}

function updateStats() {
    const typedText = inputArea.value;
    const elapsed = (Date.now() - startTime) / 1000;
    const chars = textDisplay.querySelectorAll('.char');
    
    let correctChars = 0;
    let totalTyped = typedText.length;
    
    chars.forEach((char, i) => {
        char.classList.remove('correct', 'incorrect', 'current');
        
        if (i < typedText.length) {
            if (typedText[i] === currentText[i]) {
                char.classList.add('correct');
                correctChars++;
            } else {
                char.classList.add('incorrect');
            }
        } else if (i === typedText.length) {
            char.classList.add('current');
        }
    });
    
    const words = correctChars / 5;
    const minutes = elapsed / 60;
    const wpm = Math.round(words / minutes) || 0;
    const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;
    
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy + '%';
    timeDisplay.textContent = elapsed.toFixed(1) + 's';
    
    const progressPercent = (typedText.length / currentText.length) * 100;
    playerProgress.style.width = progressPercent + '%';
    playerPercent.textContent = Math.round(progressPercent) + '%';
    
    if (typedText === currentText) {
        finishRace(wpm, accuracy);
    }
}

function finishRace(wpm, accuracy) {
    isRacing = false;
    inputArea.disabled = true;
    startBtn.disabled = false;
    resetBtn.disabled = false;
    
    if (ghostInterval) {
        clearInterval(ghostInterval);
    }
    
    const isNewRecord = wpm > bestWpm;
    if (isNewRecord) {
        bestWpm = wpm;
        localStorage.setItem('typingRaceBestWpm', wpm);
        updateBestDisplay();
    }
    
    showResults(wpm, accuracy, isNewRecord);
}

function showResults(wpm, accuracy, isNewRecord) {
    document.getElementById('finalWpm').textContent = wpm;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    
    const badge = document.getElementById('newRecordBadge');
    if (isNewRecord) {
        badge.innerHTML = '<div class="new-record">🎉 New Record!</div>';
    } else {
        badge.innerHTML = '';
    }
    
    resultsModal.classList.add('active');
}

function resetRace() {
    isRacing = false;
    startTime = null;
    ghostStartTime = null;
    inputArea.value = '';
    inputArea.disabled = true;
    startBtn.disabled = false;
    resetBtn.disabled = true;
    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '100%';
    timeDisplay.textContent = '0s';
    playerProgress.style.width = '0%';
    ghostProgress.style.width = '0%';
    playerPercent.textContent = '0%';
    ghostPercent.textContent = '0%';
    
    if (ghostInterval) {
        clearInterval(ghostInterval);
    }
    
    initGame();
}

function updateBestDisplay() {
    bestWpmDisplay.textContent = bestWpm > 0 ? bestWpm : '--';
}

startBtn.addEventListener('click', startRace);
resetBtn.addEventListener('click', resetRace);
raceAgainBtn.addEventListener('click', () => {
    resultsModal.classList.remove('active');
    resetRace();
});

inputArea.addEventListener('input', () => {
    if (isRacing) {
        updateStats();
    }
});

resultsModal.addEventListener('click', (e) => {
    if (e.target === resultsModal) {
        resultsModal.classList.remove('active');
    }
});

initGame();
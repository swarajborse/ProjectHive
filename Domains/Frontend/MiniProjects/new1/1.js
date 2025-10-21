
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const resultEl = document.getElementById('result');
const actionMessageEl = document.getElementById('action-message');
const choiceButtons = document.querySelectorAll('.choices button');
const playerChoiceBox = document.getElementById('player-choice-box');
const computerChoiceBox = document.getElementById('computer-choice-box');
const resetButton = document.getElementById('reset-button');


let playerScore = 0;
let computerScore = 0;
const choices = ['rock', 'paper', 'scissors'];
const emojiMap = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

choiceButtons.forEach(button => {
    button.addEventListener('click', () => handlePlayerChoice(button.id));
});

resetButton.addEventListener('click', resetGame);

function handlePlayerChoice(playerChoice) {
    toggleButtons(false);

    playerChoiceBox.classList.remove('visible');
    computerChoiceBox.classList.remove('visible');
    resultEl.classList.remove('visible');
    actionMessageEl.textContent = 'Computer is thinking...';
    playerChoiceEl.textContent = emojiMap[playerChoice];
    playerChoiceBox.classList.add('visible');

    setTimeout(() => {
        const computerChoice = getComputerChoice();
        computerChoiceEl.textContent = emojiMap[computerChoice];
        computerChoiceBox.classList.add('visible');

        const result = getResult(playerChoice, computerChoice);
        updateScore(result);

        displayResult(result);
        toggleButtons(true);
        
        resetButton.classList.add('visible');
    }, 1000);

/**
 * Generates a random choice for the computer.
 * @returns {string} - The computer's choice ('rock', 'paper', or 'scissors').
 */
function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

/**
 * Determines the winner of the round.
 * @param {string} player - The player's choice.
 * @param {string} computer - The computer's choice.
 * @returns {string} - The result message ('win', 'lose', or 'draw').
 */
function getResult(player, computer) {
    if (player === computer) {
        return 'draw';
    }
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }
    return 'lose';
}

/**
 * Updates the score based on the round result.
 * @param {string} result - The result of the round.
 */
function updateScore(result) {
    if (result === 'win') {
        playerScore++;
        playerScoreEl.textContent = playerScore;
    } else if (result === 'lose') {
        computerScore++;
        computerScoreEl.textContent = computerScore;
    }
}

/**
 * Displays the final result message and applies styling.
 * @param {string} result - The result of the round.
 */
function displayResult(result) {
    let message = '';
    switch(result) {
        case 'win':
            message = 'You Win!';
            break;
        case 'lose':
            message = 'You Lose!';
            break;
        case 'draw':
            message = "It's a Draw!";
            break;
    }
    resultEl.textContent = message;
    resultEl.className = `result-${result}`; // e.g., 'result-win'
    resultEl.classList.add('visible');
    actionMessageEl.textContent = 'Play again?';
}

/**
 * Resets the game to its initial state.
 */
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    resultEl.classList.remove('visible');
    playerChoiceBox.classList.remove('visible');
    computerChoiceBox.classList.remove('visible');
    actionMessageEl.textContent = 'Choose your weapon!';
    resetButton.classList.remove('visible');
}

/**
 * Enables or disables the choice buttons.
 * @param {boolean} enable - True to enable, false to disable.
 */
function toggleButtons(enable) {
    choiceButtons.forEach(button => {
        button.disabled = !enable;
    });
}
}
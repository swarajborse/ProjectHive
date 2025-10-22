const grid = document.getElementById("grid");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

let score = 0;
let timeLeft = 30;
let timerInterval;
let moleTimer;

function createGrid() {
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");

    const mole = document.createElement("div");
    mole.classList.add("mole");
    mole.textContent = "🐹"; // emoji mole 🐹

    // 🖱 Single click event only
    mole.addEventListener("click", () => {
      if (mole.classList.contains("up")) {
        score++;
        scoreEl.textContent = score;
        mole.classList.remove("up");
      }
    });

    hole.appendChild(mole);
    grid.appendChild(hole);
  }
}

function randomMole() {
  const moles = document.querySelectorAll(".mole");
  moles.forEach(m => m.classList.remove("up"));

  const randomIndex = Math.floor(Math.random() * moles.length);
  moles[randomIndex].classList.add("up");

  // hide mole after 700ms
  setTimeout(() => moles[randomIndex].classList.remove("up"), 700);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  clearInterval(timerInterval);
  clearInterval(moleTimer);

  moleTimer = setInterval(randomMole, 800);
  timerInterval = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  clearInterval(moleTimer);
  alert(`⏰ Time's up! Your score: ${score}`);
}

createGrid();
startBtn.addEventListener("click", startGame);

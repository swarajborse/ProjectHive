// --- DOM Elements ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreValueEl = document.getElementById("score-value");
const highScoreValueEl = document.getElementById("high-score-value");
const gameOverModal = document.getElementById("game-over-modal");
const finalScoreEl = document.getElementById("final-score");
const playAgainButton = document.getElementById("play-again-button");
const startOverlay = document.getElementById("start-overlay");

// --- Game Constants ---
const GRID_SIZE = 20; // Size of each cell
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const COLS = CANVAS_WIDTH / GRID_SIZE; // 30
const ROWS = CANVAS_HEIGHT / GRID_SIZE; // 20

// --- Game State ---
let snake, food, score, highScore, direction, gameLoopTimeout, gameRunning;

// --- Initialization ---
function init() {
    // Set canvas dimensions
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Initial game state
    snake = [{ x: 9, y: 9 }]; // Start snake
    score = 0;
    direction = { x: 0, y: 0 }; // Not moving
    gameRunning = false;

    // Load high score from local storage
    highScore = localStorage.getItem('neonSnakeHighScore') || 0;
    highScoreValueEl.textContent = highScore;
    scoreValueEl.textContent = score;

    // Hide game over modal, show start overlay
    gameOverModal.style.display = 'none';
    startOverlay.style.display = 'flex';

    placeFood();
    draw(); // Draw initial state (grid, snake, food)
}

// --- Main Game Loop ---
function gameLoop() {
    // Clear previous loop
    clearTimeout(gameLoopTimeout);
    if (!gameRunning) return; // Stop loop if game isn't running

    if (update()) {
        draw();
    }

    // Control game speed
    gameLoopTimeout = setTimeout(gameLoop, 100);
}

// --- Update Game State ---
function update() {
    if (direction.x === 0 && direction.y === 0) return true; // Don't update if not started

    // Move the snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check for collisions
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS || isCollidingWithSelf(head)) {
        resetGame();
        return false; // Stop update
    }

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreValueEl.textContent = score; // Update score in HTML
        placeFood();
    } else {
        snake.pop(); // Remove tail
    }
    return true; // Continue update
}

// --- Drawing Functions ---
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawFood();
    drawSnake();
    // We no longer draw score on canvas
}

function drawGrid() {
    ctx.strokeStyle = "#1a1a3a"; // Dark blue grid lines
    ctx.lineWidth = 1;
    for (let x = 0; x <= CANVAS_WIDTH; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
    }
    for (let y = 0; y <= CANVAS_HEIGHT; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
    }
}

function drawSnake() {
    snake.forEach((segment, index) => {
        if (index === 0) {
            // --- Draw Head ---
            ctx.fillStyle = "#00ff00"; // Bright neon green
            ctx.shadowColor = "#00ff00";
            ctx.shadowBlur = 10;
        } else {
            // --- Draw Body ---
            ctx.fillStyle = "#00cc00"; // Slightly darker green
            ctx.shadowColor = "#00ff00";
            ctx.shadowBlur = 5;
        }
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        
        // Add a highlight for 3D effect
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillRect(segment.x * GRID_SIZE + 2, segment.y * GRID_SIZE + 2, GRID_SIZE - 4, GRID_SIZE - 4);
    });
    // Reset shadow
    ctx.shadowBlur = 0;
}

function drawFood() {
    ctx.fillStyle = "#ff0040"; // Neon red/pink
    ctx.shadowColor = "#ff0040";
    ctx.shadowBlur = 15;
    
    // Draw a "glowing" circle
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2, // Center of the cell
        food.y * GRID_SIZE + GRID_SIZE / 2, // Center of the cell
        GRID_SIZE / 2 - 2, // Radius
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // Reset shadow
    ctx.shadowBlur = 0;
}

// --- Game Logic ---
function placeFood() {
    // Keep placing food until it's not on the snake
    while (true) {
        food = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS)
        };
        // Check if food is on the snake
        let onSnake = snake.some(segment => segment.x === food.x && segment.y === food.y);
        if (!onSnake) break;
    }
}

function isCollidingWithSelf(head) {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function resetGame() {
    gameRunning = false;
    
    // Check for new high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('neonSnakeHighScore', highScore);
        highScoreValueEl.textContent = highScore;
    }
    
    // Show "Game Over" modal
    finalScoreEl.textContent = score;
    gameOverModal.style.display = 'flex';
}

function startGame() {
    // Reset values and hide overlays
    snake = [{ x: 9, y: 9 }];
    score = 0;
    direction = { x: 0, y: 0 };
    scoreValueEl.textContent = score;
    
    gameOverModal.style.display = 'none';
    startOverlay.style.display = 'none';
    
    gameRunning = true;
    placeFood();
    gameLoop(); // Start the game loop!
}

// --- Event Listeners ---
document.addEventListener("keydown", event => {
    // Prevent page scrolling with arrow keys
    if (event.key.startsWith("Arrow")) {
        event.preventDefault();
    }

    // Start game on first arrow key press
    if (!gameRunning && gameOverModal.style.display === 'none') {
        // We only start if the game isn't running AND the game over modal isn't showing
        startGame();
    }

    // Update direction
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

playAgainButton.addEventListener("click", () => {
    // Reset everything and show the start overlay
    init();
});

// --- Start Everything ---
init();

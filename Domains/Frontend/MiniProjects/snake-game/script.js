const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 9, y: 9 }];
let food = { x: 5, y: 5 };
let score = 0;
let direction = { x: 0, y: 0 };

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 300);
}

function update() {
    // Move the snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }

    // Check for wall collisions
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || isCollidingWithSelf(head)) {
        resetGame();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawScore();
}

function drawSnake() {
    ctx.fillStyle = "#4CAF50";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
    });
}

function drawFood() {
    ctx.fillStyle = "#FF5722";
    ctx.beginPath();
    ctx.arc(food.x * 20 + 10, food.y * 20 + 10, 9, 0, Math.PI * 2);
    ctx.fill();
}

function drawScore() {
    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
    };
}

function isCollidingWithSelf(head) {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function resetGame() {
    snake = [{ x: 9, y: 9 }];
    score = 0;
    direction = { x: 0, y: 0 };
    placeFood();
}

document.addEventListener("keydown", event => {
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

gameLoop();

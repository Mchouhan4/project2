const gameArea = document.getElementById("game-area");
const target = document.getElementById("target");

const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over");

const startButton = document.getElementById("start-btn");
const retryButton = document.getElementById("retry-btn");

const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const accuracyDisplay = document.getElementById("accuracy");

const finalScore = document.getElementById("final-score");
const finalAccuracy = document.getElementById("final-accuracy");
const finalClicks = document.getElementById("final-clicks");

let score = 0;
let clicks = 0;
let hits = 0;
let timeLeft = 30;
let gameRunning = false;
let timer;

// Start game
startButton.addEventListener("click", startGame);
retryButton.addEventListener("click", startGame);

function startGame() {
    // Reset values
    score = 0;
    clicks = 0;
    hits = 0;
    timeLeft = 30;
    gameRunning = true;

    // Reset display
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    accuracyDisplay.textContent = "100%";

    // Hide screens
    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";

    // Show target
    target.style.display = "block";

    moveTarget();

    // Clear old timer
    clearInterval(timer);

    // Start countdown
    timer = setInterval(() => {
        timeLeft--;

        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Target clicked
target.addEventListener("click", function(event) {
    event.stopPropagation();

    if (!gameRunning) return;

    hits++;
    clicks++;

    // Increase score
    score += 10;

    scoreDisplay.textContent = score;

    updateAccuracy();

    // Move target
    moveTarget();
});

// Click anywhere in game area
gameArea.addEventListener("click", function(event) {

    if (!gameRunning) return;

    // Don't count target clicks twice
    if (event.target === target) return;

    clicks++;

    updateAccuracy();
});

// Move target to random position
function moveTarget() {

    const targetSize = target.offsetWidth;

    const maxX = gameArea.clientWidth - targetSize;
    const maxY = gameArea.clientHeight - targetSize;

    const x = Math.random() * maxX + targetSize / 2;
    const y = Math.random() * maxY + targetSize / 2;

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}

// Calculate accuracy
function updateAccuracy() {

    if (clicks === 0) {
        accuracyDisplay.textContent = "100%";
        return;
    }

    const accuracy = Math.round((hits / clicks) * 100);

    accuracyDisplay.textContent = `${accuracy}%`;
}

// End game
function endGame() {

    gameRunning = false;

    clearInterval(timer);

    target.style.display = "none";

    // Calculate final accuracy
    let accuracy = 0;

    if (clicks > 0) {
        accuracy = Math.round((hits / clicks) * 100);
    }

    // Show results
    finalScore.textContent = score;
    finalAccuracy.textContent = `${accuracy}%`;
    finalClicks.textContent = clicks;

    gameOverScreen.style.display = "flex";
}
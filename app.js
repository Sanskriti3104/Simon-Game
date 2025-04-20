const colorButtons = document.querySelectorAll(".color-button");
const scoreBoard = document.getElementById("score-value");
const startButton = document.getElementById("start-btn");
const popup = document.getElementById('popup');

let userTurn = false;
disableColorButtons(); 
let score = 0;
let randomColorPattern = [];
let userPattern = [];
let colors = ['red', 'green', 'blue', 'yellow'];
let highScore = localStorage.getItem("highScore") || 0;
document.querySelector("#high-score").textContent = highScore;

// Sounds
const redSound = new Audio("sounds/562760__ion__e3.mp3");
const greenSound = new Audio("sounds/562758__ion__c4.mp3");
const blueSound = new Audio("sounds/562752__ion__b3.mp3");
const yellowSound = new Audio("sounds/562761__ion__g3.mp3");
const gameOverSound = new Audio("sounds/173859__jivatma07__j1game_over_mono.wav");

// Function to disable click
function disableColorButtons() {
    colorButtons.forEach(button => {
        button.style.pointerEvents = "none"; 
    });
}

// Function to enable click
function enableColorButtons() {
    colorButtons.forEach(button => {
        button.style.pointerEvents = "auto";
    });
}

// Add click listener for start buttons
startButton.addEventListener('click', () => {
    startButton.classList.add('disabled');
    startButton.disabled = true;
    nextSequence();
    return;
})

//Generate next color in the sequence
function nextSequence() {
    userPattern = [];

    let randomColor = randomColorGenerator();
    randomColorPattern.push(randomColor);

    userTurn = false;
    disableColorButtons(); 

    // Flash each color in the pattern with delay
    let i = 0;
    const interval = setInterval(() => {
        flashButton(randomColorPattern[i]);
        i++;
        if (i >= randomColorPattern.length) {
            clearInterval(interval);
            userTurn = true;
            enableColorButtons();
        }
    }, 400);
}

// Add click listener for all buttons
colorButtons.forEach(button => {
    button.addEventListener('click', handleUserClick)
});

// Handles user's color clicks
function handleUserClick(event) {
    if (userTurn) {
        const userChosenColor = event.target.id;
        userPattern.push(userChosenColor);
        flashButton(userChosenColor);

        //Check the user's answer after each click
        checkPattern(userPattern.length - 1);
    }
}

// Generate one random color
function randomColorGenerator() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// flashes a button and plays its sound
function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.remove('flash');
    void button.offsetWidth; // Force reflow
    button.classList.add('flash');

    //flashes a button and plays its sound
    switch (color) {
        case "red":
            redSound.currentTime = 0;
            redSound.play();
            break;
        case "green":
            greenSound.currentTime = 0;
            greenSound.play();
            break;
        case "blue":
            blueSound.currentTime = 0;
            blueSound.play();
            break;
        case "yellow":
            yellowSound.currentTime = 0;
            yellowSound.play();
            break;
        default:
            break;
    }

    // Remove flash class after short delay
    setTimeout(() => {
        button.classList.remove('flash');
    }, 300);
}

// Check user's current input against the pattern
function checkPattern(currentIndex) {
    if (userPattern[currentIndex] === randomColorPattern[currentIndex]) {
        if (userPattern.length == randomColorPattern.length) {
            userTurn = false;
            disableColorButtons(); 
            score++;
            scoreUpdate(score);
            setTimeout(nextSequence, 800);
        }
    } else {
        gameOver();
    }
}

// Function to update score
function scoreUpdate(score) {
    scoreBoard.innerHTML = score;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        document.querySelector("#high-score").textContent = highScore;
    }
}

// Game Over state
function gameOver() {
    gameOverSound.currentTime = 0;
    gameOverSound.play();

    const gameContainer = document.getElementById('simon-game'); // Changed from 'content' to 'simon-game'
    popup.style.display = 'flex';
    gameContainer.classList.add('blur');

    setTimeout(() => {
        popup.style.display = 'none';
        gameContainer.classList.remove('blur');
        resetGame();
    }, 2000);
}

// Function to reset the game 
function resetGame() {
    startButton.classList.remove('disabled');
    startButton.disabled = false;
    score = 0;
    scoreUpdate(score);
    userTurn = false;
    disableColorButtons();
    randomColorPattern = [];
    userPattern = [];
}
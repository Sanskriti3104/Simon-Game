const statusText = document.getElementById("status-text");
const colorButtons = document.querySelectorAll(".color-button");
const scoreBoard = document.getElementById("score-value");

let startGame = false;
let level = 0;
let randomColorPattern = [];
let userPattern = [];
let colors = ['red','green','blue','yellow'];

// Add click listener for all buttons
colorButtons.forEach(button => {
    button.addEventListener('click',handleUserClick)
});

function handleUserClick(event){
    //Start the game on first click
    if(!startGame){
        startGame = true;
        nextSequence();
        return;
    }

    const userChosenColor = event.target.id;
    userPattern.push(userChosenColor);
    flashButton(userChosenColor);
    console.log("User Chosen Color : " + userChosenColor);

    checkPattern(userPattern.length - 1);
}

function nextSequence(){
    userPattern = [];
    level++;
    statusText.innerHTML = "LEVEL" + level;

    let randomColor = randomColorGenerator();
    randomColorPattern.push(randomColor);

    // Flash each color in the pattern with delay
    let i=0;
    const interval = setInterval(() => {
        flashButton(randomColorPattern[i]);
        console.log("Generated color : " + randomColorPattern[i]);
        i++;
        if(i >= randomColorPattern.length){
            clearInterval(interval);
        }
    },600);
}

// Generate one random color
function randomColorGenerator(){
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Flash the button
function flashButton(color){
    const button = document.getElementById(color);
    button.classList.remove('flash');
    void button.offsetWidth; // Force reflow
    button.classList.add('flash');
    setTimeout(()=>{
        button.classList.remove('flash');
    },300);
}

// Check user's current input against the pattern
function checkPattern(currentIndex){
    if(userPattern[currentIndex] === randomColorPattern[currentIndex]){
        if(userPattern.length == randomColorPattern.length){
            setTimeout(nextSequence,1000);
        }
    }else{
        gameOver();
    }
}

// Game Over logic
function gameOver() {
    statusText.innerHTML = "Game Over!";
    document.getElementById("game-over-popup").classList.remove("hidden");
    startGame = false;
    level = 0;
    randomColorPattern = [];
    userPattern =[];
}
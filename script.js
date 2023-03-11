let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let left = document.querySelector(".left");
let bottom = document.querySelector(".bottom");
let right = document.querySelector(".right");
let up = document.querySelector(".top");
let width = 15;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", control);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replay);
});

const createBoard = () => {
    popup.style.display = "none";
    for (let i = 0; i < 225; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
    }
}

const startGame = () => {
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares);
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 800;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
}

const moveOutcome = function () {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        alert("Game Over!🐍");
        popup.style.display = "flex";
        return clearInterval(interval);
    }
    else {
        moveSnake(squares);
    }
}


const moveSnake = (squares) => {
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
}


const checkForHits = function (squares) {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true;
    } else {
        return false;
    }
}

const eatApple = (squares, tail) => {
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        scoreDisplay.textContent = score;
    }
}

function randomApple(squares) {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    }
    while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}


function control(e) {
    if (e.keyCode === 39) {
        direction = 1;
    }
    else if (e.keyCode === 38) {
        direction = -width;
    }
    else if (e.keyCode === 37) {
        direction = -1
    }
    else if (e.keyCode === 40) {
        direction = width;
    }
}

// buttons function
up.addEventListener("click", () => (direction = -width));
bottom.addEventListener("click", () => (direction = +width));
left.addEventListener("click", () => (direction = -1));
right.addEventListener("click", () => (direction = 1));

const replay = function () {
    grid.innerHTML = "";
    score = 0;
    createBoard();
    startGame();
    popup.style.display = "none";
}

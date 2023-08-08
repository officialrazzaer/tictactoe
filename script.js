"use strict";

// constant variables for html calling. name well
const homeScreen = document.querySelector(".container");
const scoreBoard = document.querySelector(".scoreboard");

const board = document.querySelector(".board");

const startButton = document.querySelector(".start-game");
const humanOneButton = document.getElementById("human-one");
const humanTwoButton = document.getElementById("human-two");
const aiOneButton = document.getElementById("ai-one");
const aiTwoButton = document.getElementById("ai-two");
const startButtons = document.querySelectorAll(".selection");

const resetButton = document.getElementById("reset-button");
const resetPopup = document.getElementById("reset-popup");

// create conditions for when the game board is created otherwise isn't. it will be added to creation so that if the conditions are met it runs otherwise it is not run
let humanOneButtonClicked = false;
let humanTwoButtonClicked = false;
let aiOneButtonClicked = false;
let aiTwoButtonClicked = false;
// Define and set the start variable to true
let start = false;
let p1Moved = false;

// set which players are active

const startGame = function () {
  if (humanOneButtonClicked && aiTwoButtonClicked) {
    console.log("human 1 and ai 2 chosen");
    start = true;
  } else if (humanOneButtonClicked && humanTwoButtonClicked) {
    console.log("human 1 and human 2 chosen");
    start = true;
  } else if (humanTwoButtonClicked && aiOneButtonClicked) {
    console.log("human two and ai 1 chosen");
    start = true;
  } else if (aiOneButtonClicked && aiTwoButtonClicked) {
    console.log("ai one and ai two chosen");
    start = true;
  } else {
    console.log("only 1 is chosen");
  }
};

function handleButton1Click() {
  humanOneButtonClicked = true;
  humanOneButton.style.backgroundColor = "rgb(82, 27, 27)";
  aiOneButton.disabled = true;
  startGame();
}

function handleButton2Click() {
  humanTwoButtonClicked = true;
  humanTwoButton.style.backgroundColor = "rgb(82, 27, 27)";
  aiTwoButton.disabled = true;
  startGame();
}

function handleButton3Click() {
  aiOneButtonClicked = true;
  aiOneButton.style.backgroundColor = "rgb(82, 27, 27)";
  startGame();
}

function handleButton4Click() {
  aiTwoButtonClicked = true;
  aiTwoButton.style.backgroundColor = "rgb(82, 27, 27)";
  humanTwoButton.disabled = true;
  startGame();
}

// startButton.addEventListener("click", createGameboard);

humanOneButton.addEventListener("click", handleButton1Click);
humanTwoButton.addEventListener("click", handleButton2Click);
aiOneButton.addEventListener("click", handleButton3Click);
aiTwoButton.addEventListener("click", handleButton4Click);

// creates the gameboard
const createGameboard = function () {
  if (start === true) {
    for (let i = 0; i < 9; i++) {
      const createBoardItem = document.createElement("div");
      createBoardItem.className = `board-item board-item-${i + 1}`;
      board.appendChild(createBoardItem);
    }
    toggleHomeScreen();
    move();
  }
};

startButton.addEventListener("click", createGameboard);

function toggleHomeScreen() {
  homeScreen.classList.toggle("hidden");
}

// create game functionality
// create a function to draw X and a function to draw O

function move() {
  const boardItems = document.querySelectorAll(".board-item");
  if (p1Moved === false) {
    boardItems.forEach((item) => {
      item.addEventListener("click", drawMove);
    });
  }
}

function drawMove() {
  if (winner) {
    return;
  } else if (p1Moved === false) {
    if (this.textContent === "") {
      this.textContent = "X";
      p1Moved = true;
      console.log(p1Moved);
      if (!isWinner()) {
        isWinner();
        aiMove();
      }
    }
    console.log(winner);
  }
}

// create a function to draw a random move such as X or O depending on which pieces were chosen
function aiMove() {
  if (winner) {
    return;
  }
  const boardItems = document.querySelectorAll(".board-item");
  const emptySquares = Array.from(boardItems).filter(
    (item) => item.textContent === ""
  );

  function humanMoveSecond(event) {
    const clickedItem = event.target;
    console.log("Content of clicked item:", clickedItem.textContent);
    console.log("we entered");
    console.log(p1Moved);
    if (clickedItem.textContent === "") {
      clickedItem.textContent = "O";
      console.log("we work");
      p1Moved = false;
      isWinner();
    }
  }

  if (humanOneButtonClicked && humanTwoButtonClicked) {
    boardItems.forEach((item) => {
      item.addEventListener("click", humanMoveSecond);
    });
  } else {
    p1Moved = false;
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    emptySquares[randomIndex].textContent = "O";
    isWinner();
  }

  if (emptySquares.length === 0) {
    // No empty squares left, the game is a draw
    winner = true;
    console.log("It's a Draw!");
    scoreBoard.textContent = "It was a draw";
    // scoreBoard.classList.toggle("hidden");
    resetPopup.classList.add("show");
    return true;
  }

  isWinner();
}

function isSquareFilled(squareNumber) {
  const boardItem = document.querySelector(`.board-item-${squareNumber + 1}`);
  return boardItem.textContent === "X" || boardItem.textContent === "O";
}

// create a function to apply to which options were chosen
// create winning mechanics
let winner = false;

function isWinner() {
  const boardItems = document.querySelectorAll(".board-item");

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    const symbolA = boardItems[a].textContent;
    const symbolB = boardItems[b].textContent;
    const symbolC = boardItems[c].textContent;
    if (symbolA && symbolA === symbolB && symbolB === symbolC) {
      // If the symbols are equal and not empty, we have a winner
      winner = true;
      console.log("we have a winner");
      scoreBoard.textContent = "There is a winner!";
      scoreBoard.classList.toggle("hidden");
      resetPopup.classList.add("show");
      return true;
    }
  }

  let contentsLength = 0;
  for (let i = 0; i < 9; i++) {
    const isThereSquareContents = boardItems[i].textContent;
    if (isThereSquareContents === "X" || isThereSquareContents === "O") {
      contentsLength += 1;
      if (contentsLength === 9) {
        winner = true;
        console.log("It's a Draw!");
        scoreBoard.textContent = "It was a draw";
        scoreBoard.classList.toggle("hidden");
        resetPopup.classList.add("show");
      }
    }
  }
  return false;
}

// add a popup for reset after winner is chosen or draw, toggle to homescreen, remove board
resetButton.addEventListener("click", () => {
  resetPopup.classList.remove("show");
  const boardItems = document.querySelectorAll(".board-item");
  boardItems.forEach((item) => {
    board.removeChild(item);
  });
  scoreBoard.textContent = "";
  scoreBoard.classList.toggle("hidden");
  winner = false;
  startButtons.forEach((button) => {
    button.style.backgroundColor = "#45a049";
  });
  p1Moved = false;
  aiOneButton.disabled = false;
  aiTwoButton.disabled = false;
  humanOneButton.disabled = false;
  humanTwoButton.disabled = false;

  humanOneButtonClicked = false;
  humanTwoButtonClicked = false;
  aiOneButtonClicked = false;
  aiTwoButtonClicked = false;

  toggleHomeScreen();
});

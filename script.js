"use strict";

let currentUser = "X";
let gameActivity = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const buttonRestart = document.querySelector(".game--restart");
const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector(".game--status");

function determinationOfTheWinner() {
  for (let index = 0; index < winningLines.length; ++index) {
    const element = winningLines[index];
    const a = gameState[element[0]];
    const b = gameState[element[1]];
    const c = gameState[element[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      gameActivity = false;
      gameStatus.innerHTML = `Player ${currentUser} has won!`;
      return;
    }
  }
  changeUser();
  if (!gameState.includes("")) {
    gameStatus.innerHTML = `Game ended in a draw!`;
    gameActivity = false;
  }
}

function changeUser() {
  currentUser === "X" ? (currentUser = "O") : (currentUser = "X");
  gameStatus.innerHTML = `It's ${currentUser}'s turn`;
}

function handleClick(event) {
  const numCell = event.target.dataset.cellIndex;
  console.log(numCell);
  if (!gameActivity || gameState[numCell] !== "") {
    return;
  }
  gameState[numCell] = currentUser;
  cells[numCell].textContent = currentUser;
  determinationOfTheWinner();
}

buttonRestart.addEventListener("click", function () {
  currentUser = "X";
  gameActivity = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = `It's ${currentUser}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
});

cells.forEach((cell) => cell.addEventListener("click", handleClick));

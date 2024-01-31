// Function to update the timer display
function updateTimer(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  document.getElementById('timer').textContent = formattedTime;
}
let totalSeconds = 0;
// Function to start the timer
function startTimer() {
  // Update the timer display every second
  timerInterval = setInterval(() => {
    totalSeconds++;
    updateTimer(totalSeconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Start the timer when the page loads
window.onload = startTimer;

// Function to restart the game when clicked
function restartGame() {
  var confirmation = confirm("Are you sure you want to restart the game?");

  if (confirmation) {
    window.location.reload();
  }
  else {
    return;
  }
}

// Using an array to represent the board state
const board = [
  null, 0, null, 1, null, 2, null, 3,
  4, null, 5, null, 6, null, 7, null,
  null, 8, null, 9, null, 10, null, 11,
  null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null,
  12, null, 13, null, 14, null, 15, null,
  null, 16, null, 17, null, 18, null, 19,
  20, null, 21, null, 22, null, 23, null
]

// Parses pieceId's and returns the index of that piece
let findPiece = function (pieceId) {
  let parsed = parseInt(pieceId);
  return board.indexOf(parsed);
};

// DOM
const cells = document.querySelectorAll("td");
let whitesPieces = document.querySelectorAll("p");
let blacksPieces = document.querySelectorAll("span")
const whiteTurnText = document.querySelectorAll(".white-turn-text");
const blackTurnText = document.querySelectorAll(".black-turn-text");

// Player properties and initialization of variables
let turn = true;
let whitePieceCount = 12;
let blackPieceCount = 12;
let playerPieces;
let whiteScore = 0;
let blackScore = 0;

// Properties of selected pieces
let selectedPiece = {
  pieceId: -1,
  selectedPieceIndex: -1,
  isKing: false,
  space7: false,
  space9: false,
  space14: false,
  space18: false,
  minusspace7: false,
  minusspace9: false,
  minusspace14: false,
  minusspace18: false
}

// Initialize event listeners
function givePiecesEventListeners() {
  if (turn) {
    for (let i = 0; i < whitesPieces.length; i++) {
      whitesPieces[i].addEventListener("click", getPlayerPieces);
    }
  } else {
    for (let i = 0; i < blacksPieces.length; i++) {
      blacksPieces[i].addEventListener("click", getPlayerPieces);
    }
  }
}


// MAIN LOGIC
function trackScore(pieceCaptured, newKing) {
  const pointsForCapture = 10;
  const pointsForKing = 20;
  const pointsForWin = 1000;

  if (pieceCaptured) {
    if (turn) {
      whiteScore += pointsForCapture;
    }
    else {
      blackScore += pointsForCapture;
    }
  }

  if (newKing) {
    if (turn) {
      whiteScore += pointsForKing;
    }
    else {
      blackScore += pointsForKing;
    }
  }

  if (blackPieceCount === 0) {
    whiteScore += pointsForWin;
  }

  if (whitePieceCount === 0) {
    blackScore += pointsForWin;
  }

  document.getElementById('whiteScore').textContent = whiteScore;
  document.getElementById('blackScore').textContent = blackScore;
}

function getPlayerPieces() {
  if (turn) {
    playerPieces = whitesPieces;
  } else {
    playerPieces = blacksPieces;
  }
  removeCellonclick();
  resetBorders();
}

// reselecting a piece
function removeCellonclick() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeAttribute("onclick");
  }
}

function resetBorders() {
  for (let i = 0; i < playerPieces.length; i++) {
    playerPieces[i].style.border = "2px solid gray";
  }
  resetSelectedPieceProperties();
  getSelectedPiece();
}

// resets the properties of selected piece
function resetSelectedPieceProperties() {
  selectedPiece.pieceId = -1;
  selectedPiece.isKing = false;
  selectedPiece.space7 = false;
  selectedPiece.space9 = false;
  selectedPiece.space14 = false;
  selectedPiece.space18 = false;
  selectedPiece.minusspace7 = false;
  selectedPiece.minusspace9 = false;
  selectedPiece.minusspace14 = false;
  selectedPiece.minusspace18 = false;
}

// retrieves ID and Index of piece relative to board position
function getSelectedPiece() {
  selectedPiece.pieceId = parseInt(event.target.id);
  selectedPiece.selectedPieceIndex = findPiece(selectedPiece.pieceId);
  isPieceKing();
}

// checks if selected piece is a king
function isPieceKing() {
  if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
    selectedPiece.isKing = true;
  } else {
    selectedPiece.isKing = false;
  }
  getPossibleMoves();
}

// gets the possible moves a selected piece is able to make
function getPossibleMoves() {
  if (board[selectedPiece.selectedPieceIndex + 7] === null &&
    cells[selectedPiece.selectedPieceIndex + 7].classList.contains("empty") !== true) {
    selectedPiece.space7 = true;
  }
  if (board[selectedPiece.selectedPieceIndex + 9] === null &&
    cells[selectedPiece.selectedPieceIndex + 9].classList.contains("empty") !== true) {
    selectedPiece.space9 = true;
  }
  if (board[selectedPiece.selectedPieceIndex - 7] === null &&
    cells[selectedPiece.selectedPieceIndex - 7].classList.contains("empty") !== true) {
    selectedPiece.minusspace7 = true;
  }
  if (board[selectedPiece.selectedPieceIndex - 9] === null &&
    cells[selectedPiece.selectedPieceIndex - 9].classList.contains("empty") !== true) {
    selectedPiece.minusspace9 = true;
  }
  getLegalJumps();
}

// gets the possible moves where the piece is able to jump by looking at indexes forward (or backwards) in the board array
function getLegalJumps() {
  if (turn) {
    if (board[selectedPiece.selectedPieceIndex + 14] === null
      && cells[selectedPiece.selectedPieceIndex + 14].classList.contains("empty") !== true
      && board[selectedPiece.selectedPieceIndex + 7] >= 12) {
      selectedPiece.space14 = true;
    }
    if (board[selectedPiece.selectedPieceIndex + 18] === null
      && cells[selectedPiece.selectedPieceIndex + 18].classList.contains("empty") !== true
      && board[selectedPiece.selectedPieceIndex + 9] >= 12) {
      selectedPiece.space18 = true;
    }
    if (board[selectedPiece.selectedPieceIndex - 14] === null
      && cells[selectedPiece.selectedPieceIndex - 14].classList.contains("empty") !== true
      && board[selectedPiece.selectedPieceIndex - 7] >= 12) {
      selectedPiece.minusspace14 = true;
    }
    if (board[selectedPiece.selectedPieceIndex - 18] === null
      && cells[selectedPiece.selectedPieceIndex - 18].classList.contains("empty") !== true
      && board[selectedPiece.selectedPieceIndex - 9] >= 12) {
      selectedPiece.minusspace18 = true;
    }
  } else {
    if (board[selectedPiece.selectedPieceIndex + 14] === null
      && cells[selectedPiece.selectedPieceIndex + 14].classList.contains("empty") !== true
      && board[selectedPiece.selectedPieceIndex + 7] < 12 && board[selectedPiece.selectedPieceIndex + 7] !== null) {
      selectedPiece.space14 = true;
    }
    if (board[selectedPiece.selectedPieceIndex + 18] === null
      && cells[selectedPiece.selectedPieceIndex + 18].classList.contains("empty") !== true
      && board[selectedPiece.selectedPieceIndex + 9] < 12 && board[selectedPiece.selectedPieceIndex + 9] !== null) {
      selectedPiece.space18 = true;
    }
    if (board[selectedPiece.selectedPieceIndex - 14] === null && cells[selectedPiece.selectedPieceIndex - 14].classList.contains("empty") !== true
      && board[selectedPiece.selectedPieceIndex - 7] < 12
      && board[selectedPiece.selectedPieceIndex - 7] !== null) {
      selectedPiece.minusspace14 = true;
    }
    if (board[selectedPiece.selectedPieceIndex - 18] === null && cells[selectedPiece.selectedPieceIndex - 18].classList.contains("empty") !== true
      && board[selectedPiece.selectedPieceIndex - 9] < 12
      && board[selectedPiece.selectedPieceIndex - 9] !== null) {
      selectedPiece.minusspace18 = true;
    }
  }
  checkPieceConditions();
}

// Restricts movement if the given piece is a king
function checkPieceConditions() {
  if (selectedPiece.isKing) {
    highlightPiece();
  } else {
    if (turn) {
      selectedPiece.minusspace7 = false;
      selectedPiece.minusspace9 = false;
      selectedPiece.minusspace14 = false;
      selectedPiece.minusspace18 = false;
    } else {
      selectedPiece.space7 = false;
      selectedPiece.space9 = false;
      selectedPiece.space14 = false;
      selectedPiece.space18 = false;
    }
    highlightPiece();
  }
}

// Highlights a piece, indicating that it is movable
function highlightPiece() {
  if (selectedPiece.space7 || selectedPiece.space9 || selectedPiece.space14 || selectedPiece.space18
    || selectedPiece.minusspace7 || selectedPiece.minusspace9 || selectedPiece.minusspace14 || selectedPiece.minusspace18) {
    document.getElementById(selectedPiece.pieceId).style.border = "3px solid green";
    giveCellsClick();
  } else {
    return;
  }
}

// Gives cells a click attribute based on legal moves
function giveCellsClick() {
  if (selectedPiece.space7) {
    cells[selectedPiece.selectedPieceIndex + 7].setAttribute("onclick", "makeMove(7)");
  }
  if (selectedPiece.space9) {
    cells[selectedPiece.selectedPieceIndex + 9].setAttribute("onclick", "makeMove(9)");
  }
  if (selectedPiece.space14) {
    cells[selectedPiece.selectedPieceIndex + 14].setAttribute("onclick", "makeMove(14)");
  }
  if (selectedPiece.space18) {
    cells[selectedPiece.selectedPieceIndex + 18].setAttribute("onclick", "makeMove(18)");
  }
  if (selectedPiece.minusspace7) {
    cells[selectedPiece.selectedPieceIndex - 7].setAttribute("onclick", "makeMove(-7)");
  }
  if (selectedPiece.minusspace9) {
    cells[selectedPiece.selectedPieceIndex - 9].setAttribute("onclick", "makeMove(-9)");
  }
  if (selectedPiece.minusspace14) {
    cells[selectedPiece.selectedPieceIndex - 14].setAttribute("onclick", "makeMove(-14)");
  }
  if (selectedPiece.minusspace18) {
    cells[selectedPiece.selectedPieceIndex - 18].setAttribute("onclick", "makeMove(-18)");
  }
}

// makes move
function makeMove(number) {
  document.getElementById(selectedPiece.pieceId).remove();
  cells[selectedPiece.selectedPieceIndex].innerHTML = "";
  if (turn) {
    if (selectedPiece.isKing) {
      cells[selectedPiece.selectedPieceIndex + number].innerHTML = `<p class="white-piece king" id="${selectedPiece.pieceId}"></p>`;
      whitesPieces = document.querySelectorAll("p");
    } else {
      cells[selectedPiece.selectedPieceIndex + number].innerHTML = `<p class="white-piece" id="${selectedPiece.pieceId}"></p>`;
      whitesPieces = document.querySelectorAll("p");
    }
  } else {
    if (selectedPiece.isKing) {
      cells[selectedPiece.selectedPieceIndex + number].innerHTML = `<span class="black-piece king" id="${selectedPiece.pieceId}"></span>`;
      blacksPieces = document.querySelectorAll("span");
    } else {
      cells[selectedPiece.selectedPieceIndex + number].innerHTML = `<span class="black-piece" id="${selectedPiece.pieceId}"></span>`;
      blacksPieces = document.querySelectorAll("span");
    }
  }

  let indexOfPiece = selectedPiece.selectedPieceIndex
  if (number === 14 || number === 18 || number === -14 || number === -18) {
    changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
  } else {
    changeData(indexOfPiece, indexOfPiece + number);
  }
}

function updatePlayerPieceCounts() {
  document.getElementById('playerWhitePieces').textContent = whitePieceCount;
  document.getElementById('playerBlackPieces').textContent = blackPieceCount;
}

// Changes the board state
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
  board[indexOfBoardPiece] = null;
  board[modifiedIndex] = parseInt(selectedPiece.pieceId);
  if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
    document.getElementById(selectedPiece.pieceId).classList.add("king");
    trackScore(false, true);
  }
  if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
    document.getElementById(selectedPiece.pieceId).classList.add("king");
    trackScore(false, true);
  }
  if (removePiece) {
    board[removePiece] = null;
    if (turn && selectedPiece.pieceId < 12) {
      cells[removePiece].innerHTML = "";
      blackPieceCount--;
      trackScore(true, false);
    }
    if (turn === false && selectedPiece.pieceId >= 12) {
      cells[removePiece].innerHTML = "";
      whitePieceCount--;
      trackScore(true, false);
    }
  }
  updatePlayerPieceCounts();
  resetSelectedPieceProperties();
  removeCellonclick();
  removeEventListeners();
}

function removeEventListeners() {
  if (turn) {
    for (let i = 0; i < whitesPieces.length; i++) {
      whitesPieces[i].removeEventListener("click", getPlayerPieces);
    }
  } else {
    for (let i = 0; i < blacksPieces.length; i++) {
      blacksPieces[i].removeEventListener("click", getPlayerPieces);
    }
  }
  checkForWin();
}

// Checks if a player has won, if yes, sends data to server for updating
function checkForWin() {
  if (blackPieceCount === 0) { // if player 1 wins
    for (let i = 0; i < blackTurnText.length; i++) {
      blackTurnText[i].style.display = "none";
    }
    alert("WHITE WINS!");
    sendData();
    stopTimer();
  }
  else if (whitePieceCount === 0) { // if player 2 wins
    for (let i = 0; i < whiteTurnText.length; i++) {
      whiteTurnText[i].style.display = "none";
    }
    alert("BLACK WINS!");
    sendData();
    stopTimer();
  }
  changePlayer();
}

// Switches players turn
function changePlayer() {
  if (turn) {
    turn = false;
    for (let i = 0; i < whiteTurnText.length; i++) {
      whiteTurnText[i].style.display = "none";
      blackTurnText[i].style.display = "block";
    }
  } else {
    turn = true;
    for (let i = 0; i < blackTurnText.length; i++) {
      blackTurnText[i].style.display = "none";
      whiteTurnText[i].style.display = "block";
    }
  }
  givePiecesEventListeners();
}

function sendData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText); // Output the response from PHP
    }
  };
  xhttp.open("POST", "updateuser.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("whitePieceCount=" + whitePieceCount + "&totalSeconds=" + totalSeconds);
}

givePiecesEventListeners();
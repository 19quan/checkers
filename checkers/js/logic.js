const cells = document.querySelectorAll("td");
let whitePieces = document.querySelectorAll("p");
let blackPieces = document.querySelectorAll("span");

//play properties
let turn = true;
let whiteScore = 12;
let blackScore = 12;
let playerPieces;

// selected piece properties
let selectedPiece = {
  pieceId: -1,
  indexOfBoardPiece: -1,
  isKing: false,
  seventhSpace: false,
  ninthSpace: false,
  fourteenthSpace: false,
  eighteenthSpace: false,
  minusSeventhSpace: false,
  minusNinthSpace: false,
  minusFourteenthSpace: false,
  minusEighteenthSpace: false
}

// create a 2d matrix to represent the board state
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

// finds the piece's id and returns the index of the piece in the matrix
function findPiece(pieceID) {
  return board.indexOf(parseInt(pieceID));
}

function getPieces() {
  if (turn) {
    playerPieces = whitePieces;
  }
  else {
    playerPieces = blackPieces;
  }
  removePieceAfterClick()
}

function removePieceAfterClick() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeAttribute("onclick");
  }
}

function resetBorders() {
  for (let i = 0; i < playerPieces.length; i++) {
    playerPieces[i].style.border = "2px solid gray";
  }
  resetPieceProperties();
  //getSpecificPiece();
}

function resetPieceProperties() {
  selectedPiece.pieceId = -1;
  selectedPiece.indexOfBoardPiece = -1;
  selectedPiece.isKing = false;
  selectedPiece.seventhSpace = false;
  selectedPiece.ninthSpace = false;
  selectedPiece.fourteenthSpace = false;
  selectedPiece.eighteenthSpace = false;
  selectedPiece.minusSeventhSpace = false;
  selectedPiece.minusNinthSpace = false;
  selectedPiece.minusFourteenthSpace = false;
  selectedPiece.minusEighteenthSpace = false;
}

function piecesEventListener() {
  if (turn) {
    for (let i = 0; i < whitePieces.length; i++) {
      whitePieces[i].addEventListener("click", getPlay)
    }
  }
}
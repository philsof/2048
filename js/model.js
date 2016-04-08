function Game(board) {
  if (board) {
    this.board = board;
  } 
  else { 
    this.board = this.generateStartingBoard();
  }
  this.previousBoard = [];
  this.score = this.generateStartingScore();
}

Game.prototype.generateStartingScore = function () {
  if (this.savedScoreExists()){
    return parseInt(localStorage.score);
  } else {
    return 0;
  }
};

Game.prototype.savedScoreExists = function () {
  if (localStorage.score){
    return true;
  } else {
    return false;
  }
};

Game.prototype.savedBoardExists = function () {
  if (localStorage.board){
    return true;
  } else {
    return false;
  }
};

Game.prototype.loadSavedBoard = function(){
  if (localStorage.board){
    return JSON.parse(localStorage.board);
  }
};

Game.prototype.generateStartingBoard = function(){
  var generatedBoard, spawnValues, boardCoordinates;
  
  if (this.savedBoardExists()){
    return this.loadSavedBoard();
  }
  
  generatedBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  boardCoordinates = [];
  
  for (var k = 0; k < generatedBoard.length; k++) {
    for (var m = 0; m < generatedBoard[k].length; m++) {
      boardCoordinates.push([k,m]);
    }
  }
  shuffle(boardCoordinates);
  
  spawnValues = [2,2,2,2,2,2,2,2,2,4];
  shuffle(spawnValues);

  generatedBoard[boardCoordinates[0][0]][boardCoordinates[0][1]] = spawnValues[0];
  generatedBoard[boardCoordinates[1][0]][boardCoordinates[1][1]] = spawnValues[1];

  return generatedBoard;
};

Game.prototype.reverseBoard = function(){
  for(var i = 0; i < this.board.length; i++) {
    this.board[i].reverse();
  }
};

Game.prototype.moveTiles = function(direction){
  // store board before move, to determine if move changes board
  this.previousBoard = JSON.parse(JSON.stringify(this.board));

  if (direction === "left"){
    this.mergeTilesLeft();
  }
  if (direction === "right"){
    this.reverseBoard();
    this.mergeTilesLeft();
    this.reverseBoard();
  }  
  if (direction === "up"){
    this.transposeBoard();
    this.mergeTilesLeft();
    this.transposeBoard();
  }  
  if (direction === "down"){
    this.transposeBoard();
    this.reverseBoard();
    this.mergeTilesLeft();
    this.reverseBoard();
    this.transposeBoard();
  }  
};

Game.prototype.mergeTilesLeft = function(){
  var newRow, board = this.board;
  this.cleanBoard();
  for(var i = 0; i < board.length; i++) {
    newRow = [];
    if (board[i].length > 1){
      if (board[i].length === 2){
        if (board[i][0] === board[i][1]){
          newRow.push(board[i][0] * 2);
          this.score += board[i][0] * 2;
        } else {
          newRow = board[i];
        }
      } else if (board[i].length === 3) {
        if (board[i][0] === board[i][1]){
          newRow.push(board[i][0] * 2, board[i][2]);
          this.score += board[i][0] * 2;
        } else if (board[i][1] === board[i][2]){
          newRow.push(board[i][0], board[i][1] * 2);
          this.score += board[i][1] * 2;
        } else {
          newRow = board[i];
        }
      } else if (board[i].length === 4){
        if (board[i][0] === board[i][1]){
          newRow.push(board[i][0] * 2);
          this.score += board[i][0] * 2;
          if (board[i][2] === board[i][3]){
            newRow.push(board[i][2] * 2);
            this.score += board[i][2] * 2;
          } else {
            newRow.push(board[i][2], board[i][3]);
          }
        } else if (board[i][1] === board[i][2]){
          newRow.push(board[i][0], board[i][1] * 2, board[i][3]);
          this.score += board[i][1] * 2;
        } else if (board[i][2] === board[i][3]){
          newRow.push(board[i][0], board[i][1], board[i][2] * 2);
          this.score += board[i][2] * 2;
        } else {
          newRow = board[i];
        }
      }
      this.board[i] = newRow;
    }
  } 
  this.padBoard();
};
    
Game.prototype.cleanBoard = function(){
  var board = this.board;
  for(var i = 0; i < board.length; i++) {
    for(var j = board[i].length - 1; j >= 0; j--) {
      if(board[i][j] === 0) {
         board[i].splice(j, 1);
      }
    }
  }
  this.board = board;
};

Game.prototype.padBoard = function(){
  var board = this.board;
  for(var i = 0; i < board.length; i++) {
    while (board[i].length < 4){
      board[i].push(0); 
    }
  }
  this.board = board;
};

Game.prototype.spawn = function(){
  var board = this.board, previousBoard = this.previousBoard, emptyTileCoordinates = [];
  if (board.equals(previousBoard)){
    return;
  }
  if (this.isBoardFull()) {
    return;
  }
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0){
        emptyTileCoordinates.push([i, j]);
      }
    }
  }
  shuffle(emptyTileCoordinates);
  board[emptyTileCoordinates[0][0]][emptyTileCoordinates[0][1]] = 2;
  this.board = board;
};

Game.prototype.isWon = function() {
  for(var i = 0; i < this.board.length; i++) {
    if (this.board[i].includes(2048)) {
      return true;
    }
  }
  return false;
};

Game.prototype.isLost = function(){
  if (this.isBoardFull()){
    for(var i = 0; i < this.board.length-1; i++) {
      for(var j = 0; j < this.board[i].length; j++){
        if (this.board[i][j] === this.board[i+1][j]){
          return false;
        }  
      }
    }
    for(var m = 0; m < this.board.length; m++) {
      for(var n = 0; n < this.board[m].length-1; n++){
        if (this.board[m][n] === this.board[m][n+1]){
          return false;
        }  
      }
    }
    return true;
  } else {
    return false;
  }
};

// Warn if overriding existing method
if(Array.prototype.equals) {
  console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."); }
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array) {
    return false;
  }
  // compare lengths - can save a lot of time 
  if (this.length != array.length) {
    return false;
  }

  for (var i = 0, l=this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) {
        return false;       
      }
    } else if (this[i] != array[i]) { 
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;   
    }           
  }       
  return true;
};

// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

Game.prototype.transposeBoard = function() {
  var board = this.board;
  var transposedArray = board[0].map(function(col, i) {
    return board.map(function(row) { 
      return row[i];
    });
  });
  this.board = transposedArray; 
};

Game.prototype.isBoardFull = function() {
  var isFull = true, board = this.board;
  for (var i = 0; i < board.length; i++) {
    if (board[i].includes(0)){
      isFull = false;
      break;
    }
  }
  return isFull;
}
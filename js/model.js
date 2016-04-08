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
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0){
        emptyTileCoordinates.push([i, j]);
      }
    }
  }
  if (emptyTileCoordinates.length === 0){
    this.gameOver();
    return;
  }
  if (board.equals(previousBoard)){
    return;
  }
  var randIndex = Math.floor(Math.random() * emptyTileCoordinates.length);
  var randSpace = emptyTileCoordinates[randIndex];
  board[randSpace[0]][randSpace[1]] = 2;
  this.board = board;
};

Game.prototype.isWon = function(){
  var containsObject = function(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  };

  for(var i = 0; i < this.board.length; i++) {
    if (containsObject(2048, this.board[i])){
      alert("YOU GOT 2048! YOU WON!");
    }
  }
};

Game.prototype.gameOver = function(){
  var match = false;
  for(var i = 0; i < this.board.length-1; i++) {
    for(var j = 0; j < this.board[i].length; j++){
      if (this.board[i][j] === this.board[i+1][j]){
        match = true;
      }  
    }
  }
  for(var i = 0; i < this.board.length; i++) {
    for(var j = 0; j < this.board[i].length-1; j++){
      if (this.board[i][j] === this.board[i][j+1]){
        match = true;
      }  
    }
  }
  if (match === false){
     alert("Game Over!");
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
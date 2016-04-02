function Game(board) {
  if (board) {
    this.board = board;
  } 
  else { 
    this.board = this.generateStartBoard();
  }
  this.previousBoard = [];
  this.score = 0;
}

Game.prototype.generateStartBoard = function(){
  var found, storedBoard, generatedBoard;
  if (localStorage.score){
    this.score = parseInt(localStorage.score);
  }
  if (localStorage.board){
    storedBoard = JSON.parse(localStorage.board);
    return storedBoard;
  }
  while (found !== 2){
    generatedBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    found = 0;
    var randIndex1 = Math.floor(Math.random() * generatedBoard.length);
    var randIndex2 = Math.floor(Math.random() * generatedBoard.length);
    var randIndex3 = Math.floor(Math.random() * generatedBoard.length);
    var randIndex4 = Math.floor(Math.random() * generatedBoard.length);
    var startingValues = [2,2,2,2,2,2,2,2,2,4];
    var randStartingValue1 = startingValues[Math.floor(Math.random() * startingValues.length)];
    var randStartingValue2 = startingValues[Math.floor(Math.random() * startingValues.length)];
    generatedBoard[randIndex1][randIndex2] = randStartingValue1;
    generatedBoard[randIndex3][randIndex4] = randStartingValue2;
    for(var i = 0; i < generatedBoard.length; i++) {
      for(var j = 0; j < generatedBoard[i].length; j++) {
        if (generatedBoard[i][j] === 2){
          found++;
        }
        if (generatedBoard[i][j] === 4){
          found++;
        }
      }
    }
  }
  return generatedBoard;
};

Game.prototype.reverseBoard = function(){
  for(var i = 0; i < this.board.length; i++) {
    this.board[i].reverse();
  }
};

Game.prototype.move = function(direction){
  var boardCopy = [];

  for (var i = 0; i < this.board.length; i++){
    boardCopy[i] = this.board[i].slice();
  }
  this.previousBoard = boardCopy;

  if (direction === "left"){
    this.removeZeros();
    this.left();
    this.pad();
  }
  if (direction === "right"){
    this.removeZeros();
    this.reverseBoard();
    this.left();
    this.pad();
    this.reverseBoard();
  }  
  if (direction === "up"){
    var board = this.board;
    var transposeBoard = board[0].map(function(col, i) { 
      return board.map(function(row) { 
        return row[i] ;
      });
    });
    this.board = transposeBoard;
    this.removeZeros();
    this.left();
    this.pad();
    var board = this.board;
    var transposeBoard = board[0].map(function(col, i) { 
      return board.map(function(row) { 
        return row[i];
      });
    });
    this.board = transposeBoard;
  }  
  if (direction === "down"){
    var board = this.board;
    var transposeBoard = board[0].map(function(col, i) { 
      return board.map(function(row) { 
        return row[i] ;
      });
    });
    this.board = transposeBoard;
    this.removeZeros();
    this.reverseBoard();
    this.left();
    this.pad();
    this.reverseBoard();
    var board = this.board;
    var transposeBoard = board[0].map(function(col, i) { 
      return board.map(function(row) { 
        return row[i] ;
      });
    });
    this.board = transposeBoard;
  }  
};

Game.prototype.left = function(){
  var board = this.board;
  var newRow = [];
  for(var i = 0; i < board.length; i++) {
    newRow = [];
    if (board[i].length > 1){
      if (board[i].length === 2){
        if (board[i][0] === board[i][1]){
          newRow.push(board[i][0] * 2);
          this.score += board[i][0] * 2;
        } else {
          newRow.push(board[i][0]);
          newRow.push(board[i][1]);
        }
      } else if (board[i].length === 3) {
        if (board[i][0] === board[i][1]){
          newRow.push(board[i][0] * 2);
          this.score += board[i][0] * 2;
          newRow.push(board[i][2]);
        } else if (board[i][1] === board[i][2]){
          newRow.push(board[i][0]);
          newRow.push(board[i][1] * 2);
          this.score += board[i][1] * 2;
        } else {
          newRow.push(board[i][0]);
          newRow.push(board[i][1]);
          newRow.push(board[i][2]);
        }
      } else if (board[i].length === 4){
        if (board[i][0] === board[i][1]){
          newRow.push(board[i][0] * 2);
          this.score += board[i][0] * 2;
          if (board[i][2] === board[i][3]){
            newRow.push(board[i][2] * 2);
            this.score += board[i][2] * 2;
          } else {
            newRow.push(board[i][2]);
            newRow.push(board[i][3]);
          }
        } else if (board[i][1] === board[i][2]){
          newRow.push(board[i][0]);
          newRow.push(board[i][1] * 2);
          this.score += board[i][1] * 2;
          newRow.push(board[i][3]);
        } else if (board[i][2] === board[i][3]){
          newRow.push(board[i][0]);
          newRow.push(board[i][1]);
          newRow.push(board[i][2] * 2);
          this.score += board[i][2] * 2;
        } else {
          newRow = board[i];
        }
      }
      this.board[i] = newRow;
    }
  } 
};
    
Game.prototype.removeZeros = function(){
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

Game.prototype.pad = function(){
  var board = this.board;
  for(var i = 0; i < board.length; i++) {
    while (board[i].length < 4){
      board[i].push(0); 
    }
  }
  this.board = board;
};

Game.prototype.spawn = function(){
  var board = this.board;
  var previousBoard = this.previousBoard;    
  var emptySpaces = [];
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0){
        emptySpaces.push([i, j]);
      }
    }
  }
  if (emptySpaces.length === 0){
    this.gameOver();
    return;
  }
  if (board.equals(previousBoard)){
    return;
  }
  var randIndex = Math.floor(Math.random() * emptySpaces.length);
  var randSpace = emptySpaces[randIndex];
  board[randSpace[0]][randSpace[1]] = 2;
  this.board = board;
};

Game.prototype.checkIfWon = function(){
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

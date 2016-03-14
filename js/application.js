// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

function game() {
  this.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  this.generateStartBoard = function(){
    var found, board;
    while (found !== 2){
      found = 0;
      board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
      var randIndex1 = Math.floor(Math.random() * board.length);
      var randIndex2 = Math.floor(Math.random() * board.length);
      var randIndex3 = Math.floor(Math.random() * board.length);
      var randIndex4 = Math.floor(Math.random() * board.length);
      var startingValues = [2,2,2,2,2,2,2,2,2,4];
      var randStartingValue1 = startingValues[Math.floor(Math.random() * startingValues.length)];
      var randStartingValue2 = startingValues[Math.floor(Math.random() * startingValues.length)];
      board[randIndex1][randIndex2] = randStartingValue1;
      board[randIndex3][randIndex4] = randStartingValue2;
      for(var i = 0; i < board.length; i++) {
        for(var j = 0; j < board[i].length; j++) {
          if (board[i][j] === 2){
            found++;
          }
          if (board[i][j] === 4){
            found++;
          }
        }
      }
    }
    this.board = board;
    return board;
  };
  this.horizontalReverse = function(){
    for(var i = 0; i < this.board.length; i++) {
      this.board[i].reverse();
    }
  };

  this.previousBoard = [];
  
  this.move = function(direction){
    //need to debug this: previousBoard not behaving
    //as expected
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
      this.horizontalReverse();
      this.left();
      this.pad();
      this.horizontalReverse();
    }  
    if (direction === "up"){
      var board = this.board;
      var transposedBoard = board[0].map(function(col, i) { 
        return board.map(function(row) { 
          return row[i] 
        })
      });
      this.board = transposedBoard;
      this.removeZeros();
      this.left();
      this.pad();
      var board = this.board;
      var transposedBoard = board[0].map(function(col, i) { 
        return board.map(function(row) { 
          return row[i] 
        })
      });
      this.board = transposedBoard;
    }  
    if (direction === "down"){
      var board = this.board;
      var transposedBoard = board[0].map(function(col, i) { 
        return board.map(function(row) { 
          return row[i] 
        })
      });
      this.board = transposedBoard;
      this.removeZeros();
      this.horizontalReverse();
      this.left();
      this.pad();
      this.horizontalReverse();
      var board = this.board;
      var transposedBoard = board[0].map(function(col, i) { 
        return board.map(function(row) { 
          return row[i] 
        })
      });
      this.board = transposedBoard;
    }  
  };
  this.left = function(){
    var board = this.board;
    var newRow = [];
    for(var i = 0; i < board.length; i++) {
      newRow = [];
      if (board[i].length > 1){
        if (board[i].length === 2){
          if (board[i][0] === board[i][1]){
            newRow.push(board[i][0] * 2);
          } else {
            newRow.push(board[i][0]);
            newRow.push(board[i][1]);
          }
        } else if (board[i].length === 3) {
          if (board[i][0] === board[i][1]){
            newRow.push(board[i][0] * 2);
            newRow.push(board[i][2]);
          } else if (board[i][1] === board[i][2]){
            newRow.push(board[i][0]);
            newRow.push(board[i][1] * 2);
          } else {
            newRow.push(board[i][0]);
            newRow.push(board[i][1]);
            newRow.push(board[i][2]);
          }
        } else if (board[i].length === 4){
          if (board[i][0] === board[i][1]){
            newRow.push(board[i][0] * 2);
            if (board[i][2] === board[i][3]){
              newRow.push(board[i][2] * 2);
            } else {
              newRow.push(board[i][2]);
              newRow.push(board[i][3]);
            }
          } else if (board[i][1] === board[i][2]){
            newRow.push(board[i][0]);
            newRow.push(board[i][1] * 2);
            newRow.push(board[i][3]);
          } else if (board[i][2] === board[i][3]){
            newRow.push(board[i][0]);
            newRow.push(board[i][1]);
            newRow.push(board[i][2] * 2);
          } else {
            newRow = board[i];
          }
        }
        this.board[i] = newRow;
      }
    } 
  };
  this.removeZeros = function(){
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
  this.pad = function(){
    var board = this.board;
    for(var i = 0; i < board.length; i++) {
      while (board[i].length < 4){
        board[i].push(0); 
      }
    }
    this.board = board;
  };
  this.spawn = function(){
    var board = this.board;
    

    var previousBoard = this.previousBoard;
    if (board.equals(previousBoard)){
      return;
    }
    var emptySpaces = [];
    for(var i = 0; i < board.length; i++) {
      for(var j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0){
          emptySpaces.push([i, j]);
        }
      }
    }
    if (emptySpaces.length < 1){
      alert("Game Over!");
      return;
    }
    var randIndex = Math.floor(Math.random() * emptySpaces.length);
    var randSpace = emptySpaces[randIndex];
    board[randSpace[0]][randSpace[1]] = 2;
    this.board = board;
  };
}



function view() {
  this.displayBoard = function(board){
    var boardHTML = "";
    for(var i = 0; i < board.length; i++) {
      boardHTML += '<tr>';
        for(var j = 0; j < board[i].length; j++) {
          boardHTML += '<td>';
          if (board[i][j] !== 0){
            boardHTML += board[i][j].toString();
          }
          boardHTML += '</td>';
        }
      boardHTML += '</tr>';
    }
    document.getElementById("board").innerHTML = boardHTML;
  };

}

var Game = new game(); 
var View = new view();
var startingBoard = Game.generateStartBoard();

$(document).ready(function(){
  View.displayBoard(startingBoard);
  $(document).on('keyup', function(event){
    switch (event.which) {
      case 37:
        Game.move('left');
        break;
      case 38:
        Game.move('up');
        break;
      case 39:
        Game.move('right');
        break;
      case 40:
        Game.move('down');
        break;
    }
    View.displayBoard(Game.board);
    setTimeout(function(){ Game.spawn(); View.displayBoard(Game.board); }, 500);
    
  });
});
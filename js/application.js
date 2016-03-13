


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
}



function view() {
  this.displayBoard = function(board){
    var boardHTML = "";
    for(var i = 0; i < board.length; i++) {
      boardHTML += '<tr>';
        for(var j = 0; j < board[i].length; j++) {
          boardHTML += '<td>';
          boardHTML += board[i][j].toString();
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

});
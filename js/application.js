function game() {
  this.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  this.generateStartBoard = function(){
    var found = 0;
    while (found < 2){
      var found = 0;
      var board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
      var rand1 = Math.floor(Math.random() * board.length);
      var rand2 = Math.floor(Math.random() * board.length);
      var rand3 = Math.floor(Math.random() * board.length);
      var rand4 = Math.floor(Math.random() * board.length);
      board[rand1][rand2] = 2;
      board[rand3][rand4] = 2;
      for(var i = 0; i < board.length; i++) {
        if (($.inArray(2, board[i])) !== -1){
          found++;
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
      console.log("i loop");
      boardHTML += '<tr>';
        for(var j = 0; j < board[i].length; j++) {
          console.log("j loop");
          boardHTML += '<td>';
          boardHTML += board[i][j].toString();
          boardHTML += '</td>';
        }
      boardHTML += '</tr>';
    }
    return boardHTML;
  };

}

var currentGame = new game(); 
var currentView = new view();
var startBoard = currentGame.generateStartBoard();
var boardGame = currentView.displayBoard(startBoard);
$(document).ready(function(){
  $('#board').html(boardGame);

})


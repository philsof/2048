function View() {
  this.displayElement = document.getElementById('board');
  this.document = document;
  this.setupEventHandling();
}
  View.prototype.displayBoard = function(board, score){
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
    var scoreHTML = score.toString();
    document.getElementById("board").innerHTML = boardHTML;
    document.getElementById("score").innerHTML = scoreHTML;

  };


View.prototype.setupEventHandling = function() {
  
};


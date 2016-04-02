function View(args) {
  args = args || {}
  this.boardDisplay = args.boardDisplay;
  this.scoreDisplay = args.scoreDisplay;
  this.newGameButton = args.newGameButton;
  this.setupHandlers();
}

View.prototype.drawBoard = function(board, score){
  var boardHTML = "";
  var scoreHTML = score.toString();
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
  this.boardDisplay.innerHTML = boardHTML;
  this.scoreDisplay.innerHTML = scoreHTML;
};

View.prototype.setupHandlers = function() {  
  document.addEventListener('keyup', function(event){
    switch (event.which) {
      case 37:
        this.controller.move('left');
        break;
      case 38:
        this.controller.move('up');
        break;
      case 39:
        this.controller.move('right');
        break;
      case 40:
        this.controller.move('down');
        break;
    }
  }.bind(this));

  this.newGameButton.addEventListener('click', function(event){
    this.controller.newGame();
  }.bind(this));
};


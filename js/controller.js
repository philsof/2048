function Controller(game, view) {
   this.game = game;
   this.view = view;
}

Controller.prototype.moveTiles = function(direction) {
  this.game.moveTiles(direction);
  this.view.drawBoard(this.game);
  this.game.checkIfWon();
  setTimeout(function(){ 
    this.game.spawn(); 
    this.view.drawBoard(this.game);
    if(typeof(Storage) !== "undefined") {
      localStorage.board = JSON.stringify(this.game.board);
      localStorage.score = JSON.stringify(this.game.score);
    } else {
    // no local storage support
    }
  }, 100);
};

Controller.prototype.start = function() {
  this.game.generateStartingBoard();
  this.view.drawBoard(this.game);
};

Controller.prototype.newGame = function() {
  if(typeof(Storage) !== "undefined") {
    localStorage.removeItem("board");
    localStorage.removeItem("score");
  } else {
    // no local storage support
  }
  location.reload();
};


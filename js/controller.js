function Controller(game, view) {
   this.game = game;
   this.view = view;
}

Controller.prototype.moveTiles = function(direction) {
  this.game.moveTiles(direction);
  this.view.drawBoard(this.game);
  if (this.game.got2048()) {
    this.view.alertGameWon();
  }
  if (this.game.isOver()){
    this.view.alertGameOver();
  }
  setTimeout(function(){ 
    this.game.spawn(); 
    this.view.drawBoard(this.game);
    if(typeof(Storage) !== "undefined") {
      localStorage.board = JSON.stringify(this.game.board);
      localStorage.score = JSON.stringify(this.game.score);
      localStorage.won = JSON.stringify(this.game.won);
    } else {
    // no local storage support
    }
  }, 100);
};

Controller.prototype.start = function() {
  this.view.drawBoard(this.game);
};

Controller.prototype.newGame = function() {
  if(typeof(Storage) !== "undefined") {
    localStorage.removeItem("board");
    localStorage.removeItem("score");
    localStorage.removeItem("won");
  } else {
    // no local storage support
  }
  location.reload();
};


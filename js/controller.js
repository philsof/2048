function Controller(game, view) {
   this.game = game;
   this.view = view;
}

Controller.prototype.move = function(direction) {
  this.game.move(direction);
  this.view.displayBoard(this.game.board, this.game.score);
  this.game.checkIfWon();
  setTimeout(function(){ 
    this.game.spawn(); 
    this.view.displayBoard(this.game.board, this.game.score);
    if(typeof(Storage) !== "undefined") {
      localStorage.board = JSON.stringify(this.game.board);
      localStorage.score = JSON.stringify(this.game.score);
    } else {
    // no storage support
    }
  }, 100);
};

Controller.prototype.start = function() {
  this.view.displayBoard(this.game.generateStartBoard(), this.game.score);
};


document.addEventListener('DOMContentLoaded', function(){
  game = new Game(); 
  view = new View({boardElement: document.getElementById('board'), scoreElement: document.getElementById('score'), newGameButton: document.getElementById('new-game-button')});
  controller = new Controller(game, view);
  view.controller = controller;
  controller.start();
});
$(document).ready(function(){
  game = new Game(); 
  view = new View({boardDisplay: document.getElementById('board'), scoreDisplay: document.getElementById('score'), newGameButton: document.getElementById('new-game-button')});
  controller = new Controller(game, view);
  view.controller = controller;
  controller.start();
  $('#new-game-button').on('click', function(event){
    controller.newGame();
  });
});
document.addEventListener('DOMContentLoaded', function(){
  game = new Game(); 
  view = new View({boardElement: document.getElementById('board'), scoreElement: document.getElementById('score'), newGameButton: document.getElementById('new-game-button')});
  controller = new Controller(game, view);
  view.controller = controller;
  controller.start();
});

//test boards:
// [[2,4,8,16],[16,8,4,2],[2,4,8,16],[16,8,4,2]]
// [[2,4,8,16],[32,64,128,256],[512,1024,512,2],[2,4,8,0]]
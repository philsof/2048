$(document).ready(function(){
  game = new Game(); 
  view = new View();
  ctrl = new Controller(game, view);
  ctrl.start();
  $(document).on('keyup', function(event){
    switch (event.which) {
      case 37:
        ctrl.move('left');
        break;
      case 38:
        ctrl.move('up');
        break;
      case 39:
        ctrl.move('right');
        break;
      case 40:
        ctrl.move('down');
        break;
    }
  });
  $('#new-game-button').on('click', function(event){
    if(typeof(Storage) !== "undefined") {
      localStorage.removeItem("board");
      localStorage.removeItem("score");
    } else {
      // Sorry! No Web Storage support..
    }
    location.reload();
  });
});
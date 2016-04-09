# 2048

Vanilla JavaScript build of [the game 2048](http://2048game.com/). Functionality and technical details:
* Tiles merge the way they should (no bugs, no mistaken double merges; e.g. "8,4,2,2" moved left becomes "8,4,4,-" not "8,8,-,-")
* MVC architecture
* No false positive "game over" notifications: game is over only when no empty spaces remain _and_ no tiles can be merged.
* No missing "game over" notifications: if the game is over, you will be informed of it.
* Local storage automatically utilized: if you close the browser and come back, your game will resume from where you left off.
* New game functionality: new game action erases local storage and generates a new board.
* Starting board generation mimics real game: two random tiles are supplied with a 2 or 4, with a 10% chance of generating a 4.
* Spawn functionality mimics real game: random empty tile is assigned a 2 or 4, with a 10% chance of generating a 4.
* DRY algorithms including [merging of tiles](https://github.com/philsof/2048/blob/master/js/model.js#L69-L93), which utilizes "left" merge method for all four directions via manipulation of board (transposing, reversing).
* Accurate scorekeeping

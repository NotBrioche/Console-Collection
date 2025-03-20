import Player from './player';
import Console from './console';
import { exit } from 'process';

class Game {
  player: Player = new Player('Fabrioche');
  console: Console = new Console(this);

  constructor() {
    this.init();
  }

  init() {
    this.console.init();
    exit();
  }
}

export default Game;

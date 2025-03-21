import * as readline from 'readline/promises';
import Player from './player';
import Console from './console';
import { exit } from 'process';
import * as fs from 'fs';
import * as path from 'path';

class Game {
  player: Player;
  console: Console;
  rl = readline.createInterface(process.stdin, process.stdout);

  static playerDataPath: string = path.join(__dirname, '../data/player.json');

  constructor() {
    if (fs.existsSync(Game.playerDataPath)) {
      const fileString = fs.readFileSync(Game.playerDataPath, 'utf-8');

      const importedPlayer = JSON.parse(fileString);

      this.player = new Player(importedPlayer.username, importedPlayer.power);
    } else {
      this.player = new Player('');
    }

    this.console = new Console(this);

    this.init();
  }

  async init() {
    if (this.player.username == '') {
      this.player.username = await this.rl.question(
        "Quel est votre nom d'utilisateur ? : "
      );
      fs.writeFileSync(Game.playerDataPath, JSON.stringify(this.player), {
        flag: 'w',
      });
    }
    await this.console.init();
    exit();
  }
}

export default Game;

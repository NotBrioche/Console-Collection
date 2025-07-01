import * as readline from 'readline/promises';
import Player from './player';
import Console from './console';
import { exit } from 'process';
import * as fs from 'fs';
import * as path from 'path';
import getAppDataPath from 'appdata-path';
import Shop from './shop';

class Game {
  player: Player;
  shop: Shop;
  console: Console;
  rl = readline.createInterface(process.stdin, process.stdout);

  static playerDataPath: string = path.join(
    getAppDataPath('Console-Collection'),
    'player.json'
  );

  constructor() {
    if (fs.existsSync(Game.playerDataPath)) {
      const fileString = fs.readFileSync(Game.playerDataPath, 'utf-8');

      const importedPlayer = JSON.parse(fileString);

      this.player = new Player(
        importedPlayer.username,
        importedPlayer._energy,
        importedPlayer._land,
        importedPlayer._collection,
        importedPlayer._money
      );
      if (importedPlayer.nextReward <= Date.now()) {
        this.player.energy = 100;
        importedPlayer.nextReward = Date.now() + 18 * 60 * 60 * 1000;

        this.shop = new Shop(this.player);
        fs.writeFileSync(
          path.join(getAppDataPath('Console-Collection'), 'shop.json'),
          JSON.stringify(this.shop),
          { flag: 'w' }
        );
      }

      if (importedPlayer.nextReward === undefined) {
        importedPlayer.nextReward = Date.now() + 24 * 60 * 60 * 1000;
      }

      fs.writeFileSync(Game.playerDataPath, JSON.stringify(importedPlayer), {
        flag: 'w',
      });
    } else {
      fs.mkdirSync(getAppDataPath('Console-Collection'), { recursive: true });
      this.player = new Player('');
    }

    if (
      fs.existsSync(
        path.join(getAppDataPath('Console-Collection'), 'shop.json')
      )
    ) {
      const fileString = fs.readFileSync(
        path.join(getAppDataPath('Console-Collection'), 'shop.json'),
        'utf-8'
      );
      const importedShop = JSON.parse(fileString);
      this.shop = new Shop(
        this.player,
        importedShop._sells,
        importedShop._buys,
        importedShop.energies,
        importedShop.multiplicator
      );
    } else {
      this.shop = new Shop(this.player);
      fs.writeFileSync(
        path.join(getAppDataPath('Console-Collection'), 'shop.json'),
        JSON.stringify(this.shop),
        { flag: 'w' }
      );
    }

    this.console = new Console(this);

    this.init(true);
  }

  async init(isDebugMode: boolean = false) {
    if (this.player.username == '') {
      this.player.username = await this.rl.question(
        "Quel est votre nom d'utilisateur ? : "
      );
      fs.writeFileSync(Game.playerDataPath, JSON.stringify(this.player), {
        flag: 'w',
      });
    }

    new Shop(this.player);

    await this.console.init(isDebugMode);
    exit();
  }
}

export default Game;

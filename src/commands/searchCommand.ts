import Command from '../command';
import Game from '../game';
import Item from '../item';
import Condition from '../condition';
import * as fs from 'fs';

class SearchCommand implements Command {
  name: string = 'search';
  description: string = 'Vous permet de chercher';
  syntax: string = 'search [duration] [item]';
  longDescription: string[] = [];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[] | null): Promise<void> {
    let length = 2;

    if (args != null && args.length > 0) {
      length = Number.parseInt(args[0]);

      if (isNaN(length)) {
        console.log('> Veuillez entrer une durée valide');
        return;
      }
    }

    console.log('> ----- Vous avez commencé de chercher -----');
    let time: number = 0;

    const ac: AbortController = new AbortController();
    const signal = ac.signal;

    const interval = setInterval(() => {
      time++;

      if (time % 60 == 0) {
        this.game.player.power -= 5;
        const item: Item | undefined = this.tryGetNewItem();
        if (item === undefined) {
          process.stdout.write("Vous n'avez rien trouvé\n> ");
        } else {
          process.stdout.write(`+1 ${item.name}`);
          this.game.player.addItem(Item.toOwned(item));
          ac.abort();
        }
      }

      if (time >= 60 * length) {
        ac.abort();
        clearInterval(interval);
      }
    }, 1000);
    this.game.player.power -= 5;

    while (time + 1 < 60 * length) {
      try {
        const rep = await this.game.rl.question('> ', {
          signal,
        });
        if (rep == 'stop' || rep == 'exit') {
          break;
        }

        if (rep == 'stamina' || rep == 'stats' || rep == 'home') {
          process.stdout.write(`${this.game.player.power} / 100\n> `);
        }
      } catch (e) {
        break;
      }
    }
    console.log('> ----- Vous avez fini de chercher -----');
    clearInterval(interval);
  }

  private tryGetNewItem(): Item | undefined {
    const json: string = fs.readFileSync('./data/search.json').toString();
    const searchJson: Item[] = JSON.parse(json);

    const valid: Item[] = searchJson.filter((item) =>
      Condition.compare(item.conditions, new Condition('search'))
    );

    const random = Math.floor(Math.random() * 5);

    if (random == 0) {
      return valid[Math.floor(Math.random() * valid.length - 1)];
    }
    return;
  }
}

export default SearchCommand;

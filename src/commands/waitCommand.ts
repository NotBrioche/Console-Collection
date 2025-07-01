import Command from '../command';
import Game from '../game';
import Item from '../item';
import Utils from '../utils';

class WaitCommand implements Command {
  name: string = 'wait';
  description: string = 'Permet d’attendre un certain temps';
  syntax: string = 'wait [durée]';
  longDescription: string[] = [
    'Utilisez la commande wait pour patienter pendant une durée choisie en minutes.',
  ];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    if (this.game.player.energy < 1) {
      console.log('> ' + '-'.repeat("Vous n'avez plus assez d'énergie".length));
      console.log("> Vous n'avez plus assez d'énergie");
      console.log('> ');
      return;
    }

    if (args.length > 0 && isNaN(Number(args[0]))) {
      console.log('> Please enter a valid number for the duration to wait');
      console.log('> ');
      return;
    }

    let duration =
      args.length > 0 ? 60 * Number(args[0]) : 60 * this.game.player.energy;

    const waitMessage = "> Vous avez commencé d'attendre";
    console.log(`> ${'-'.repeat(waitMessage.length - 2)}`);
    console.log(waitMessage);
    console.log('> Tapez "exit" ou "stop" pour arreter d\'attendre');
    console.log('> ');

    const ac: AbortController = new AbortController();
    const signal = ac.signal;

    let checkTimer;
    let loops = 0;

    const endTimestamp = Date.now() + duration * 1000;

    checkTimer = setInterval(() => {
      if (Date.now() >= endTimestamp) {
        ac.abort('Wait duration passed');
      }

      if (loops >= 60 * 2) {
        loops = 0;
        this.game.player.energy--;

        if (this.game.player.energy == 0) {
          ac.abort('No more energy');
        }
      }

      loops++;
    }, 500);

    this.game.player.energy--;
    const eventOrItemChance = this.getRandomWaitTime();

    while (true) {
      try {
        // TODO possibility to get random event
        const rep = await this.game.rl.question('> ', { signal });

        if (rep == 'exit' || rep == 'stop') {
          console.log("> Vous avez arreté d'attendre");
          console.log('> ');
          clearTimeout(eventOrItemChance);
          clearInterval(checkTimer);
          break;
        }
      } catch {
        console.log("> Vous avez arreté d'attendre");
        console.log('> ');
        clearTimeout(eventOrItemChance);
        clearInterval(checkTimer);
        break;
      }
    }
  }

  private getRandomWaitTime() {
    const randomWaitTime =
      1 + Math.floor(Math.random() * 25) + Math.floor(Math.random() * 10);

    const eventOrItemChance = setTimeout(() => {
      if (Math.floor(Math.random() * 3) == 0) {
        const items = Utils.getAllPossibleToGetItems(
          this.game.player,
          Utils.getRarity(),
          'wait'
        );
        const item = items[Math.floor(Math.random() * items.length)];

        this.game.player.addItem(Item.toCompact(item));
        this.game.rl.write(
          `+1 ${Utils.printWithRarityColor(
            Item.rarities[item.rarity],
            item.rarity
          )} ${item.name}\n> `
        );
      }
    }, randomWaitTime * 60 * 1000);

    return eventOrItemChance;
  }
}

export default WaitCommand;

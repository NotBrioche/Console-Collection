import Command from '../command';
import Game from '../game';
import Item from '../item';
import Utils from '../utils';

class WaitCommand implements Command {
  name: string = 'wait';
  description: string = "Vous permet d'attendre";
  syntax: string = 'wait [durée]';
  longDescription: string[] = [
    "La commande wait par défaut n'a pas de fin, entrez exit ou stop pour arreter d'attendre",
    'Si vous voulez attendre uniquement une durée spécifique, vous pouvez le faire avec le paramètre [duration]',
    'Le paramètre [durée] est en minutes. "wait 5" vous fera attendre 5 minutes',
    "Chaque minute d'attente coutera 1 d'énergie",
  ];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
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

    if (this.game.player.energy < 1) {
      console.log("> Vous n'avez plus assez d'énergie");
      clearInterval(checkTimer);
      return;
    }

    this.game.player.energy--;
    const randomWaitTime =
      1 + Math.floor(Math.random() * 25) + Math.floor(Math.random() * 10);

    const eventOrItemChance = setTimeout(
      () => {
        if (Math.floor(Math.random() * 3) == 0) {
          const items = Utils.getAllPossibleToGetItems(
            this.game.player,
            Utils.getRarity(),
            'wait'
          );
          const item = items[Math.floor(Math.random() * items.length)];

          this.game.player.collection.push(Item.toOwned(item));
          this.game.rl.write(
            `+1 ${Utils.printWithRarityColor(Item.rarities[item.rarity], item.rarity)} ${item.name}\n> `
          );
        }
      },
      randomWaitTime * 60 * 1000
    );

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
}

export default WaitCommand;

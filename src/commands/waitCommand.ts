import Command from '../command';
import Game from '../game';

class WaitCommand implements Command {
  name: string = 'wait';
  description: string = "Vous permet d'attendre";
  syntax: string = 'wait [duration]';
  longDescription: string[] = [
    "La commande wait par défaut n'a pas de fin, entrez exit ou stop pour arreter d'attendre",
    'Si vous voulez attendre uniquement une durée spécifique, vous pouvez le faire avec le paramètre [duration]',
    'Le paramètre [duration] est en minutes. "wait 5" vous fera attendre 5 minutes',
    "Chaque minute d'attente coutera 1 d'énergie",
  ];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    if (args.length > 0 && isNaN(Number(args[0]))) {
      console.log('> Please enter a valid number for the duration to wait');
      return;
    }

    let duration =
      args.length > 0 ? 60 * Number(args[0]) : 60 * this.game.player.energy;

    const waitMessage = "> Vous avez commencé d'attendre";
    console.log(`> ${'-'.repeat(waitMessage.length)}`);
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
    while (true) {
      try {
        const rep = await this.game.rl.question('> ', { signal });

        // TODO possibility to get random item
        // TODO possibility to get random event

        if (rep == 'exit' || rep == 'stop') {
          console.log("> Vous avez arreté d'attendre");
          console.log('> ');
          clearInterval(checkTimer);
          break;
        }
      } catch {
        console.log("> Vous avez arreté d'attendre");
        console.log('> ');
        clearInterval(checkTimer);
        break;
      }
    }
  }
}

export default WaitCommand;

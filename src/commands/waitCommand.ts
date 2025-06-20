import Command from '../command';
import Game from '../game';

class WaitCommand implements Command {
  name: string = 'wait';
  description: string = "Vous permet d'attendre";
  syntax: string = 'wait [duration]';
  longDescription: string[] = [];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[] | null): Promise<void> {
    let length: number = 1;
    if (args != null && args.length > 0) {
      length = Number.parseInt(args[0]);
    }
    length = isNaN(length) ? 1 : length;

    if (this.game.player.energy < 1 + length) {
      console.log("> Vous n'avez pas assez d'énergie pour attendre");
      console.log('> ');
      return;
    }

    console.log("> ----- Vous avez commencé d'attendre -----");
    let time: number = 0;

    const ac: AbortController = new AbortController();
    const signal = ac.signal;

    const interval = setInterval(() => {
      time++;

      if (time % 60 == 0) {
        this.game.player.energy--;
      }

      if (time + 1 >= 60 * length) {
        ac.abort();
        clearInterval(interval);
      }
    }, 1000);
    this.game.player.energy--;

    while (time + 1 < 60 * length) {
      try {
        const rep = await this.game.rl.question('> ', {
          signal,
        });
        if (rep == 'stop' || rep == 'exit') {
          break;
        }
      } catch (e) {
        break;
      }
    }
    console.log("> ----- Vous avez fini d'attendre -----");
    this.game.player.energy--;
    clearInterval(interval);
  }
}

export default WaitCommand;

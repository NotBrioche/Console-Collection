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
    // const ac: AbortController = new AbortController();
    // const signal = ac.signal;
    // const rep = await this.game.rl.question('> ', {
    //   signal,
    // });
  }
}

export default WaitCommand;

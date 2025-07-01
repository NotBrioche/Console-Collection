import Command from '../../command';
import Game from '../../game';
import Shop from '../../shop';

class RerollDebugCommand implements Command {
  name: string = 'reroll';
  description: string = 'Create a new shop';
  syntax: string = 'reroll';
  longDescription: string[] = [];

  game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  async execute(args: string[]): Promise<void> {
    console.log('\x1b[41m' + '> DEBUG' + '\x1b[0m');

    this.game.shop = new Shop(this.game.player);
  }
}

export default RerollDebugCommand;

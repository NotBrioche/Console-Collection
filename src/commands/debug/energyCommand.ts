import Command from '../../command';
import Game from '../../game';

class EnergyDebugCommand implements Command {
  name: string = 'energy';
  description: string = 'Set player energy to 100 or another number';
  syntax: string = 'energy';
  longDescription: string[] = [];

  game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  async execute(args: string[]): Promise<void> {
    console.log('\x1b[41m' + '> DEBUG' + '\x1b[0m');
    let energy = 100;

    if (args.length > 0) {
      energy = Number(args[0]);
    }

    this.game.player.energy = energy;
    console.log(`> Energy set to ${this.game.player.energy}`);
    console.log('>');
  }
}

export default EnergyDebugCommand;

import Command from '../../command';
import Game from '../../game';

class MoneyDebugCommand implements Command {
  name: string = 'money';
  description: string = 'Set player money to 10000 or another number';
  syntax: string = 'money [amount]';
  longDescription: string[] = [];

  game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  async execute(args: string[]): Promise<void> {
    console.log('\x1b[41m' + '> DEBUG' + '\x1b[0m');
    let money = 10000;

    if (args.length > 0) {
      money = Number(args[0]);
    }

    this.game.player.money = money;
    console.log(`> Money set to ${this.game.player.money}`);
    console.log('>');
  }
}

export default MoneyDebugCommand;

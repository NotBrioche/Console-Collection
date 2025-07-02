import Command from './command';
import Game from './game';

// Commands
import ClearCommand from './commands/clearCommand';
import CollectionCommand from './commands/collectionCommand';
import ExitCommand from './commands/exitCommand';
import FlexCommand from './commands/flexCommand';
import HelpCommand from './commands/helpCommand';
import HomeCommand from './commands/homeCommand';
import SearchCommand from './commands/searchCommand';
import TrainCommand from './commands/trainCommand';
import WaitCommand from './commands/waitCommand';

// DEBUG
import EnergyDebugCommand from './commands/debug/energyCommand';
import MoneyDebugCommand from './commands/debug/moneyCommand';
import AllDebugCommand from './commands/debug/allCommand';
import ShopCommand from './commands/shopCommand';
import SellCommand from './commands/sellCommand';
import BuyCommand from './commands/buyCommand';
import RerollDebugCommand from './commands/debug/rerollCommand';

class Console {
  game: Game;

  commands: Array<Command>;

  constructor(game: Game) {
    this.game = game;

    this.commands = [
      new HomeCommand(this.game.player),
      new TrainCommand(this.game),
      new ExitCommand(),
      new ClearCommand(),
      new WaitCommand(this.game),
      new SearchCommand(this.game),
      new CollectionCommand(this.game),
      new FlexCommand(this.game),
      new ShopCommand(this.game),
      new SellCommand(this.game),
      new BuyCommand(this.game),
      // TODO travel command
    ];
    this.commands.push(new HelpCommand(this.commands));
  }

  public async init(isDebugMode: boolean = false) {
    if (isDebugMode) {
      console.log(
        '\x1b[41m' +
          'This is a DEBUG mode. Commands not intended for gameplay are available. Proceed with caution' +
          '\x1b[0m'
      );

      this.commands.push(new EnergyDebugCommand(this.game));
      this.commands.push(new MoneyDebugCommand(this.game));
      this.commands.push(new AllDebugCommand(this.game));
      this.commands.push(new RerollDebugCommand(this.game));
    }

    console.log('> home');
    this.commands[0].execute([]);

    while (true) {
      try {
        const input = (await this.game.rl.question('> ')).trim();

        if (input === null || input == '') continue;
        if (input == 'exit') break;

        const command = this.commands.find(
          (c) => c.name == input.split(' ')[0].trim()
        );
        if (command) {
          await command.execute(input.split(' ').slice(1));
        }
      } catch {
        break;
      }
    }
  }
}

export default Console;

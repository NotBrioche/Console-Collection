import Command from './command';

import Game from './game';

// Commands
import HomeCommand from './commands/homeCommand';
import HelpCommand from './commands/helpCommand';
import ExitCommand from './commands/exitCommand';
import ClearCommand from './commands/clearCommand';
import TrainCommand from './commands/trainCommand';
import WaitCommand from './commands/waitCommand';
import SearchCommand from './commands/searchCommand';
import CollectionCommand from './commands/collectionCommand';

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
    ];
    this.commands.push(new HelpCommand(this.commands));
  }

  public async init() {
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

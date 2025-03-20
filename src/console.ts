import Command from './command';
import * as readline from 'readline/promises';

import Game from './game';

// Commands
import HomeCommand from './commands/homeCommand';
import HelpCommand from './commands/helpCommand';
import ExitCommand from './commands/exitCommand';
import ClearCommand from './commands/clearCommand';

const rl = readline.createInterface(process.stdin, process.stdout);

class Console {
  game: Game;

  commands: Array<Command>;

  constructor(game: Game) {
    this.game = game;

    this.commands = [
      new HomeCommand(this.game.player),
      new ExitCommand(),
      new ClearCommand(),
    ];
    this.commands.push(new HelpCommand(this.commands));
  }

  public async init() {
    console.log('> home');
    this.commands[0].execute();

    while (true) {
      const input = (await rl.question('> ')).trim();

      if (input === null || input == '') continue;
      if (input == 'exit') break;

      const command = this.commands.find((c) => c.name == input);
      if (command) {
        command.execute();
      }
    }
  }
}

export default Console;

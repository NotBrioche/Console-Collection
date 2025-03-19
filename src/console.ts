import Command from './command';
import * as readline from 'readline/promises';
import { exit } from 'process';
import Player from './player';

// Commands
import HomeCommand from './commands/homeCommand';
import HelpCommand from './commands/helpCommand';
import ExitCommand from './commands/exitCommand';
import ClearCommand from './commands/clearCommand';

const rl = readline.createInterface(process.stdin, process.stdout);

const player = new Player('Fabrioche');

class Console {
  commands: Array<Command> = [
    new HomeCommand(player),
    new ExitCommand(),
    new ClearCommand(),
  ];

  constructor() {
    this.commands.push(new HelpCommand(this.commands));
  }

  async init() {
    console.log('> home');
    this.commands[0].execute();

    while (true) {
      const input = (await rl.question('> ')).trim();

      if (input === null || input == '') continue;
      if (input == 'exit') exit();

      const command = this.commands.find((c) => c.name == input);
      if (command) {
        command.execute();
      }
    }
  }
}

export default Console;

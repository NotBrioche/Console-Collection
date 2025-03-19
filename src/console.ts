import Command from './command';
import * as readline from 'readline/promises';
import { exit } from 'process';
import Player from './player';

// Commands
import HomeCommand from './homeCommand';

const rl = readline.createInterface(process.stdin, process.stdout);

const player = new Player('Fabrioche');

class Console {
  commands: Array<Command> = [new HomeCommand(player)];

  async init() {
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

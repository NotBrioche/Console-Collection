import Command from '../command';

class HelpCommand implements Command {
  public name: string = 'help';
  public description: string = 'Affiche la liste des commandes.';
  public syntax: string = 'help [commande]';
  public longDescription: string[] = [
    "Permet d'afficher la liste des commandes ou d'afficher l'aide d'une commande spécifique.",
  ];
  private commands: Array<Command> = [];

  constructor(commands: Array<Command>) {
    this.commands = commands;
  }

  async execute(args: string[]): Promise<void> {
    if (args == null || args.length < 1) {
      console.log(
        `> ${'-'.repeat(`${this.commands[0].name} - ${this.commands[0].description}`.length)}`
      );

      this.commands.forEach((command) => {
        console.log(`> ${command.name} - ${command.description}`);
      });
      console.log('> ');
    } else {
      let isACommand: boolean = false;
      let index = -1;

      for (let cmd of this.commands) {
        if (cmd.name == args[0].trim()) {
          isACommand = true;
          index = this.commands.indexOf(cmd);
        }
      }

      if (isACommand) {
        console.log(`> ${'-'.repeat(`${this.commands[index].syntax}`.length)}`);

        if (this.commands[index].syntax != this.commands[index].name) {
          console.log(`> ${this.commands[index].syntax}`);
          console.log('> ');
        }

        if (this.commands[index].longDescription.length < 1) {
          console.log(`> ${this.commands[index].description}`);
        }

        for (let line of this.commands[index].longDescription) {
          console.log(`> ${line}`);
        }
        console.log('> ');
      }
    }
  }
}

export default HelpCommand;

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

  async execute(args: string[] | null): Promise<void> {
    if (args == null || args.length < 2) {
      let maxLength: number = 0;
      this.commands.forEach((command) => {
        const cmdString = `${command.name} - ${command.description}`;

        if (cmdString.length > maxLength) {
          maxLength = cmdString.length;
        }
      });

      console.log('> ' + '-'.repeat(maxLength));

      this.commands.forEach((command) => {
        console.log(`> ${command.name} - ${command.description}`);
      });
      console.log('> ');
    } else {
      let isACommand: boolean = false;
      let index = -1;

      for (let cmd of this.commands) {
        if (cmd.name == args[1].trim()) {
          isACommand = true;
          index = this.commands.indexOf(cmd);
        }
      }

      if (isACommand) {
        let maxLength = this.commands[index].description.length;

        for (let line of this.commands[index].longDescription) {
          if (line.length > maxLength) maxLength = line.length;
        }

        console.log(`> ${'-'.repeat(maxLength)}`);

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

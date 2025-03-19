import Command from '../command';

class HelpCommand implements Command {
  public name: string = 'help';
  public description: string = 'Affiche la liste des commandes.';
  public syntax: string = 'help [commande]';
  public longDescription?: string =
    "Permet d'afficher la liste des commandes ou d'afficher l'aide d'une commande spécifique.";
  private commands: Array<Command> = [];

  constructor(commands: Array<Command>) {
    this.commands = commands;
  }

  execute(): void {
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
  }
}

export default HelpCommand;

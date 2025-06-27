import Command from '../command';

class HelpCommand implements Command {
  public name: string = 'help';
  public description: string =
    "Affiche la liste ou l'aide détaillé des commandes disponibles";
  public syntax: string = 'help [commande]';
  public longDescription: string[] = [
    'Utilisez la commande help pour afficher toutes les commandes disponibles.',
    'Ajoutez le nom d’une commande pour obtenir son explication détaillée.',
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
        console.log(`> ${this.commands[index].syntax}`);
        console.log(`> ${'-'.repeat(`${this.commands[index].syntax}`.length)}`);
        console.log(`> ${this.commands[index].description}`);
        console.log(`> `);

        for (let line of this.commands[index].longDescription) {
          console.log(`> ${line}`);
        }
        console.log('> ');
      }
    }
  }
}

export default HelpCommand;

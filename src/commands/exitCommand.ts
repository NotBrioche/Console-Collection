import Command from '../command';

class ExitCommand implements Command {
  name: string = 'exit';
  description: string = "Ferme l'application";
  syntax: string = 'exit';
  longDescription: string[] = [];
  async execute(args: string[]): Promise<void> {}
}

export default ExitCommand;

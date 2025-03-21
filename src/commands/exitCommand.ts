import Command from '../command';

class ExitCommand implements Command {
  name: string = 'exit';
  description: string = "Ferme l'application";
  syntax: string = 'exit';
  longDescription: string[] = [];
  async execute(args: string[] | null): Promise<void> {}
}

export default ExitCommand;

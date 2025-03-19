import Command from '../command';

class ExitCommand implements Command {
  name: string = 'exit';
  description: string = "Ferme l'application";
  syntax: string = 'exit';
  longDescription?: string | undefined;
  execute(): void {}
}

export default ExitCommand;

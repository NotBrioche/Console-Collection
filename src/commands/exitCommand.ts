import Command from '../command';

class ExitCommand implements Command {
  name: string = 'exit';
  description: string = 'Ferme proprement le programme';
  syntax: string = 'exit';
  longDescription: string[] = [
    'Utilisez la commande exit pour fermer l’application.',
    'Fermer leprogramme sans la commande exit peut mener a des pertes de progression.',
  ];
  async execute(args: string[]): Promise<void> {}
}

export default ExitCommand;

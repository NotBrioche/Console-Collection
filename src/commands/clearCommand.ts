import { clear } from 'console';
import Command from '../command';

class ClearCommand implements Command {
  name: string = 'clear';
  description: string = "Vide l'affichage de la console";
  syntax: string = 'clear';
  longDescription: string[] = [
    'Utilisez la commande clear pour nettoyer l’affichage.',
  ];
  async execute(args: string[]): Promise<void> {
    clear();
  }
}

export default ClearCommand;

import { clear } from 'console';
import Command from '../command';

class ClearCommand implements Command {
  name: string = 'clear';
  description: string = 'Efface la console';
  syntax: string = 'clear';
  longDescription: string[] = [];
  async execute(args: string[] | null): Promise<void> {
    clear();
  }
}

export default ClearCommand;

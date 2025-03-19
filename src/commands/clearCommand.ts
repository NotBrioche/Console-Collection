import { clear } from 'console';
import Command from '../command';

class ClearCommand implements Command {
  name: string = 'clear';
  description: string = 'Efface la console';
  syntax: string = 'clear';
  longDescription?: string | undefined;
  execute(): void {
    clear();
  }
}

export default ClearCommand;

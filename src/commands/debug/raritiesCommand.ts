import Command from '../../command';
import { rarities } from '../../consts';
import { printWithRarityColor } from '../../utils';

class RaritiesDebugCommand implements Command {
  name: string = 'rarities';
  description: string = 'Print all rarities with their colors';
  syntax: string = 'rarities';
  longDescription: string[] = [];

  async execute(args: string[]): Promise<void> {
    console.log('\x1b[41m' + '> DEBUG' + '\x1b[0m');

    for (let i = 0; i < rarities.length; i++) {
      console.log(printWithRarityColor(rarities[i], i));
    }
  }
}

export default RaritiesDebugCommand;

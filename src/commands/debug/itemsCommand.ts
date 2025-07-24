import Command from '../../command';
import { rarities } from '../../consts';
import Game from '../../game';
import Item from '../../item';
import all from '../../../data/all.json';
import { getAllPossibleToGetItems, printWithRarityColor } from '../../utils';

class ItemsDebugCommand implements Command {
  name: string = 'items';
  description: string = 'Print item stats';
  syntax: string = 'items';
  longDescription: string[] = [];

  game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  async execute(args: string[]): Promise<void> {
    console.log('\x1b[41m' + '> DEBUG' + '\x1b[0m');

    console.log('No Condition : ');
    for (let i = 0; i < rarities.length; i++) {
      let items = all.items as Item[];
      items = items.filter(
        (item) => item.rarity == i && item.conditions == null
      );

      console.log(printWithRarityColor(rarities[i], i) + ' : ' + items.length);
    }
  }
}

export default ItemsDebugCommand;

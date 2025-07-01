import Command from '../../command';
import Game from '../../game';
import all from '../../../data/all.json';
import CompactItem from '../../compact_item';

class AllDebugCommand implements Command {
  name: string = 'givemeverything';
  description: string = 'Unlock every possible Item for the player';
  syntax: string = 'givemeverything';
  longDescription: string[] = [];

  game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  async execute(args: string[]): Promise<void> {
    console.log('\x1b[41m' + '> DEBUG' + '\x1b[0m');

    for (let i = 0; i < all.total; i++) {
      this.game.player.addItem(
        new CompactItem(
          i + 1,
          Math.random(),
          Math.floor(Math.random() * 1024) == 0 ? true : false
        )
      );
    }
  }
}

export default AllDebugCommand;

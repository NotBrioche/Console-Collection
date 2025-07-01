import Command from '../../command';
import Game from '../../game';
import CompactItem from '../../compact_item';

class GiveDebugCommand implements Command {
  name: string = 'give';
  description: string = 'Unlock a specific Item for the player';
  syntax: string = 'give {id}';
  longDescription: string[] = [];

  game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  async execute(args: string[]): Promise<void> {
    console.log('\x1b[41m' + '> DEBUG' + '\x1b[0m');

    if (args.length < 1) {
      console.log('Please provide the id of the item to give.');
      return;
    }

    this.game.player.addItem(
      new CompactItem(
        Number(args[1]) + 1,
        Math.random(),
        Math.floor(Math.random() * 1024) == 0 ? true : false
      )
    );
  }
}

export default GiveDebugCommand;

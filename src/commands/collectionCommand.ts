import Command from '../command';
import Game from '../game';
import Item from '../item';

class CollectionCommand implements Command {
  name: string = 'collection';
  description: string = "Vous permet d'afficher votre collection";
  syntax: string = 'collection [item]';
  longDescription: string[] = [];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    if (args == null || args.length < 1) {
      const appeared: string[] = [];

      if (this.game.player.collection.length < 1) {
        console.log("> Vous n'avez rien trouvé pour l'instant");
        return;
      }

      for (let item of this.game.player.collection) {
        if (appeared.includes(item.name)) continue;

        const instances = this.game.player.collection.filter(
          (dup) => dup.name == item.name
        );
        const count = instances.length;

        console.log(`> ${item.id}: ${item.name} (${count})`);

        appeared.push(item.name);
      }
      console.log('> ');
    } else {
      let filtered;
      if (isNaN(Number.parseInt(args[0]))) {
        filtered = this.game.player.collection.filter(
          (item) => item.name == args[0]
        );
      } else {
        filtered = this.game.player.collection.filter(
          (item) => item.id == Number.parseInt(args[0])
        );
      }

      for (let item of filtered) {
        console.log('> ----------');
        console.log(
          `> ${item.rareVariant ? '\x1b[33m' + item.name + ' [Rare]' + '\x1b[0m' : item.name}`
        );
        console.log('> ----------');
        console.log(`> ${item.description}`);
        console.log(`> Rareté : ${Item.rarities[item._rarity]}`);
        console.log(`> Qualité : ${item.quality}`);
        console.log('> ');
      }
    }
  }
}

export default CollectionCommand;

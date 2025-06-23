import Command from '../command';
import Game from '../game';
import Item from '../item';
import Utils from '../utils';

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

      console.log('> ');

      if (this.game.player.collection.length < 1) {
        console.log("> Vous n'avez rien trouvé pour l'instant");
        return;
      }

      for (let item of this.game.player.collection.sort(
        (a, b) => a.id - b.id
      )) {
        if (appeared.includes(item.name)) continue;

        const instances = this.game.player.collection.filter(
          (dup) => dup.name == item.name
        );
        const count = instances.length;

        console.log(
          `> ${item.id}: ${Utils.printWithRarityColor(`${item.name}`, item.rarity)} (${count})`
        );

        appeared.push(item.name);
      }
      console.log('> ');
    } else {
      let filtered: Item[];
      if (isNaN(Number.parseInt(args[0]))) {
        filtered = this.game.player.collection.filter(
          (item) => item.name == args[0]
        );
      } else {
        filtered = this.game.player.collection.filter(
          (item) => item.id == Number.parseInt(args[0])
        );
      }

      console.log('> ');
      console.log(
        `> ${Utils.printWithRarityColor(Item.rarities[filtered[0].rarity], filtered[0].rarity)} - ${filtered[0].name}`
      );
      console.log(`> ${'-'.repeat(filtered[0].description.length)}`);
      console.log(`> ${filtered[0].description}`);
      console.log('> ');
      for (let item of filtered
        .sort((a, b) => b.quality! - a.quality!)
        .sort((a, b) => Number(b.rareVariant!) - Number(a.rareVariant!))) {
        console.log(
          `> ${item.rareVariant ? '\x1b[33m' + `[Rare] ${item.name}` + '\x1b[0m' : item.name} - ${item.quality}`
        );
      }
      console.log('> ');
    }
  }
}

export default CollectionCommand;

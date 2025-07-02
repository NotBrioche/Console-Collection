import Command from '../command';
import Game from '../game';
import Item from '../item';
import * as utils from '../utils';

class CollectionCommand implements Command {
  name: string = 'collection';
  description: string = 'Affiche la collection du joueur';
  syntax: string = 'collection [nom|id]';
  longDescription: string[] = [
    'Utilisez la commande collection pour afficher l’ensemble de votre collection personnelle.',
    'Ajoutez le nom ou l’ID d’un objet pour consulter sa fiche détaillée.',
  ];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    if (args == null || args.length < 1) {
      if (this.game.player.collection.length < 1) {
        console.log(
          '> ' + '-'.repeat("Vous n'avez rien trouvé pour l'instant".length)
        );
        console.log("> Vous n'avez rien trouvé pour l'instant");
        console.log('> ');

        return;
      }

      // TODO revamp

      const appeared: number[] = [];
      for (let item of this.game.player.collection.sort(
        (a, b) => a.id - b.id
      )) {
        if (appeared.includes(item.id)) continue;

        const duplicates = this.game.player.collection.filter(
          (dup) => dup.id == item.id
        );

        if (appeared.length < 1) {
          console.log(
            `> ${'-'.repeat(
              `${item.id}: ${item.name} (${duplicates.length})`.length
            )}`
          );
        }

        console.log(
          `> ${item.id}: ${utils.printWithRarityColor(
            `${item.name}`,
            item.rarity
          )} (${duplicates.length})`
        );

        appeared.push(item.id);
      }
      console.log('> ');
    } else {
      let filtered: Item[] = [];
      if (isNaN(Number.parseInt(args[0]))) {
        if (args.length > 1) {
          const full: string = args.join(' ');
          filtered = this.game.player.collection.filter(
            (item) => item.name == full
          );
        }

        if (filtered.length < 1) {
          filtered = this.game.player.collection.filter(
            (item) => item.name == args[0]
          );
        }
      } else {
        filtered = this.game.player.collection.filter(
          (item) => item.id == Number.parseInt(args[0])
        );
      }

      if (filtered.length > 0) {
        console.log(
          `> ${'-'.repeat(
            `${Item.rarities[filtered[0].rarity]} - ${filtered[0].name}`.length
          )}`
        );
        console.log(
          `> ${utils.printWithRarityColor(
            Item.rarities[filtered[0].rarity],
            filtered[0].rarity
          )} - ${filtered[0].name}`
        );
        console.log(
          `> ${'-'.repeat(
            `${Item.rarities[filtered[0].rarity]} - ${filtered[0].name}`.length
          )}`
        );
        console.log(`> ${filtered[0].collection} | ${filtered[0].description}`);
        console.log('> ');
      }
      for (let item of filtered
        .sort((a, b) => b.quality! - a.quality!)
        .sort((a, b) => Number(b.rareVariant!) - Number(a.rareVariant!))) {
        console.log(
          `> ${
            item.rareVariant ? '\x1b[33m' + '[Rare] ' + '\x1b[0m' : ''
          }${utils.printWithRarityColor(`${item.name}`, item.rarity)} - ${
            item.quality
          }`
        );
      }
      console.log('> ');
    }
  }
}

export default CollectionCommand;

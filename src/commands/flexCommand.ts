import Command from '../command';
import Game from '../game';
import * as utils from '../utils';

class FlexCommand implements Command {
  name: string = 'flex';
  description: string =
    'Affiche les objets avec la meilleure qualitée du joueur';
  syntax: string = 'flex [nombre]';
  longDescription: string[] = [
    "La commande flex permet d'afficher les objets du joueur avec la meilleure qualitée",
    'Par défaut les 5 meilleurs objets sont affichés.',
    "Le paramètre [nombre] permet de changer le nombre d'objets à afficher",
  ];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    if (this.game.player.collection.length < 1) {
      console.log(
        '> ' + '-'.repeat("Vous n'avez rien trouvé pour l'instant".length)
      );
      console.log("> Vous n'avez rien trouvé pour l'instant");
      console.log('> ');

      return;
    }

    if (args.length > 0 && isNaN(Number(args[0]))) {
      console.log(`> ${'-'.repeat('Veuillez entrer un nombre valide'.length)}`);
      console.log('> Veuillez entrer un nombre valide');
      console.log('> ');
      return;
    }

    const bestItems = this.game.player.collection
      .sort((a, b) => b.quality! - a.quality!)
      .sort((a, b) => Number(b.rareVariant!) - Number(a.rareVariant!));

    let limit = 5;

    if (args.length > 0) {
      limit = Number(args[0]);
    }

    console.log(
      '> ' +
        '-'.repeat(
          `> ${bestItems[0].id}: ${
            bestItems[0].rareVariant ? '\x1b[33m' + '[Rare]' + '\x1b[0m' : ''
          } ${utils.printWithRarityColor(
            `${bestItems[0].name}`,
            bestItems[0].rarity
          )} (${bestItems[0].quality})`.length -
            (bestItems[0].rareVariant
              ? 11 + utils.printWithRarityColor('', bestItems[0].rarity).length
              : 0 + utils.printWithRarityColor('', bestItems[0].rarity).length)
        )
    );

    for (let i = 0; i < limit; i++) {
      if (i == bestItems.length) {
        break;
      }

      const item = bestItems[i];

      console.log(
        `> ${item.id}: ${
          item.rareVariant ? '\x1b[33m' + '[Rare] ' + '\x1b[0m' : ''
        }${utils.printWithRarityColor(`${item.name}`, item.rarity)} (${
          item.quality
        })`
      );
    }
    console.log('> ');
  }
}

export default FlexCommand;

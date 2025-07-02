import Command from '../command';
import '../extensions/date.extension';
import Game from '../game';

class SellCommand implements Command {
  name: string = 'sell';
  description: string = 'Permet de vendre des objets listés dans le shop';
  syntax: string = 'sell {1-3}';
  longDescription: string[] = [
    // TODO Complete
  ];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    if (this.game.shop.sells.length < 1) {
      console.log(
        `> ${'-'.repeat("Aucun article n'est disponible pour la vente".length)}`
      );
      console.log("> Aucun article n'est disponible pour la vente");
      console.log('> ');

      return;
    }

    if (args.length < 1) {
      console.log(
        `> ${'-'.repeat(
          "Veuillez entrer le numéro de l'objet à vendre (1-3)".length
        )}`
      );
      console.log("> Veuillez entrer le numéro de l'objet à vendre (1-3)");
      console.log('> ');

      return;
    }

    if (
      isNaN(Number(args[0])) ||
      Number(args[0]) < 1 ||
      Number(args[0]) > this.game.shop.sells.length
    ) {
      console.log(
        `> ${'-'.repeat(
          `> Veuillez entrer un numéro entre 1 et ${this.game.shop.sells.length}`
            .length
        )}`
      );
      console.log(
        `> Veuillez entrer un numéro entre 1 et ${this.game.shop.sells.length}`
      );
      console.log('> ');

      return;
    }

    const item = this.game.player.collection.filter(
      (x) =>
        x.id == this.game.shop.sells[Number(args[0]) - 1].id &&
        x.quality == this.game.shop.sells[Number(args[0]) - 1].quality &&
        x.rareVariant == this.game.shop.sells[Number(args[0]) - 1].rareVariant
    )[0];

    console.log(`> +${this.game.shop.sellPrices[Number(args[0]) - 1]} Zynthar`);
    console.log('> ');

    this.game.player.money += this.game.shop.sellPrices[Number(args[0]) - 1];

    this.game.player.removeItem(item);
    this.game.shop.removeSell(item);
  }
}

export default SellCommand;

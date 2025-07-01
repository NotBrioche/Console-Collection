import { getDefaultHighWaterMark } from 'stream';
import Command from '../command';
import '../extensions/date.extension';
import Game from '../game';
import Item from '../item';

class BuyCommand implements Command {
  name: string = 'buy';
  description: string = "Permet d'acheter des objets listés dans le shop";
  syntax: string = 'buy';
  longDescription: string[] = ['A COMPLETER'];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    if (this.game.shop.buys.length < 1 && this.game.shop.energies == 0) {
      console.log(
        `> ${'-'.repeat("Aucun article n'est disponible pour l'achat".length)}`
      );
      console.log("> Aucun article n'est disponible pour l'achat");
      console.log('> ');

      return;
    }

    if (args.length < 1) {
      console.log(
        `> ${'-'.repeat("Veuillez entrer le numéro de l'objet à acheter (1-3)".length)}`
      );
      console.log("> Veuillez entrer le numéro de l'objet à acheter (1-3)");
      console.log('> ');

      return;
    }

    if (
      isNaN(Number(args[0])) ||
      Number(args[0]) < 1 ||
      Number(args[0]) > this.game.shop.buys.length + 1
    ) {
      console.log(
        `> ${'-'.repeat(`> Veuillez entrer un numéro entre 1 et ${this.game.shop.buys.length + 1}`.length)}`
      );
      console.log(
        `> Veuillez entrer un numéro entre 1 et ${this.game.shop.buys.length + 1}`
      );
      console.log('> ');

      return;
    }

    if (Number(args[0]) == 1) {
      if (this.game.player.energy == 100) {
        console.log("> Vous avez déjà le maximum d'énergie");
        console.log('> ');

        return;
      }

      if (
        this.game.shop.energies > 1 &&
        this.game.player.money >= this.game.shop.energyPrice
      ) {
        console.log('> +20 Energie');
        console.log('> ');

        this.game.player.energy += 20;
        this.game.player.money -= this.game.shop.energyPrice;
        this.game.shop.energies--;
      } else if (this.game.shop.energies < 1) {
        console.log("> Plus d'énergies en vente");
        console.log('> ');
      } else {
        console.log("> Vous n'avez pas assez d'argent");
        console.log('> ');
      }
    } else {
      if (
        this.game.player.money >= this.game.shop.buyPrices[Number(args[0]) - 2]
      ) {
        const item = this.game.shop.buys[Number(args[0]) - 2] as Item;

        console.log(`> +1 ${item.name}`);
        console.log('> ');

        this.game.player.money -= this.game.shop.buyPrices[Number(args[0]) - 2];
        this.game.player.addItem(Item.toCompact(item));
        this.game.shop.removeBuy(Number(args[0]) - 2);
      } else {
        console.log("> Vous n'avez pas assez d'argent");
        console.log('> ');
      }
    }
  }
}

export default BuyCommand;

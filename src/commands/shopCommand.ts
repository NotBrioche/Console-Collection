import Command from '../command';
import '../extensions/date.extension';
import Game from '../game';

class ShopCommand implements Command {
  name: string = 'shop';
  description: string = "Vous permet d'accéder au shop";
  syntax: string = 'shop';
  longDescription: string[] = [
    // TODO Complete
  ];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    const title = `> ${this.game.player.username} - ${this.game.player.money} Zynthar`;

    console.log(`> ${'-'.repeat(title.length)}`);
    console.log(title);
    console.log(`> ${'-'.repeat(title.length)}`);

    console.log('> Propositions de ventes (sell) :');
    for (let i = 0; i < 3; i++) {
      if (i < this.game.shop.sells.length) {
        console.log(
          `> ${i + 1}) ${this.game.shop.sells[i].name} - ${
            this.game.shop.sellPrices[i]
          } Zynthar`
        );
      } else {
        console.log(`> ${i + 1}) -`);
      }
    }

    console.log('>');
    console.log('> Articles en vente (buy) :');
    console.log(
      `> 1) +20 Energie - ${this.game.shop.energyPrice} Zynthar : ${this.game.shop.energies}/20`
    );
    for (let i = 0; i < 2; i++) {
      if (i < this.game.shop.buys.length) {
        console.log(
          `> ${i + 2}) ${this.game.shop.buys[i].name} - ${
            this.game.shop.buyPrices[i]
          } Zynthar`
        );
      } else {
        console.log(`> ${i + 2}) -`);
      }
    }

    console.log('>');
  }
}

export default ShopCommand;

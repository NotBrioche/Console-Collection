import Command from '../command';
import '../extensions/date.extension';
import Game from '../game';

class ShopCommand implements Command {
  name: string = 'shop';
  description: string = "Vous permet d'accéder au shop";
  syntax: string = 'shop';
  longDescription: string[] = ['A COMPLETER'];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    const title = `> ${this.game.player.username} - ${this.game.player.money} Zynthar`;

    console.log(`> ${'-'.repeat(title.length)}`);
    console.log(title);
    console.log(`> ${'-'.repeat(title.length)}`);

    for (let i = 0; i < this.game.shop.items.length; i++) {
      console.log(
        `> ${this.game.shop.items[i].id} ${this.game.shop.items[i].name} - ${this.game.shop.prices[i]} Zynthar`
      );
    }

    console.log('>');
    console.log(`> 20 Energie : 10/10 - 750 Zynthar`);

    console.log('>');
  }
}

export default ShopCommand;

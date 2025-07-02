import Command from '../command';
import '../extensions/date.extension';
import Game from '../game';
import { lands } from '../consts';

class TravelCommand implements Command {
  name: string = 'travel';
  description: string = 'Vous permet de changer de destination';
  syntax: string = 'travel';
  longDescription: string[] = [
    // TODO Complete
  ];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    if (args.length < 1) {
      console.log(
        `> ${'-'.repeat(
          `1) ${lands[this.game.player.land.destinations[0]].name}`.length
        )}`
      );

      for (let i = 0; i < this.game.player.land.destinations.length; i++) {
        const destinationId = this.game.player.land.destinations[i];

        console.log(`> ${i + 1}) ${lands[destinationId].name}`);
      }
    } else {
      if (isNaN(Number(args[0]))) {
        console.log('> Veuillez entrer un nombre valide');
        return;
      }

      if (
        Number(args[0]) < 0 ||
        Number(args[0]) > this.game.player.land.destinations.length
      ) {
        console.log(
          `> Veuillez entrer un nombre entre 1 et ${this.game.player.land.destinations.length}`
        );
        return;
      }

      const destination =
        lands[this.game.player.land.destinations[Number(args[0]) - 1]];

      if (
        this.game.player.energy >= destination.energyCost &&
        this.game.player.money >= destination.moneyCost
      ) {
        this.game.player.land = destination;
        this.game.player.energy -= destination.energyCost;
        this.game.player.money -= destination.moneyCost;
      } else {
        console.log("> Vous n'avez pas assez d'énergie ou d'argent");
      }
    }

    console.log('> ');
  }
}

export default TravelCommand;

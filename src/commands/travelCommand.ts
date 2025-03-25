import Command from '../command';
import Game from '../game';
import Region from '../region';

class TravelCommand implements Command {
  name: string = 'travel';
  description: string = 'Vous permet de vous déplacer';
  syntax: string = 'travel [distance]';
  longDescription: string[] = [];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[] | null): Promise<void> {
    if (this.game.player.power < 10) {
      console.log("> Vous n'avez pas assez d'énergie pour voyager");
      console.log('> ');
      return;
    }
    
    this.game.player.power -= 10;
    this.game.player.region = Region.random();

    console.log(
      `> Vous êtes maintenant dans ${this.game.player.region.gender ? 'un' : 'une'} ${this.game.player.region.name.toLowerCase()}`
    );
    console.log('> ');
  }
}

export default TravelCommand;

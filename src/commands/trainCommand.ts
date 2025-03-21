import Command from '../command';
import Game from '../game';
import Player from '../player';

class TrainCommand implements Command {
  name: string = 'train';
  description: string = "Permet de gagner de l'énergie";
  syntax: string = 'train';
  longDescription: string[] = [];
  player: Player;
  game: Game;

  constructor(game: Game, player: Player) {
    this.game = game;
    this.player = player;
  }

  async execute(args: string[] | null): Promise<void> {
    if (this.player.power >= 100) {
      console.log("> Vous avez déjà le maximum d'énergie");
      console.log('> ');
      return;
    } else {
      let correct: boolean = true;
      while (correct) {
        const first = Math.floor(Math.random() * 6);
        const second = Math.floor(Math.random() * 6);

        const rep = await this.game.rl.question(`> ${first} + ${second} = `);

        if (
          isNaN(Number.parseInt(rep)) ||
          Number.parseInt(rep) != first + second
        ) {
          correct = false;
        }
      }
    }
    console.log('> ');
  }
}

export default TrainCommand;

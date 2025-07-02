import Command from '../command';
import '../extensions/date.extension';
import Game from '../game';

class RewardCommand implements Command {
  name: string = 'reward';
  description: string = "Affiche le temps restant avant le plein d'énergie";
  syntax: string = 'reward';
  longDescription: string[] = [
    // TODO Complete
  ];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    const secondsLeft = (this.game.player.reward - Date.now()) / 1000;

    if (secondsLeft < 0) {
      console.log(
        '> Vous allez recevoir votre récompense lors de votre prochaine connexion!'
      );
    } else {
      console.log(
        `> ${'-'.repeat(
          `${Math.floor(secondsLeft / 60 / 60)}h ${Math.floor(
            (secondsLeft / 60) % 60
          )}m ${Math.floor((secondsLeft % 60) % 60)}s`.length
        )}`
      );

      console.log(
        `> ${Math.floor(secondsLeft / 60 / 60)}h ${Math.floor(
          (secondsLeft / 60) % 60
        )}m ${Math.floor((secondsLeft % 60) % 60)}s`
      );
    }

    console.log('> ');
  }
}

export default RewardCommand;

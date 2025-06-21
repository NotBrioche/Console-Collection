import Command from '../command';
import Game from '../game';

class TrainCommand implements Command {
  name: string = 'train';
  description: string = "Permet de gagner de l'énergie";
  syntax: string = 'train';
  longDescription: string[] = [];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    if (this.game.player.energy >= 100) {
      console.log("> Vous avez déjà le maximum d'énergie");
      console.log('> ');
      return;
    } else {
      let difficulty = 0;

      while (true) {
        const first =
          Math.floor(Math.random() * 6) +
          (difficulty % 5) * Math.round(Math.random()) +
          Math.floor(Math.random() * difficulty);
        const second =
          Math.floor(Math.random() * 6) +
          (difficulty % 5) * Math.round(Math.random()) +
          Math.floor(Math.random() * difficulty);

        const ac: AbortController = new AbortController();
        const signal = ac.signal;

        const timeout = setTimeout(
          () => {
            ac.abort();
            clearTimeout(timeout);
          },
          2000 - difficulty * 10
        );

        const bilan = -1 + Math.floor(difficulty / 4);

        try {
          const rep = await this.game.rl.question(`> ${first} + ${second} = `, {
            signal,
          });
          if (
            isNaN(Number.parseInt(rep)) ||
            Number.parseInt(rep) != first + second
          ) {
            this.game.player.energy += bilan;
            console.log(`> Votre score : ${difficulty}`);
            console.log(`> Bilan : ${bilan > -1 ? '+' : ''}${bilan}`);
            break;
          }

          difficulty++;
        } catch (e) {
          this.game.player.energy += bilan;
          console.log(`> Votre score : ${difficulty}`);
          console.log(`> Bilan : ${bilan > -1 ? '+' : ''}${bilan}`);
          break;
        }
      }
    }
    console.log('> ');
  }
}

export default TrainCommand;

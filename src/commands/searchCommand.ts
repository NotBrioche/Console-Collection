import Command from '../command';
import Game from '../game';

class SearchCommand implements Command {
  name: string = 'search';
  description: string = 'Vous permet de chercher';
  syntax: string = 'search [duration] [item]';
  longDescription: string[] = [];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[] | null): Promise<void> {}
}

export default SearchCommand;

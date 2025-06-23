import Command from '../command';
import Game from '../game';
import Item from '../item';
import Utils from '../utils';

class SearchCommand implements Command {
  name: string = 'search';
  description: string = 'Vous permet de chercher';
  syntax: string = 'search [nombre] [objet]';
  longDescription: string[] = [
    "La commande search vous permet de partir à l'aventure pour espérer aller trouver des objets",
    'Vous pouvez définir le nombre de recherches à faires avec le paramètres [nombre] (1 par défaut)',
    'Il peut être utile de faire des recherches avec un objet spécifique, entrez son id ou son nom',
  ];
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  async execute(args: string[]): Promise<void> {
    if (args.length > 0 && isNaN(Number(args[0]))) {
      console.log('> Veuillez entrer un nombre valide');
      console.log('> ');
      return;
    }

    if (args.length > 1 && args[1].length < 1) {
      console.log('> Please enter a valid object to search with');
      console.log('> ');
      return;
    }

    if (this.game.player.energy == 0) {
      console.log("> Vous n'avez plus assez d'énergie");
      console.log('> ');

      return;
    }

    let searchesAmount = args.length > 0 ? Number(args[0]) : 1;

    for (let i = 0; i < searchesAmount; i++) {
      const ac = new AbortController();
      const signal = ac.signal;

      let loop = 0;

      const searchTime = Math.floor(Math.random() * 3);
      let total = 0;
      const searchingTimer = setInterval(() => {
        loop++;

        this.game.rl.write('.');

        const drain = 2 + Math.floor(Math.random() * 3);

        if (drain > this.game.player.energy) {
          this.game.rl.write(` | -${this.game.player.energy} energy\n`);

          this.tryGetItem(9);
          this.game.player.energy = 0;
          ac.abort();
          clearInterval(searchingTimer);
          searchesAmount = 0;
          return;
        }

        this.game.player.energy -= drain;
        total += drain;

        if (loop == searchTime + 3) {
          this.game.rl.write(` | -${total} energy\n`);
          this.tryGetItem();

          total = 0;
          ac.abort();
          clearInterval(searchingTimer);
        }
      }, 1000);

      while (true) {
        try {
          await this.game.rl.question('> ', { signal });
        } catch {
          break;
        }
      }

      console.log('> ');
    }
  }

  tryGetItem(chance: number = 3) {
    if (Math.floor(Math.random() * chance) == 0) {
      const items = Utils.getAllPossibleToGetItems(
        this.game.player,
        Utils.getRarity(),
        'search'
      );
      const item = items[Math.floor(Math.random() * items.length)];

      this.game.player.collection.push(Item.toOwned(item));
      console.log(
        `> +1 ${Utils.printWithRarityColor(Item.rarities[item.rarity], item.rarity)} ${item.name}`
      );
    } else {
      console.log("> Vous n'avez rien trouvé");
    }
  }
}

export default SearchCommand;

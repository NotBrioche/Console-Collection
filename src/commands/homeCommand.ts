import Command from '../command';
import '../extensions/date.extension';
import Player from '../player';
const createSeasonSolver = require('date-season');

const season = createSeasonSolver();

class HomeCommand implements Command {
  name: string = 'home';
  description: string = "Affiche la page d'accueil";
  syntax: string = 'home';
  longDescription?: string | undefined;
  player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  execute(): void {
    const now = new Date();
    const titleString = `${now.getDayName()} ${now.getDate()} ${now.getMonthName()} ${now.getFullYear()} - ${getSeason(now)} ${now.toLocaleTimeString().substring(0, 5)}`;

    console.log('> ');
    console.log(`> ${titleString}`);
    console.log(`> ${'-'.repeat(titleString.length)}`);
    console.log(
      `> ${this.player.username} - ${this.player.collection.length} / 372`
    );
    console.log(`> Energie : ${this.player.power} / 100`);
    console.log(`> ${'-'.repeat(titleString.length)}`);
    console.log('> Tapez "help" pour lister les commandes utilisables.');
    console.log('> ');
  }
}

function getSeason(date: Date) {
  const s = season(date);

  switch (s) {
    case 'Spring':
      return 'Printemps';
    case 'Summer':
      return 'Été';
    case 'Autumn':
      return 'Automne';
    case 'Winter':
      return 'Hiver';
  }
}

export default HomeCommand;

import Command from '../command';
import '../extensions/date.extension';
import Player from '../player';
import Utils from '../utils';

class HomeCommand implements Command {
  name: string = 'home';
  description: string = "Affiche la page d'accueil";
  syntax: string = 'home';
  longDescription: string[] = [
    'Utilisez la commande home pour afficher la page principale de votre interface.',
  ];
  player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  async execute(args: string[]): Promise<void> {
    const now = new Date();

    const titleString = `${now.getDayName()} ${now.getDate()} ${now.getMonthName()} ${now.getFullYear()} - ${Utils.getSeasonName()} ${now.toLocaleTimeString(
      'fr-FR',
      { hour: '2-digit', minute: '2-digit' }
    )} ${Utils.getTimeEmoji()}`;

    console.log(`> ${'-'.repeat(titleString.length - 2)}`);
    console.log(`> ${titleString}`);
    console.log(`> ${'-'.repeat(titleString.length - 2)}`);
    console.log(`> [ ${this.player.land.name} ]`);
    console.log('> ');
    console.log(
      `> ${this.player.username} - ${this.player.collection.length} / 372`
    );
    console.log(`> Energie : ${this.player.energy} / 100`);
    console.log(`> Pièces : ${this.player.money}`);
    console.log(`> ${'-'.repeat(titleString.length - 2)}`);
    console.log('> Tapez "help" pour lister les commandes utilisables.');
    console.log('> ');
  }
}

export default HomeCommand;

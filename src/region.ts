import Near from './near';

class Region {
  id: number;
  gender: boolean;
  name: string;
  near: Near[];

  static readonly regions: Array<Region> = [
    new Region(0, false, 'Ville', [
      Near.byName('Voitures'),
      Near.byName('Bâtiments'),
    ]),
    new Region(1, false, 'Campagne', [
      Near.byName('Vaches'),
      Near.byName('Forêt'),
    ]),
    new Region(2, false, 'Plage', [Near.byName('Eau'), Near.byName('Sable')]),
    new Region(3, true, 'Désert', [Near.byName('Sable')]),
  ];

  constructor(id: number, gender: boolean, name: string, near: Near[]) {
    this.id = id;
    this.gender = gender;
    this.name = name;
    this.near = near;
  }

  static default(): Region {
    return Region.regions[0];
  }

  static random(): Region {
    return Region.regions[Math.floor(Math.random() * Region.regions.length)];
  }
}

export default Region;

class Near {
  id: string;
  name: string;

  static readonly nears: Array<Near> = [
    new Near('car', 'Voitures'),
    new Near('building', 'Bâtiments'),
    new Near('cow', 'Vaches'),
    new Near('forest', 'Forêt'),
    new Near('sand', 'Sable'),
    new Near('water', 'Eau'),
    new Near('mountain', 'Montagnes'),
  ];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public static byName(name: string): Near {
    return Near.nears.find((near) => near.name === name) ?? new Near('', '');
  }

  public static byId(id: string): Near {
    return Near.nears.find((near) => near.id === id) ?? new Near('', '');
  }
}

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

export { Region, Near };

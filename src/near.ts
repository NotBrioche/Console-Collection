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

export default Near;

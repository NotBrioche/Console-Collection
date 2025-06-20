class Land {
  id: number;
  name: string;
  destinations: Land[];

  constructor(id: number, name: string, destinations: Array<Land>) {
    this.id = id;
    this.name = name;
    this.destinations = destinations;
  }
}

export default Land;

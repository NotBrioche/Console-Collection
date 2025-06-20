class Land {
  id: number;
  name: string;
  destinations: Land[];

  constructor(id: number, name: string, destinations: Array<Land>) {
    this.id = id;
    this.name = name;
    this.destinations = destinations;
  }

  static default() {
    return new Land(0, 'Hey', []);
  }

  equals(other: Land) {
    return (
      this.id === other.id &&
      this.name === other.name &&
      this.destinations === other.destinations
    );
  }
}

export default Land;

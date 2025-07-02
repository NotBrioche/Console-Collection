class Land {
  name: string;
  destinations: number[];
  energyCost: number;
  moneyCost: number;

  constructor(
    name: string,
    destinations: Array<number>,
    energyCost: number,
    moneyCost = 0
  ) {
    this.name = name;
    this.destinations = destinations;
    this.energyCost = energyCost;
    this.moneyCost = moneyCost;
  }

  equals(other: Land) {
    return this.name === other.name && this.destinations === other.destinations;
  }
}

export default Land;

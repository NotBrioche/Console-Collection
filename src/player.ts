import Item from "./item";

class Player {
  power: number;
  collection: Array<Item>;

  constructor() {
    this.power = 0;
    this.collection = [];
  }
}

export default Player
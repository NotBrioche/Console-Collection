import Item from './item';

class Player {
  username: string;
  power: number;
  collection: Array<Item>;

  constructor(username: string, power: number = 100) {
    if (power > 100) power = 100;
    if (power < 0) power = 0;

    this.username = username;
    this.power = power;
    this.collection = [];
  }
}

export default Player;

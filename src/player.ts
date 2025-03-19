import Item from './item';

class Player {
  username: string;
  power: number;
  collection: Array<Item>;

  constructor(username: string) {
    this.username = username;
    this.power = 100;
    this.collection = [];
  }
}

export default Player;

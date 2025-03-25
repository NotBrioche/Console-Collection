import Game from './game';
import Item from './item';
import * as fs from 'fs';

class Player {
  public username: string;
  private _power: number;
  collection: Array<Item>;

  constructor(username: string, power: number = 100) {
    if (power > 100) power = 100;
    if (power < 0) power = 0;

    this.username = username;
    this._power = power;
    this.collection = [];
  }

  set power(value: number) {
    this._power = value;
    fs.writeFileSync(Game.playerDataPath, JSON.stringify(this), { flag: 'w' });
  }

  get power(): number {
    return this._power;
  }
}

export default Player;

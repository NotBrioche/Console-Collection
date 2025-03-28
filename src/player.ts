import Game from './game';
import Item from './item';
import * as fs from 'fs';
import { Region } from './region';

class Player {
  public username: string;
  private _power: number;
  private _region: Region;
  private _collection: Array<Item>;

  constructor(
    username: string,
    power: number = 100,
    region: Region = Region.default(),
    collection: Item[] = []
  ) {
    if (power > 100) power = 100;
    if (power < 0) power = 0;

    this.username = username;
    this._power = power;
    this._region = region;
    this._collection = collection;
  }

  set power(value: number) {
    this._power = value;
    fs.writeFileSync(Game.playerDataPath, JSON.stringify(this), { flag: 'w' });
  }

  get power(): number {
    return this._power;
  }

  set region(value: Region) {
    this._region = value;
    fs.writeFileSync(Game.playerDataPath, JSON.stringify(this), { flag: 'w' });
  }

  get region(): Region {
    return this._region;
  }

  get collection(): Item[] {
    return this._collection;
  }

  addItem(item: Item) {
    this._collection.push(item);
    fs.writeFileSync(Game.playerDataPath, JSON.stringify(this), { flag: 'w' });
  }
}

export default Player;

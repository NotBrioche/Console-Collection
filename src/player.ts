import Game from './game';
import Item from './item';
import * as fs from 'fs';
import Land from './land';

class Player {
  public username: string;
  private _energy: number;
  private _land: number;
  private _collection: Array<Item>;
  private _money: number;

  constructor(
    username: string,
    energy: number = 100,
    land: number = 0,
    collection: Item[] = [],
    money: number = 0
  ) {
    this.username = username;
    this._energy = energy;
    this._land = land;
    this._collection = collection;
    this._money = money;
  }

  set energy(value: number) {
    this._energy = value;
    fs.writeFileSync(Game.playerDataPath, JSON.stringify(this), { flag: 'w' });
  }

  get energy(): number {
    return this._energy;
  }

  set land(value: Land) {
    this._land = Land.lands.indexOf(value);
    fs.writeFileSync(Game.playerDataPath, JSON.stringify(this), { flag: 'w' });
  }

  get land(): Land {
    return Land.lands[this._land];
  }

  get collection(): Item[] {
    return this._collection;
  }

  addItem(item: Item) {
    this._collection.push(item);
    fs.writeFileSync(Game.playerDataPath, JSON.stringify(this), { flag: 'w' });
  }

  get money(): number {
    return this._money;
  }

  set money(value: number) {
    this._money = value;
    fs.writeFileSync(Game.playerDataPath, JSON.stringify(this), { flag: 'w' });
  }
}

export default Player;

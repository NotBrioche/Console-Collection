import Game from './game';
import * as fs from 'fs';
import Land from './land';
import CompactItem from './compact_item';
import Item from './item';
import Utils from './utils';

class Player {
  public username: string;
  private _energy: number;
  private _land: number;
  private _collection: Array<CompactItem>;
  private _money: number;

  constructor(
    username: string,
    energy: number = 100,
    land: number = 0,
    collection: CompactItem[] = [],
    money: number = 0
  ) {
    this.username = username;
    this._energy = energy;
    this._land = land;
    this._collection = collection;
    this._money = money;
  }

  set energy(value: number) {
    value = value > 100 ? 100 : value;

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
    const items = [];
    for (const compact of this._collection) {
      const item = Utils.getItemFromId(
        compact.id,
        compact.quality,
        compact.rareVariant
      );
      items.push(
        new Item(
          item.id,
          item.name,
          item.description,
          item.collection,
          null,
          item.rarity,
          item.quality,
          item.rareVariant
        )
      );
    }
    return items;
  }

  get uniquesItemsNumber(): number {
    const ids = [];

    for (const compact of this._collection) {
      ids.push(compact.id);
    }

    return [...new Set(ids)].length;
  }

  addItem(item: CompactItem) {
    this._collection.push(item);
    fs.writeFileSync(Game.playerDataPath, JSON.stringify(this), { flag: 'w' });
  }

  removeItem(item: Item) {
    for (let i = 0; i < this._collection.length; i++) {
      if (
        this._collection[i].id == item.id &&
        this._collection[i].quality == item.quality &&
        this._collection[i].rareVariant == item.rareVariant
      ) {
        this._collection.splice(i--, 1);
      }
    }

    fs.writeFileSync(Game.playerDataPath, JSON.stringify(this), { flag: 'w' });
  }

  get money(): number {
    return this._money;
  }

  set money(value: number) {
    value = value > 999999 ? 999999 : value;
    value = value < -999999 ? -999999 : value;
    this._money = value;
    fs.writeFileSync(Game.playerDataPath, JSON.stringify(this), { flag: 'w' });
  }
}

export default Player;

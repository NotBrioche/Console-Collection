import getAppDataPath from 'appdata-path';
import Item from './item';
import Player from './player';
import path from 'path';
import * as fs from 'fs';
import all from '../data/all.json';

class Shop {
  private _sells: Item[];
  private _buys: Item[];
  public energies: number;
  private multiplicator: number;

  constructor(
    player: Player,
    sells?: Item[],
    buys?: Item[],
    energies?: number,
    multiplicator?: number
  ) {
    if (player.collection.length > 10 && sells == null) {
      sells = player.collection
        .sort(() => Math.random() - 0.5)
        .slice(0, 5 + Math.floor(Math.random() * 3));
    }

    let energyToSell = energies ?? 10;
    if (buys == null) {
      buys = [];

      for (let i = 0; i < 10; i++) {
        if (Math.floor(Math.random() * 5) == 0) {
          const item = all.items[Math.floor(Math.random() * all.total)] as Item;

          buys.push(
            new Item(
              item.id,
              item.name,
              item.description,
              item.collection,
              null,
              item.rarity,
              Math.random(),
              Math.floor(Math.random() * 1024) == 0 ? true : false
            )
          );
        } else {
          energyToSell++;
        }
      }
    }

    this._sells = sells ?? [];
    this._buys = buys;
    this.energies = energyToSell;
    this.multiplicator = multiplicator ?? Math.random();
  }

  get sells() {
    return this._sells.slice(0, 3);
  }

  get buys() {
    return this._buys.slice(0, 2);
  }

  get sellPrices(): number[] {
    const prices: number[] = [];

    for (const item of this._sells) {
      prices.push(
        Math.round(
          1500 *
            item.quality! *
            this.multiplicator *
            (item.rareVariant ? 5 : 1) *
            ((item.rarity + 1) * 0.5)
        )
      );
    }

    return prices.slice(0, 3);
  }

  get buyPrices(): number[] {
    const prices: number[] = [];

    for (const item of this._buys) {
      prices.push(
        Math.round(
          3000 *
            item.quality! *
            this.multiplicator *
            (item.rareVariant ? 7 : 1) *
            ((item.rarity + 1) * 0.6)
        )
      );
    }

    return prices.slice(0, 2);
  }

  get energyPrice(): number {
    return Math.round(
      (750 * ((this._sells.length + 1) / 8)) /
        (this.multiplicator < 0.6
          ? this.multiplicator * 10
          : this.multiplicator)
    );
  }

  removeSell(item: Item) {
    for (let i = 0; i < this._sells.length; i++) {
      if (
        this._sells[i].id == item.id &&
        this._sells[i].quality == item.quality &&
        this._sells[i].rareVariant == item.rareVariant
      ) {
        this._buys.push(this._sells[i]);
        this._sells.splice(i--, 1);
      }
    }

    fs.writeFileSync(
      path.join(getAppDataPath('Console-Collection'), 'shop.json'),
      JSON.stringify(this),
      { flag: 'w' }
    );
  }

  removeBuy(index: number) {
    this._buys.splice(index, 1);

    fs.writeFileSync(
      path.join(getAppDataPath('Console-Collection'), 'shop.json'),
      JSON.stringify(this),
      { flag: 'w' }
    );
  }
}

export default Shop;

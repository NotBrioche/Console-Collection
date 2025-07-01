import Item from './item';
import Player from './player';

class Shop {
  private _items: Item[];
  private multiplicator: number;

  constructor(player: Player) {
    let items: Item[] = [];

    if (player.collection.length > 10) {
      items = player.collection.sort(() => Math.random() - 0.5).slice(0, 6);
    }

    this._items = items;
    this.multiplicator = Math.random();
  }

  get items() {
    return this._items.slice(0, 3);
  }

  get prices(): number[] {
    const prices: number[] = [];

    for (const item of this._items) {
      prices.push(
        Math.round(
          1500 *
            item.quality! *
            this.multiplicator *
            (item.rareVariant ? 25 : 1)
        )
      );
    }

    return prices.slice(0, 3);
  }
}

export default Shop;

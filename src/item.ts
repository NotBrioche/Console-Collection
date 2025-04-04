import Condition from './condition';

class Item {
  id: number;
  name: string;
  _rarity: number;
  description: string;
  collection: string;
  conditions: Condition | null | undefined;
  quality: number | null | undefined;
  rareVariant: boolean | null | undefined;

  get rarity() {
    return Item.rarity[this._rarity];
  }

  set rarity(value) {
    this._rarity = Item.rarity.indexOf(value);
  }

  public static rarity = [
    'Common',
    'Uncommon',
    'Rare',
    'Epic',
    'Legendary',
    'Secret',
  ];

  get details() {
    this.getObjectInfos();
    return null;
  }

  static toOwned(item: Item): Item {
    return new Item(
      item.id,
      item.name,
      item.description,
      item.collection,
      undefined,
      item._rarity,
      Math.random(),
      Math.floor(Math.random() * 500) == 0 ? true : false
    );
  }

  constructor(
    id: number,
    name: string,
    description: string,
    collection: string,
    conditions?: Condition | null | undefined,
    rarity?: number | null,
    quality?: number | null | undefined,
    rareVariant?: boolean | null | undefined
  ) {
    if (rarity != null && (rarity >= Item.rarity.length || rarity < 0)) {
      throw new Error(`Rarity must be between 0 and ${Item.rarity.length - 1}`);
    }

    this.id = id;
    this.name = name;
    this._rarity = rarity ?? 0;
    this.description = description;
    this.collection = collection;
    this.conditions = conditions;
    this.quality = quality;
    this.rareVariant = rareVariant;
  }

  public getObjectInfos() {
    console.log(`[ ${this.name} ] - ${this.rarity}`);
    console.log('-'.repeat(`| ${this.description}`.length));
    console.log(`| Qualité : ${this.quality}`);
    console.log('|');
    console.log(`| ${this.description}`);
    console.log('-'.repeat(`| ${this.description}`.length));
  }
}

export default Item;

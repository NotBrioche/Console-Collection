import Condition from './condition';

class Item {
  id: number;
  name: string;
  description: string;
  collection: string;
  _rarity: number;
  conditions: Condition | null | undefined;
  quality: number | null | undefined;
  rareVariant: boolean | null | undefined;

  public static rarities = [
    'Common',
    'Uncommon',
    'Rare',
    'Epic',
    'Legendary',
    'Secret',
  ];

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
    if (rarity != null && (rarity >= Item.rarities.length || rarity < 0)) {
      throw new Error(
        `Rarity must be between 0 and ${Item.rarities.length - 1}`
      );
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

  get rarity() {
    return Item.rarities[this._rarity];
  }

  set rarity(value) {
    this._rarity = Item.rarities.indexOf(value);
  }

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
      Math.floor(Math.random() * 1024) == 0 ? true : false
    );
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

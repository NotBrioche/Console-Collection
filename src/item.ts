class Item {
  name: string;
  _rarity: number;
  description: string;
  quality: number;
  collection: string;
  rareVariant: boolean;
  conditions: Array<string>;

  get rarity() {
    return Item.rarity[this._rarity];
  }

  set rarity(value) {
    this._rarity = Item.rarity.indexOf(value);
  }

  static rarity = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Secret'];

  get details() {
    this.getObjectInfos();
    return null;
  }

  constructor(
    name: string,
    description: string,
    quality: number,
    conditions: Array<string>,
    collection: string,
    rarity?: number | null,
    rareVariant?: boolean | null
  ) {
    if (rarity != null && (rarity >= Item.rarity.length || rarity < 0)) {
      throw new Error(`Rarity must be between 0 and ${Item.rarity.length - 1}`);
    }

    this.name = name;
    this._rarity = rarity ?? 0;
    this.description = description;
    this.quality = quality;
    this.collection = collection;
    this.rareVariant = rareVariant ?? false;
    this.conditions = conditions;
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

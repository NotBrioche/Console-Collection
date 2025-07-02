import CompactItem from './compact_item';
import Condition from './condition';
import { rarities } from './consts';

class Item {
  id: number;
  name: string;
  description: string;
  collection: string;
  rarity: number;
  conditions: Condition | null | undefined;
  quality: number | null | undefined;
  rareVariant: boolean | null | undefined;

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
    if (rarity != null && (rarity >= rarities.length || rarity < 0)) {
      throw new Error(
        `Rarity must be between 0 and ${rarities.length - 1}`
      );
    }

    this.id = id;
    this.name = name;
    this.rarity = rarity ?? 0;
    this.description = description;
    this.collection = collection;
    this.conditions = conditions;
    this.quality = quality;
    this.rareVariant = rareVariant;
  }

  static toCompact(item: Item): CompactItem {
    return new CompactItem(
      item.id,
      Math.random(),
      Math.floor(Math.random() * 1024) == 0 ? true : false
    );
  }

  equals(other: Item) {
    return (
      this.id === other.id &&
      this.name === other.name &&
      this.description === other.description &&
      this.collection === other.collection &&
      this.conditions === other.conditions &&
      this.quality === other.quality &&
      this.rareVariant === other.rareVariant
    );
  }
}

export default Item;

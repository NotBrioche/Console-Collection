class CompactItem {
  id: number;
  quality: number;
  rareVariant: boolean;

  constructor(id: number, quality: number, rareVariant: boolean) {
    this.id = id;
    this.quality = quality;
    this.rareVariant = rareVariant;
  }

  equals(other: CompactItem) {
    return (
      this.id === other.id &&
      this.quality === other.quality &&
      this.rareVariant === other.rareVariant
    );
  }
}

export default CompactItem;

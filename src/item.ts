class Item {
  name: string;
  _rarity: number;
  description: string;
  quality: number;
  conditions: Array<string>;

  constructor(
    name: string,
    description: string,
    quality: number,
    conditions: Array<string>,
    rarity?: number | null
  ) {
    this.name = name;
    this._rarity = rarity ?? 0;
    this.description = description;
    this.quality = quality;
    this.conditions = conditions;
  }

  get rarity() {
    switch (this._rarity) {
      default:
        return "Common";
      case 1:
        return "Uncommon";
      case 2:
        return "Rare";
      case 3:
        return "Epic";
      case 4:
        return "Legendary";
      case 5:
        return "Secret";
    }
  }

  set rarity(value) {
    switch (value) {
      default:
      case "Common":
        this._rarity = 0;
        break;
      case "Uncommon":
        this._rarity = 1;
        break;
      case "Rare":
        this._rarity = 2;
        break;
      case "Epic":
        this._rarity = 3;
        break;
      case "Legendary":
        this._rarity = 4;
        break;
      case "Secret":
        this._rarity = 5;
        break;
    }
  }

  getObjectInfos() {
    console.log(`[ ${this.name} ] - ${this.rarity}`);
    console.log("-".repeat(`| ${this.description}`.length));
    console.log(`| Qualitée : ${this.quality}`);
    console.log("|");
    console.log(`| ${this.description}`);
    console.log("-".repeat(`| ${this.description}`.length));
  }
}

export default Item;

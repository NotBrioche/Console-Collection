class ConditionStorage {
  action: string | undefined;
  time: string | undefined;
  season: string | undefined;
  item: string | undefined;
  moon: string | undefined;
  near: string[] | undefined;
  weather: string | undefined;
}

class Storage {
  id: number | undefined;
  name: string;
  description: string;
  rarity: number;
  collection: string;
  conditions: ConditionStorage | undefined;

  constructor(
    id: number | undefined,
    name: string,
    description: string,
    rarity: number,
    collection: string,
    conditions?: ConditionStorage
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.rarity = rarity;
    this.collection = collection;
    this.conditions = conditions;
  }
}

export { Storage, ConditionStorage };

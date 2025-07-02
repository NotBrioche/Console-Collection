import Land from './land';

class Condition {
  time: string | null | undefined;
  season: string | null | undefined;
  moonPhase: string | null | undefined;
  action: string | null | undefined;
  items: number[] | null | undefined;
  land: string | null | undefined;
  equipped: number | null | undefined;
  money: number | null | undefined;

  constructor(
    time?: string | null,
    season?: string | null,
    moonPhase?: string | null,
    action?: string | null,
    items?: number[] | null,
    land?: string | null,
    equipped?: number | null,
    money?: number | null
  ) {
    this.action = action;
    this.time = time;
    this.season = season;
    this.items = items;
    this.moonPhase = moonPhase;
    this.land = land;
    this.equipped = equipped;
    this.money = money;
  }

  equals(other: Condition): boolean {
    return (
      this.time == other.time &&
      this.season == other.season &&
      this.moonPhase == other.moonPhase &&
      this.action == other.action &&
      this.items == other.items &&
      this.land == other.land &&
      this.equipped == other.equipped &&
      this.money == other.money
    );
  }
}

export default Condition;

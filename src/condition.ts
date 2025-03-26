class Condition {
  action: string | null | undefined;
  time: string | null | undefined;
  season: string | null | undefined;
  item: number | null | undefined;
  moon: string | null | undefined;
  near: string[] | null | undefined;

  constructor(
    action?: string | null,
    time?: string | null,
    season?: string | null,
    item?: number | null,
    moon?: string | null,
    near?: string[] | null
  ) {
    this.action = action;
    this.time = time;
    this.season = season;
    this.item = item;
    this.moon = moon;
    this.near = near;
  }
}

export default Condition;

class Condition {
  action: string | null;
  time: string | null;
  season: string | null;
  item: number | null;
  moon: string | null;
  near: string[] | null;

  constructor(
    action: string | null,
    time: string | null,
    season: string | null,
    item: number | null,
    moon: string | null,
    near: string[] | null
  ) {
    this.action = action;
    this.time = time;
    this.season = season;
    this.item = item;
    this.moon = moon;
    this.near = near;
  }

  public static empty() {
    return new Condition(null, null, null, null, null, null);
  }
}

export default Condition;

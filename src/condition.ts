class Condition {
  action: string;
  time: string;
  season: string;
  item: number;
  moon: string;
  near: string[];

  constructor(
    action: string,
    time: string,
    season: string,
    item: number,
    moon: string,
    near: string[]
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

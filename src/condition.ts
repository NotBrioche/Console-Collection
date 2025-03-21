class Condition {
  action: string;
  time: string;
  season: string;
  item: number;

  constructor(action: string, time: string, season: string, item: number) {
    this.action = action;
    this.time = time;
    this.season = season;
    this.item = item;
  }
}

export default Condition;

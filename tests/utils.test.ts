import Player from '../src/player';
import * as utils from '../src/utils';

let player: Player;

beforeEach(() => {
  player = new Player('Brioche');
});

it('getAllPossibleToGetItems without other arguments will return only items with no conditions', () => {
  const result = utils.getAllPossibleToGetItems(player, 0);

  for (const item of result) {
    expect(item.conditions).toBe(null);
  }
});

it('getAllPossibleToGetItems with common rarity only returns common items', () => {
  const result = utils.getAllPossibleToGetItems(player, 0);

  for (const item of result) {
    expect(item.rarity).toBe(0);
  }
});

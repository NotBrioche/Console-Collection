import getAppDataPath from 'appdata-path';
import Player from '../src/player';
import Shop from '../src/shop';
import * as fs from 'fs';
import path from 'path';
import Item from '../src/item';
import CompactItem from '../src/compact_item';

let player: Player;
let shop: Shop;

jest.mock('fs');

beforeEach(() => {
  player = new Player('Brioche');
  shop = new Shop(player);
});

test('A new Shop with a player whos collection is less than 10 has correct default values', () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);

  expect(shop.sells.length).toBe(0);
  expect(shop.buys.length).toBeGreaterThanOrEqual(0);
  expect(shop.energies).toBeGreaterThanOrEqual(10);
});

test('If an item is bought, shop calls fs to save the data', () => {
  shop.removeBuy(0);

  expect(fs.writeFileSync).toHaveBeenCalledWith(
    path.join(getAppDataPath('Console-Collection'), 'shop.json'),
    JSON.stringify(shop),
    { flag: 'w' }
  );
});

test('If an item is sold, shop calls fs to save the data', () => {
  shop['_sells'] = [
    new Item(
      0,
      'Gravité',
      'ça existe',
      'Natural',
      null,
      0,
      Math.random(),
      false
    ),
  ];

  shop.removeSell(shop.sells[0]);

  expect(fs.writeFileSync).toHaveBeenCalledWith(
    path.join(getAppDataPath('Console-Collection'), 'shop.json'),
    JSON.stringify(shop),
    { flag: 'w' }
  );
});

test('If the collection of Player is greater or equal to 10 sells are in the Player collection', () => {
  for (let i = 0; i < 10; i++) {
    player.addItem(new CompactItem(i + 1, Math.random(), false));
  }

  shop = new Shop(player);

  for (const item of shop['_sells']) {
    expect(player.collection.includes(item));
  }
});

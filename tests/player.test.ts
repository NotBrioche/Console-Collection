import CompactItem from '../src/compact_item';
import Game from '../src/game';
import Item from '../src/item';
import Land from '../src/land';
import Player from '../src/player';
import * as fs from 'fs';
import Utils from '../src/utils';

jest.mock('fs');

let player: Player;

beforeEach(() => {
  player = new Player('Brioche');
});

const compactItems = [
  new CompactItem(1, 0.6523786523549, false),
  new CompactItem(2, 0.3248945621579, false),
  new CompactItem(3, 0.9842186577513, false),
  new CompactItem(4, 0.2435684231569, false),
  new CompactItem(5, 0.7561266584956, false),
];

function addFiveItemsToPlayer() {
  for (let i = 0; i < 5; i++) {
    player.addItem(compactItems[i]);
  }
}

test('A new Player named Brioche have correct default values', () => {
  expect(player.username).toBe('Brioche');
  expect(player.collection.length).toBe(0);
  expect(player.energy).toBe(100);
  expect(player.money).toBe(0);
  expect(player.land).toBe(Land.lands[0]);
});

describe('Player data saves', () => {
  test('When a Player energy is changed, fs writes player data to file', () => {
    player.energy = 0;
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      Game.playerDataPath,
      JSON.stringify(player),
      { flag: 'w' }
    );
  });

  test('When a Player land is changed, fs writes player data to file', () => {
    player.land = Land.lands[2];
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      Game.playerDataPath,
      JSON.stringify(player),
      { flag: 'w' }
    );
  });

  test('When a Player money is changed, fs writes player data to file', () => {
    player.money = 100;
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      Game.playerDataPath,
      JSON.stringify(player),
      { flag: 'w' }
    );
  });

  test('When a new Item is added from Player collection, fs writes player data to file', () => {
    player.addItem(new CompactItem(1, 0, false));

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      Game.playerDataPath,
      JSON.stringify(player),
      { flag: 'w' }
    );
  });

  test('When a new Item is removed from Player collection, fs writes player data to file', () => {
    player.removeItem(Utils.getItemFromId(1));

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      Game.playerDataPath,
      JSON.stringify(player),
      { flag: 'w' }
    );
  });
});

test('A player energy set with more than 100 caps it to 100', () => {
  player.energy = 1500;
  expect(player.energy).toBe(100);
});

test('A player money set with more than 999999 caps it to 999999', () => {
  player.money = 1000000;
  expect(player.money).toBe(999999);
});

test('A player money set with less than -999999 caps it to -999999', () => {
  player.money = -1000000;
  expect(player.money).toBe(-999999);
});

test('The getter of a player collection returns an array of Item', () => {
  expect(player.collection).toBeInstanceOf(Array<Item>);
});

test('The getter uniquesItemsNumber with 2 objets and 1 duplicate returns 2', () => {
  player.addItem(new CompactItem(1, 0.6523786523549, false));
  player.addItem(new CompactItem(2, 0.3248945621579, false));
  player.addItem(new CompactItem(1, 0.9842186577513, false));

  expect(player.uniquesItemsNumber).toBe(2);
});

test('The function removeItem Removes an Item from player collection', () => {
  addFiveItemsToPlayer();

  player.removeItem(
    Utils.getItemFromId(
      compactItems[1].id,
      compactItems[1].quality,
      compactItems[1].rareVariant
    )
  );

  expect(player.collection.length).toBe(4);
});

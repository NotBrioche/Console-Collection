import Condition from '../src/condition';
import Item from '../src/item';

describe('Item class', () => {
  test('An object created with the constructor has the right values', () => {
    const item = new Item(
      1,
      'Pierre',
      "C'est une pierre, elle peut vous porter compagnie",
      'Matériaux',
      new Condition(),
      0,
      Math.random(),
      true
    );

    expect(item.name).toBe('Pierre');
    expect(item.description).toBe(
      "C'est une pierre, elle peut vous porter compagnie"
    );
    expect(item.quality).toBeGreaterThan(0);
    expect(item.quality).toBeLessThan(1);
    expect(item.rareVariant).toBe(true);
    expect(item.collection).toBe('Matériaux');
    expect(item.rarity).toBe('Common');
    expect(item._rarity).toBe(0);
  });

  for (let i = 0; i < Item.rarities.length; i++) {
    test(`An object created with the constructor has the right rarity ${Item.rarities[i]}`, () => {
      const item = new Item(
        1,
        'Pierre',
        "C'est une pierre, elle peut vous porter compagnie",
        'Matériaux',
        new Condition(),
        i
      );

      expect(item.rarity).toBe(Item.rarities[i]);
    });
  }

  test('An object created with the constructor has the right rarity if the value is null', () => {
    const item = new Item(
      1,
      'Pierre',
      "C'est une pierre, elle peut vous porter compagnie",
      'Matériaux',
      new Condition(),
      null,
      Math.random()
    );

    expect(item.rarity).toBe('Common');
    expect(item._rarity).toBe(0);
  });

  test('An object created with the constructor throws an error if the value is out of bounds', () => {
    const act = () => {
      new Item(
        1,
        'Pierre',
        "C'est une pierre, elle peut vous porter compagnie",
        'Matériaux',
        new Condition(),
        6,
        Math.random()
      );
    };

    expect(act).toThrow(
      `Rarity must be between 0 and ${Item.rarities.length - 1}`
    );
  });

  test('details of an item calls the getObjectInfos method', () => {
    const item = new Item(
      1,
      'Pierre',
      "C'est une pierre, elle peut vous porter compagnie",
      'Matériaux',
      new Condition(),
      0,
      Math.random()
    );

    const spy = jest.spyOn(item, 'getObjectInfos');
    item.details;

    expect(spy).toHaveBeenCalled();
  });

  test('toOwned creates a new item with randomized quality and rareVariant', () => {
    const originalItem = new Item(
      1,
      'Pierre',
      "C'est une pierre, elle peut vous porter compagnie",
      'Matériaux',
      new Condition(),
      2,
      0.5,
      false
    );

    const ownedItem = Item.toOwned(originalItem);

    expect(ownedItem).not.toBe(originalItem);
    expect(ownedItem.id).toBe(originalItem.id);
    expect(ownedItem.name).toBe(originalItem.name);
    expect(ownedItem.description).toBe(originalItem.description);
    expect(ownedItem.collection).toBe(originalItem.collection);
    expect(ownedItem._rarity).toBe(originalItem._rarity);
    expect(ownedItem.quality).toBeGreaterThanOrEqual(0);
    expect(ownedItem.quality).toBeLessThan(1);
    expect(typeof ownedItem.rareVariant).toBe('boolean');
  });
});

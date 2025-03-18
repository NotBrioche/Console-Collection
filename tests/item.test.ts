import Item from "../src/item";

describe('Item class', () => {
  test('An object created with the constructor has the right values', () => {
    const item = new Item("Pierre", "C'est une pierre, elle peut vous porter compagnie", Math.random(), [], "Matériaux", 0);

    expect(item.name).toBe("Pierre");
    expect(item.description).toBe("C'est une pierre, elle peut vous porter compagnie");
    expect(item.quality).toBeGreaterThan(0);
    expect(item.quality).toBeLessThan(1);
    expect(item.collection).toBe("Matériaux");
    expect(item.rarity).toBe("Common");
    expect(item._rarity).toBe(0);
  });

  for (let i = 0; i < Item.rarity.length; i++) { 
    test(`An object created with the constructor has the right rarity ${Item.rarity[i]}`, () => {
      const item = new Item("Pierre", "C'est une pierre, elle peut vous porter compagnie", Math.random(), [], "Matériaux", i);
  
      expect(item.rarity).toBe(Item.rarity[i]);
    })
  }

  test('An object created with the constructor has the right rarity if the value is null', () => {
    const item = new Item("Pierre", "C'est une pierre, elle peut vous porter compagnie", Math.random(), [], "Matériaux", null);

    expect(item.rarity).toBe("Common");
    expect(item._rarity).toBe(0);
  })

  test('An object created with the constructor throws an error if the value is out of bounds', () => {
    const act = () => {
      new Item("Pierre", "C'est une pierre, elle peut vous porter compagnie", Math.random(), [], "Matériaux", 6);
    };

    expect(act).toThrow(`Rarity must be between 0 and ${Item.rarity.length - 1}`);
  }
  );

  test('details of an item calls the getObjectInfos method', () => { 
    const item = new Item("Pierre", "C'est une pierre, elle peut vous porter compagnie", Math.random(), [], "Matériaux", 0);

    const spy = jest.spyOn(item, "getObjectInfos");
    item.details;

    expect(spy).toHaveBeenCalled();
  })
});
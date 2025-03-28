import Condition from '../src/condition';

describe('Condition class', () => {
  test('A condition object is created with the right values', () => {
    const condition = new Condition('wait', 'night', 'winter', [12], 'full', [
      'water',
    ]);

    expect(condition.action).toBe('wait');
    expect(condition.time).toBe('night');
    expect(condition.season).toBe('winter');
    expect(condition.item).toStrictEqual([12]);
    expect(condition.moon).toBe('full');
    expect(condition.near).toStrictEqual(['water']);
  });

  test('A condition object can be created with only null values', () => {
    const condition = new Condition(null, null, null, null, null, null);

    expect(condition).toBe(condition);
  });
});

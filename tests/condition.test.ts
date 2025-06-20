import Condition from "../src/condition";

describe('Condition class', () => {
    test('A condition object can be created with only null values', () => {
      const result = new Condition();
      const condition = new Condition(null, null, null, null, null, null, null, null);

      expect(result.equals(condition));
    });
})
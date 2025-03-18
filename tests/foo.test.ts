import Foo from "../src/foo";

test("Addition of number 1 and 2 is equal to 3 with the addition function", () => {
  const foo = new Foo();

  expect(foo.add(1, 2)).toBe(3);
});

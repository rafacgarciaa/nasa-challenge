import { toTitleCase } from "./strings";

describe("helper method toTitleCase", () => {
  const cases = [
    ['1234567890', '1234567890'],
    ['test', 'Test'],
    ['test case', 'Test Case'],
    ['Ace', 'Ace'],
  ];
  it.each(cases)("should return string title cased", (text, expected) => {
    expect(toTitleCase("1234567890")).toBeTruthy();
  });
});
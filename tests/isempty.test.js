const isEmpty = require("../validation/isEmpty");

describe("Test the isEmpty function", () => {
  test("Function returns false for non-empty inputs", () => {
    expect(isEmpty("value")).toBeFalsy();
  });

  test("Function returns true for empty inputs", () => {
    expect(isEmpty("")).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();
  });
});

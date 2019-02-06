const login = require("../validation/login");

const invalidUser = { username: "@", password: "123" };
const emptyUser = { username: "", password: "" };

describe("Tests the error messages for the login validation", () => {
  test("Returns proper error message for invalid username and password", () => {
    const errors = login(invalidUser);
    expect(errors.errors.username).toEqual("Username is invalid");
    expect(errors.errors.password).toEqual("Password must have 5 character");
  });

  test("Returns proper error message for empty strings", () => {
    const errors = login(emptyUser);
    expect(errors.errors.username).toEqual("Username is required");
    expect(errors.errors.password).toEqual("Password is required");
  });
});

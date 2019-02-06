const request = require("supertest");
const app = require("../app");

const api = { login: "/api/v1/users/login" };
const invalidUser = { username: "@", password: "123" };
const emptyUser = { username: "", password: "" };
const validUser = { username: "admin", password: "admin1" };
const incorrectPassword = { username: "admin", password: "admin" };

describe("Tests the /user route with authentication", () => {
  test("If username and password invalid, returns an error", async () => {
    const response = await request(app)
      .post(api.login)
      .send(invalidUser);
    expect(response.status).toBe(400);
  });

  test("If no user is present, returns an error", async () => {
    const response = await request(app)
      .post(api.login)
      .send(emptyUser);
    expect(response.status).toBe(400);
  });

  test("If valid user with incorrect password, returns error", async () => {
    const response = await request(app)
      .post(api.login)
      .send(incorrectPassword);
    expect(response.status).toBe(400);
  });

  test("If valid user, returns JWT Token", async () => {
    const response = await request(app)
      .post(api.login)
      .send(validUser);
    expect(response.body.success).toBe(true);
    expect(response.body.token.split(" ").length).toBe(2);
    expect(response.body.token.split(" ")[0]).toBe("Bearer");
  });
});

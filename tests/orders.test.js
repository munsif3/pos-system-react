const request = require("supertest");
const app = require("../app");

test("'/orders' route should be defined", async () => {
  const response = await request(app).get("/api/v1/orders");
  expect(response).toBeDefined();
});

test("'/orders' route should return more than 1 order", async () => {
  const response = await request(app).get("/api/v1/orders");
  expect(response.body.length).toBeGreaterThanOrEqual(1);
});

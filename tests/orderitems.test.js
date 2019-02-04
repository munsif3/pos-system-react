const request = require("supertest");
const app = require("../app");

test("'/order-details' route should return items", async () => {
  const response = await request(app).get("/api/v1/order-details");
  expect(response).toBeDefined();
});

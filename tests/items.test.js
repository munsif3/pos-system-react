const request = require("supertest");
const app = require("../app");

test("'/items' route should be defined", async () => {
  const response = await request(app).get("/api/v1/items");
  expect(response).toBeDefined();
});

test("'/items' route should return json response", async () => {
  const response = await request(app).get("/api/v1/items");
  expect(response.type).toBe("application/json");
});

test("'/items' route should return 4 items", async () => {
  const response = await request(app).get("/api/v1/items");
  expect(response.body).toHaveLength(4);
});

const burger = {
  item_id: 1,
  name: "Burger",
  stock_amount: 10,
  unit_price: 500
};
test("'/items/1' route should return item - Burger", async () => {
  const response = await request(app).get("/api/v1/items/1");
  expect(response.body).toEqual(burger);
});

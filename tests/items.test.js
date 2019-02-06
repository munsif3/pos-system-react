const request = require("supertest");
const app = require("../app");

const burger = {
  item_id: 1,
  name: "Chicken Burger",
  stock_amount: 10,
  unit_price: 500
};
const items = [
  { item_id: 1, name: "Dew", stock_amount: 50, unit_price: 100 },
  { item_id: 2, name: "Coke", stock_amount: 50, unit_price: 100 },
  { item_id: 3, name: "Chicken Burger", stock_amount: 10, unit_price: 500 },
  { item_id: 4, name: "Cheese Burger", stock_amount: 10, unit_price: 600 },
  { item_id: 5, name: "Beef Burger", stock_amount: 10, unit_price: 700 },
  { item_id: 6, name: "Chicken Submarine", stock_amount: 22, unit_price: 450 },
  { item_id: 7, name: "Beef Submarine", stock_amount: 22, unit_price: 550 },
  { item_id: 8, name: "Shrimp Submarine", stock_amount: 22, unit_price: 450 },
  { item_id: 9, name: "Apple Pie", stock_amount: 12, unit_price: 300 },
  { item_id: 10, name: "Chocolate Cake", stock_amount: 22, unit_price: 120 }
];

describe("Tests '/items' REST Resource", () => {
  test("'/items' route should be defined", async () => {
    const response = await request(app).get("/api/v1/items");
    expect(response).toBeDefined();
  });

  test("Root request should return a JSON response", async () => {
    const response = await request(app).get("/api/v1/items");
    expect(response.type).toBe("application/json");
  });

  test("Root request should return 4 items", async () => {
    const response = await request(app).get("/api/v1/items");
    expect(response.body).toHaveLength(items.length);
  });

  test("'/0' route should return an empty array", async () => {
    const response = await request(app).get("/api/v1/items/0");
    expect(response.body).toEqual([]);
  });

  test("'/1' request should return item of type object", async () => {
    const response = await request(app).get("/api/v1/items/1");
    expect(typeof response.body).toBe("object");
  });

  test("'/1' request should return item - Burger", async () => {
    const response = await request(app).get("/api/v1/items/1");
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toEqual(burger);
  });
});

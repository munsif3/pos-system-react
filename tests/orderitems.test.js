const request = require("supertest");
const app = require("../app");

const orderNo1 = [
  { item_id: 1, name: "Dew", order_no: 1, qty: 2, unit_price: 100 },
  { item_id: 3, name: "Chicken Burger", order_no: 1, qty: 1, unit_price: 500 },
  { item_id: 4, name: "Cheese Burger", order_no: 1, qty: 1, unit_price: 600 },
  { item_id: 10, name: "Chocolate Cake", order_no: 1, qty: 2, unit_price: 120 }
];

describe("Tests '/order-details' REST Resource", () => {
  test("'Root request should be defined", async () => {
    const response = await request(app).get("/api/v1/order-details");
    expect(response).toBeDefined();
  });

  test("'/order-details/1' route should return order number 1", async () => {
    const response = await request(app).get("/api/v1/order-details/1");
    expect(response.body).toEqual(orderNo1);
  });

  test("'/1' route should return the same number of items in the order as 'orderNo1' defined", async () => {
    const response = await request(app).get("/api/v1/order-details/1");
    expect(response.body.length).toBe(orderNo1.length);
  });
});

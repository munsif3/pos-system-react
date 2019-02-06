const request = require("supertest");
const app = require("../app");

const orderNo1 = [
  { item_id: 1, name: "Chicken Burger", order_no: 1, qty: 2, unit_price: 500 },
  { item_id: 3, name: "Beef Burger", order_no: 1, qty: 2, unit_price: 700 },
  { item_id: 9, name: "Coke", order_no: 1, qty: 4, unit_price: 100 }
];

const orderNo1WithNewItem = [
  { item_id: 1, name: "Chicken Burger", order_no: 1, qty: 2, unit_price: 500 },
  { item_id: 3, name: "Beef Burger", order_no: 1, qty: 2, unit_price: 700 },
  { item_id: 9, name: "Coke", order_no: 1, qty: 4, unit_price: 100 },
  { item_id: 10, name: "Apple Pie", order_no: 1, qty: 4, unit_price: 300 }
];

describe("Tests '/order-details' REST Resource", () => {
  test("'Root request should be defined", async () => {
    const response = await request(app).get("/api/v1/order-details");
    expect(response).toBeDefined();
  });

  test("'/order-details' route should return an empty array", async () => {
    const response = await request(app).get("/api/v1/order-details/0");
    expect(response.body).toEqual([]);
  });

  test("'/order-details/1' route should return order number 1", async () => {
    const response = await request(app).get("/api/v1/order-details/1");
    expect(response.body).toEqual(orderNo1);
  });

  test("'/1' route should return the same number of items in the order as 'orderNo1' defined", async () => {
    const response = await request(app).get("/api/v1/order-details/1");
    expect(response.body.length).toBe(orderNo1.length);
  });

  test("Adding items to the order should reflect in the respective queried orderNo", async () => {
    const response = await request(app)
      .put("/api/v1/order-details/1")
      .send(orderNo1WithNewItem);
    expect(response.status).toBe(204);
  });

  test("Deleting an item from the order should reflect in the response", async () => {
    const response = await request(app).delete(
      `/api/v1/order-details/${orderNo1WithNewItem[3].order_no}/item/${
        orderNo1WithNewItem[3].item_id
      }`
    );
    expect(response.body.affectedRows).toBe(1);
  });
});

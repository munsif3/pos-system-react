const request = require("supertest");
const app = require("../app");

let newOrderNumber;
let newOrder = {};
let allOrders = [];
const updateReq = {
  total: "150.00"
};

describe("Tests '/orders' REST Resource", () => {
  test("Root request should be defined", async () => {
    const response = await request(app).get("/api/v1/orders");
    expect(response).toBeDefined();
    allOrders = [...response.body];
  });

  test("Route request should return more than 1 order", async () => {
    const response = await request(app).get("/api/v1/orders");
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  test("Post request should return an integer - orderNo", async () => {
    const response = await request(app).post("/api/v1/orders");
    expect(typeof response.body).toBe("number");
    expect(response.body).toBeGreaterThan(0);
    newOrderNumber = response.body;
  });

  test("/:id Get request should return newly added object", async () => {
    const response = await request(app).get(`/api/v1/orders/${newOrderNumber}`);
    expect(typeof response.body).toBe("object");
    newOrder = response.body;
  });

  test("New order should be added to the orders list", async () => {
    const response = await request(app).get("/api/v1/orders");
    expect(response.body).toContainEqual(newOrder[0]);
  });

  test("/:id Put request should return data", async () => {
    const response = await request(app)
      .put(`/api/v1/orders/${newOrderNumber}/price`)
      .send(updateReq);
    expect(response.body.affectedRows).toBe(1);
  });

  test("Updating is_open to false will remove the order from the main request", async () => {
    const response = await request(app).put(
      `/api/v1/orders/${newOrderNumber}/close`
    );
    const orders = await request(app).get("/api/v1/orders");
    expect(orders.body).not.toContainEqual(newOrder[0]);
  });
});

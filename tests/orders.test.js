const request = require("supertest");
const app = require("../app");

let newOrderNumber;
let newOrder = {};
const updateReq = {
  total: "150.00"
};

describe("Tests '/orders' REST Resource", () => {
  test("Root request should be defined", async () => {
    const response = await request(app).get("/api/v1/orders");
    expect(response).toBeDefined();
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
      .put("/api/v1/orders/1")
      .send(updateReq);
    expect(response.body.affectedRows).toBe(1);
  });
});

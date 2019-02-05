const request = require("supertest");
const app = require("../app");

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
  });

  const updateReq = {
    total: 150.0
  };
  test("/:id Put request should return data", async () => {
    const response = await request(app)
      .put("/api/v1/orders/10")
      .send(updateReq);
    expect(response.body.affectedRows).toBe(1);
  });
});

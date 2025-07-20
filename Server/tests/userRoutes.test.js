// Mock verifyToken middleware to bypass authentication for tests
jest.mock("../middleware/verifyToken.js", () => {
  return () => (req, res, next) => next();
});
const request = require("supertest");
const app = require("../app.cjs");
describe("Product API Endpoints", () => {
  let userEmail;
  let userId;

  it("should get userInfo", async () => {
    // Use a real email value in the route
    const testEmail = "test@email.com";
    const res = await request(app).get(`/api/user/${testEmail}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("email");
    userEmail = res.body.email;
  });

  // Close Sequelize connection after all tests
  const db = require("../config/db.js");
  afterAll(async () => {
    await db.close();
  });
});

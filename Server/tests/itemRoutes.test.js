const express = require("express");

// import itemRoutes from '../routes/itemRoutes.js'; // Uncomment when you have the route

const app = express();
app.use(express.json());
// app.use('/api/items', itemRoutes); // Uncomment when you have the route

describe("Item Routes", () => {
  it("GET /api/items should return items", async () => {
    // const res = await request(app).get('/api/items');
    // expect(res.statusCode).toBe(200);
    // expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/items should support search query", async () => {
    // const res = await request(app)
    //   .get('/api/items?search=iPhone');
    // expect(res.statusCode).toBe(200);
  });

  it("GET /api/items should support category filter", async () => {
    // const res = await request(app)
    //   .get('/api/items?category=Electronics');
    // expect(res.statusCode).toBe(200);
  });

  it("GET /api/items should support type filter", async () => {
    // const res = await request(app)
    //   .get('/api/items?type=lost');
    // expect(res.statusCode).toBe(200);
  });

  it("POST /api/items should create new item", async () => {
    // const newItem = {
    //   title: 'Lost iPhone',
    //   description: 'Lost my iPhone in Central Park',
    //   category: 'Electronics',
    //   type: 'lost',
    //   location: 'Central Park, NYC',
    //   date: '2024-01-15',
    //   time: '14:30',
    //   userId: 1
    // };
    // const res = await request(app)
    //   .post('/api/items')
    //   .send(newItem);
    // expect(res.statusCode).toBe(201);
    // expect(res.body.title).toBe('Lost iPhone');
  });

  it("PUT /api/items/:id should update item", async () => {
    // const res = await request(app)
    //   .put('/api/items/1')
    //   .send({ action: 'like' });
    // expect(res.statusCode).toBe(200);
  });

  it("GET /api/items/:id should return specific item", async () => {
    // const res = await request(app).get('/api/items/1');
    // expect(res.statusCode).toBe(200);
    // expect(res.body).toHaveProperty('id');
  });

  it("DELETE /api/items/:id should delete item", async () => {
    // const res = await request(app).delete('/api/items/1');
    // expect(res.statusCode).toBe(200);
  });
});

const request = require('supertest');
const app = require('../server');

describe('Todos API', () => {
   // Test 1: Health check
   it('GET /health should return healthy status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
   });

   // Test 2: Get all todos
   it('GET /api/todos should return array', async () => {
      const res = await request(app).get('/api/todos');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
   });

   // Test 3: Create todo with valid title
   it('POST /api/todos creates todo with valid title', async () => {
      const res = await request(app)
         .post('/api/todos')
         .send({ title: 'Test todo' });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('Test todo');
      expect(res.body.completed).toBe(false);
   });

   // BROKEN TEST #1 - Validation not implemented!
   it('POST /api/todos rejects empty title', async () => {
      const res = await request(app)
         .post('/api/todos')
         .send({});  // Missing title

      expect(res.status).toBe(400);  // Will FAIL - returns 201!
      expect(res.body.error).toMatch(/title/i);
   });

   // BROKEN TEST #2 - Whitespace title should be rejected!
   it('POST /api/todos rejects whitespace-only title', async () => {
      const res = await request(app)
         .post('/api/todos')
         .send({ title: '   ' });  // Only whitespace

      expect(res.status).toBe(400);  // Will FAIL!
      expect(res.body.error).toMatch(/title/i);
   });

   // BROKEN TEST #3 - DELETE endpoint not implemented!
   it('DELETE /api/todos/:id removes todo', async () => {
      // First create a todo
      const createRes = await request(app)
         .post('/api/todos')
         .send({ title: 'To be deleted' });

      const todoId = createRes.body.id;

      // Then delete it
      const deleteRes = await request(app)
         .delete(`/api/todos/${todoId}`);

      expect(deleteRes.status).toBe(200);  // Will FAIL - 404!
   });

   // BROKEN TEST #4 - PUT endpoint not implemented!
   it('PUT /api/todos/:id updates todo', async () => {
      // First create a todo
      const createRes = await request(app)
         .post('/api/todos')
         .send({ title: 'Original title' });

      const todoId = createRes.body.id;

      // Then update it
      const updateRes = await request(app)
         .put(`/api/todos/${todoId}`)
         .send({ title: 'Updated title', completed: true });

      expect(updateRes.status).toBe(200);  // Will FAIL - 404!
      expect(updateRes.body.title).toBe('Updated title');
      expect(updateRes.body.completed).toBe(true);
   });
});

import app from '../src/app';
const mongoose = require('mongoose');
const request = require('supertest');

// Connect to the MongoDB database before all tests
beforeAll(async () => {
  const url = `${process.env.MONGO_URI}`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clean up the database and close the connection after all tests
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

// Test Item endpoints
describe('E2E Item Tests', () => {
  describe('Basic Items functionality', () => {
    it('should be able to list all items', async () => {
      const responseGet = await request(app).get('/items');
      // console.log('response.status', response.status);
      // console.log('response.body', response.body);
      expect(responseGet.status).toBe(200);
      expect(responseGet.body).toEqual([]);

      await request(app).post('/items').send({
        name: 'Item 1',
        price: 10,
      });

      const responseGet2 = await request(app).get('/items');
      expect(responseGet2.status).toBe(200);
      expect(responseGet2.body).toEqual([
        {
          id: expect.any(String),
          name: 'Item 1',
          price: 10,
        },
      ]);
    });

    it('should be able to create a new item and get it by id', async () => {
      const responsePost = await request(app).post('/items').send({
        name: 'Item 1',
        price: 10,
      });

      expect(responsePost.status).toBe(201);
      expect(responsePost.body).toEqual({
        id: expect.any(String),
        name: 'Item 1',
        price: 10,
      });

      const responseGet = await request(app).get(`/items/${responsePost.body!.id}`);

      expect(responseGet.status).toBe(200);
      expect(responseGet.body).toEqual({
        id: expect.any(String),
        name: 'Item 1',
        price: 10,
      });
    });

    it('should be able to update an item', async () => {
      const responsePost = await request(app).post('/items').send({
        name: 'Item 1',
        price: 10,
      });
      expect(responsePost).toBeDefined();

      const responsePut = await request(app).put(`/items/${responsePost.body!.id}`).send({
        name: 'Item 1 updated',
        price: 20,
      });

      expect(responsePut.status).toBe(200);
      expect(responsePut.body).toEqual({
        id: responsePost.body!.id,
        name: 'Item 1 updated',
        price: 20,
      });

      const responseGet = await request(app).get(`/items/${responsePost.body!.id}`);

      expect(responseGet.status).toBe(200);
      expect(responseGet.body).toEqual({
        id: responsePost.body!.id,
        name: 'Item 1 updated',
        price: 20,
      });
    });

    it('should be able to delete an item', async () => {
      const responsePost = await request(app).post('/items').send({
        name: 'Item 1',
        price: 10,
      });
      expect(responsePost).toBeDefined();

      const responseDelete = await request(app).delete(`/items/${responsePost.body!.id}`);
      expect(responseDelete.status).toBe(204);

      const responseGet = await request(app).get(`/items/${responsePost.body!.id}`);
      expect(responseGet.status).toBe(404);
    });
  });
  describe('Validations', () => {
    it('should validate required fields', async () => {
      const responsePost = await request(app).post('/items').send({
        name: 'Item 1',
      });

      expect(responsePost.status).toBe(400);
      expect(responsePost.body).toEqual({
        errors: [
          {
            field: 'price',
            message: 'Field "price" is required',
          },
        ],
      });
    });

    it('should not allow for negative pricing for new items', async () => {
      const responsePost = await request(app).post('/items').send({
        name: 'Item 1',
        price: -10,
      });

      expect(responsePost.status).toBe(400);
      expect(responsePost.body).toEqual({
        errors: [
          {
            field: 'price',
            message: 'Field "price" cannot be negative',
          },
        ],
      });
    });

    it('should not allow for negative pricing for updated items', async () => {
      const responsePost = await request(app).post('/items').send({
        name: 'Item 1',
        price: 10,
      });
      expect(responsePost).toBeDefined();

      const responsePut = await request(app).put(`/items/${responsePost.body!.id}`).send({
        name: 'Item 1 updated',
        price: -20,
      });

      expect(responsePut.status).toBe(400);
      expect(responsePut.body).toEqual({
        errors: [
          {
            field: 'price',
            message: 'Field "price" cannot be negative',
          },
        ],
      });
    });
  });
});

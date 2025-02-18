const request = require('supertest');
import Item from '../src/models/item.model';
import app from '../src/app';
import { Types } from 'mongoose';

// Mock the Item model
jest.mock('../src/models/item.model');

describe('Test Item database interactions', () => {
  it('should should be able to create a new item', async () => {
    const MockItem = Item as jest.Mocked<typeof Item>;
    const newItemID = new Types.ObjectId();
    MockItem.create.mockImplementation(
      jest.fn().mockResolvedValue({ id: newItemID.toString(), name: 'Item 1', price: 50 }),
    );

    const responsePost = await request(app).post('/items').send({
      name: 'Item 1',
      price: 50,
    });
    expect(responsePost.status).toBe(201);
    expect(responsePost.body.id).toBe(newItemID.toString());
    expect(responsePost.body.name).toBe('Item 1');
    expect(responsePost.body.price).toBe(50);
  });

  it('should get an item by itemID', async () => {
    const MockItem = Item as jest.Mocked<typeof Item>;
    const newItemID = new Types.ObjectId();
    MockItem.findOne.mockImplementation(
      jest.fn().mockResolvedValue({ id: newItemID.toString(), name: 'Item 1', price: 50 }),
    );

    const responseGet = await request(app).get(`/items/${newItemID.toString()}`);
    expect(responseGet.status).toBe(200);
    expect(responseGet.body.id).toBe(newItemID.toString());
    expect(responseGet.body.name).toBe('Item 1');
    expect(responseGet.body.price).toBe(50);
  });

  it('should return 404 if item was not found', async () => {
    const MockItem = Item as jest.Mocked<typeof Item>;
    const newItemID = new Types.ObjectId();
    MockItem.findOne.mockImplementation(jest.fn().mockResolvedValue(null));
    const responseGet = await request(app).get(`/items/${newItemID.toString()}`);
    expect(responseGet.status).toBe(404);
  });
});

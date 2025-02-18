import app from '../src/app';
const request = require('supertest');

describe('E2E Ping Tests', () => {
  // Test ping endpoint
  it('should get a response with status code 200', async () => {
    const response = await request(app).get('/ping');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});

const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return Welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Welcome to the CI/CD Pipeline Node.js App');
  });
});

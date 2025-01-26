const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Tasks API', () => {
  it('should create a task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task' });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Task');
  });
});

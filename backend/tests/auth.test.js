const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/user');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI); // Removed deprecated options
  await User.deleteMany();
});

beforeEach(async () => {
  await User.deleteMany(); // Clear users before each test
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'test123', role: 'citizen' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail registration with existing email', async () => {
    await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'test123', role: 'citizen' });
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'test1234', role: 'citizen' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });

  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'test123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpass' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
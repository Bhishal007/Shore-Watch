const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/user');
const Report = require('../models/report');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Added missing import

let token;


jest.mock('../utils/sendEmail', () => ({
  sendEmail: jest.fn().mockResolvedValue(true), // Mock to resolve successfully
}));



beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI); // Removed deprecated options
  await User.deleteMany();
  await Report.deleteMany();
  const user = new User({ email: 'test@example.com', password: await bcrypt.hash('test123', 10), role: 'citizen' });
  await user.save();
  token = jwt.sign({ user: { id: user.id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Report Routes', () => {
  it('should submit a report', async () => {
    const res = await request(app)
      .post('/report/submit')
      .set('x-auth-token', token)
      .field('description', 'Test report')
      .field('latitude', '19.076090')
      .field('longitude', '72.877655')
      .field('urgency', 'high');
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Report submitted successfully');
  });

  it('should fetch all reports', async () => {
    const res = await request(app)
      .get('/report/all')
      .set('x-auth-token', token);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should fetch hotspots', async () => {
    await request(app)
      .post('/report/submit')
      .set('x-auth-token', token)
      .field('description', 'Another test')
      .field('latitude', '19.076090')
      .field('longitude', '72.877655')
      .field('urgency', 'medium');

    const res = await request(app)
      .get('/report/hotspots')
      .set('x-auth-token', token);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].count).toBeGreaterThanOrEqual(2);
  });
});
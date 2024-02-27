import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { app } from '../app';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

export const signin = async () => {
  const data = { password: 'password', email: 'test@gmail.com', name: 'test' };

  const authResponse = await request(app).post('/api/auth/users/signup').send(data).expect(201);
  const cookie = authResponse.get('Set-Cookie');

  return cookie;
};

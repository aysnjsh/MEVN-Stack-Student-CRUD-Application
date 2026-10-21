const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../app');
let mongo;
let dbPath;
const sample = { name: 'Test Student', email: 'student@example.com', phone: 639171234567 };

before(async () => {
  // Isolated real MongoDB process; never touches the user's Atlas database.
  dbPath = fs.mkdtempSync(path.join(__dirname, '../.mongo-test-'));
  mongo = await MongoMemoryServer.create({ instance: { dbPath, args: process.platform === 'win32' ? [] : ['--nounixsocket'] } });
  await mongoose.connect(mongo.getUri(), { dbName: 'finals_mevn_test' });
});
after(async () => { await mongoose.disconnect(); if (mongo) await mongo.stop(); if (dbPath) fs.rmSync(dbPath, { recursive: true, force: true }); });

test('CRUD round trip persists across a new database connection', async () => {
  const created = await request(app).post('/api/create-student').send({ ...sample, name: '  Test Student  ', email: 'STUDENT@EXAMPLE.COM', createdAt: '2000-01-01' }).expect(201);
  const id = created.body._id;
  assert.equal(created.body.name, sample.name);
  assert.equal(created.body.email, sample.email);
  assert.notEqual(created.body.createdAt.slice(0, 4), '2000');
  const list = await request(app).get('/api/').expect(200);
  assert.equal(list.body.length, 1);
  await mongoose.disconnect();
  await mongoose.connect(mongo.getUri(), { dbName: 'finals_mevn_test' });
  const loaded = await request(app).get(`/api/edit-student/${id}`).expect(200);
  assert.equal(loaded.body.name, sample.name);
  const updated = await request(app).put(`/api/update-student/${id}`).send({ ...sample, name: 'Updated Student' }).expect(200);
  assert.equal(updated.body.name, 'Updated Student');
  await request(app).put(`/api/update-student/${id}`).send({ ...sample, name: 'X' }).expect(400);
  assert.equal((await request(app).get(`/api/edit-student/${id}`)).body.name, 'Updated Student');
  await request(app).delete(`/api/delete-student/${id}`).expect(200);
  assert.equal((await request(app).get('/api/')).body.length, 0);
  await request(app).get(`/api/edit-student/${id}`).expect(404);
});

test('rejects invalid names, emails, phone values, and missing fields', async () => {
  for (const body of [ {}, { ...sample, name: ' ' }, { ...sample, email: 'invalid' }, { ...sample, phone: 123 }, { ...sample, phone: -1234567 }, { ...sample, phone: 1234567.5 }, { ...sample, phone: '12e4567' }, { ...sample, name: { $ne: '' } } ]) {
    await request(app).post('/api/create-student').send(body).expect(400);
  }
  assert.equal((await request(app).get('/api/')).body.length, 0);
});

test('invalid IDs, missing students, malformed JSON, and unknown API routes return useful errors', async () => {
  const absent = new mongoose.Types.ObjectId().toString();
  await request(app).get('/api/edit-student/bad-id').expect(400);
  await request(app).put('/api/update-student/bad-id').send(sample).expect(400);
  await request(app).delete('/api/delete-student/bad-id').expect(400);
  await request(app).get(`/api/edit-student/${absent}`).expect(404);
  await request(app).put(`/api/update-student/${absent}`).send(sample).expect(404);
  await request(app).delete(`/api/delete-student/${absent}`).expect(404);
  await request(app).post('/api/create-student').set('Content-Type', 'application/json').send('{ broken').expect(400);
  await request(app).get('/api/not-a-route').expect(404);
  await request(app).get('/api/health').expect(200);
});

test('database outage returns 503 and recovers after reconnecting', async () => {
  await mongoose.disconnect();
  await request(app).get('/api/').expect(503);
  await request(app).get('/api/health').expect(503);
  await mongoose.connect(mongo.getUri(), { dbName: 'finals_mevn_test' });
  await request(app).get('/api/').expect(200);
});

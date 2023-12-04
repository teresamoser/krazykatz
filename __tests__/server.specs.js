// const request = require('supertest');
// const express = require('express');
// const server = require('../server');
// const app = express();

// app.use('/', server);

// describe('Test Server', function () {
//   test('responds to /', async () => {
//     const res = await request(app).get('/');
//     expect(res.header['content-type']).toBe('text/html; charset=utf-8');
//     expect(res.statusCode).toBe(200);
//     expect(res.text).toEqual('hello world!');
//   });
// });

require('dotenv').config();
// const mongodb = require('../db/connect');
// const MongoClient = require('mongodb').MongoClient;
// // const mongoose = require("mongoose");
// const server = require('../server');
const port = process.env.PORT || 8080;

// describe('Connection', () => {
//   // beforeAll(async () => {
//   //   await MongoClient.connect(process.env.MONGODB_URI, {
//   //     useNewUrlParser: true,
//   //     // useCreateIndex: true,
//   //     useUnifiedTopology: true
//   //   });
//   // });

//   test('Connection to DB', async () => {
//     await mongodb.initDb();
//     expect(console.log).toBe(`Connected to DB and listening on ${port}`);
//   });

//   // test('Retrieve article by Id', async () => {
//   //   const id = '5ff2454f94eeee0a7acb5c30';
//   //   const article = await server.getArticlebyId(id);
//   //   expect(article.title).toBe('This is another post example');
//   // });

//   // afterAll(async (done) => {
//   //   MongoClient.disconnect();
//   //   done();
//   // });
// });

const { MongoClient } = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true
    });
    db = await connection.db('KrazyKatz');
  });

  afterAll(async () => {
    await connection.close(true);
    // await db.close(true);
  });

  it('should insert a user into collection', async () => {
    const users = db.collection('users');

    const mockUser = { _id: '65563b82b1818abe9c24f85f', name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: '65563b82b1818abe9c24f85f' });
    expect(insertedUser).toEqual(mockUser);
  });
});

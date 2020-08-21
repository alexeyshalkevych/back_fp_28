const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env')
});
const express = require('express');
const mongoose = require('mongoose');
// const route = require('./DBData/route');
const {
  PORT,
  DB_URI
} = process.env;


exports.AuthServer = class {
  constructor() {
    this.app = null;
  }
  async start() {
    this.initApp();
    await this.initDbConnection();
    this.initMiddleware();
    this.initRouter();
    this.initErrorHandler();
    this.startListener();
  }
  initApp() {
    this.app = express();
  }

  async initDbConnection() {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');
  }

  initMiddleware() {
    this.app.use(express.json());
  }

  initRouter() {
    // this.app.use('/', route);
  }

  initErrorHandler() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      return res.send(statusCode).send(err.message);
    });
  }

  startListener() {
    this.app.listen(PORT, err =>
      err ?
      console.error(err) :
      console.info(`Server has been started on ${PORT} port`),
    );
  }
};
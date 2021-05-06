const http = require("http");

const mongoose = require("mongoose");
const Promise = require("bluebird");

/**
 * Load Config before any other file
 * this ensures that all necessary env vars are provided and valid to run server
 */
const { MONGO, PORT, ENV } = require("./config");

/**
 * Require express app
 */
const app = require("./server");

/**
 * Make blue bird default Promise
 */
global.Promise = Promise;

/**
 * Create DB connection and set connection events
 */
mongoose.connect(MONGO.HOST, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  promiseLibrary: global.Promise,
});
// When successfully connected
mongoose.connection.on("connected", function () {
  console.log(`Mongoose connection open`);
});
// If the connection throws an error
mongoose.connection.on("error", function (err) {
  console.error(`Mongoose connection error: ${err}`);
});
// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose connection disconnected");
});

/**
 * Start server on PORT defined in config
 */
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server Started on PORT:${PORT} (${ENV})`);
});

/**
 * Graceful termination
 */
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose connection disconnected through app termination");
    process.exit(0);
  });
});

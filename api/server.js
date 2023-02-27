const express = require('express');
const {logger} = require("./middleware/middleware")
const morgan = require("morgan")
const server = express();
const usersRouter = require("./users/users-router")
server.use(express.json())

server.use(logger)
server.use("/api",usersRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use(logger)
module.exports = server;

const express = require('express');
const {logger} = require("./middleware/middleware")
const morgan = require("morgan")
const server = express();
const usersRouter = require("./users/users-router")
server.use(express.json())

server.use(morgan('dev'))
server.use("/users", usersRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

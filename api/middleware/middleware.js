const Users = require('../users/users-model');
const Posts = require("../posts/posts-model")

function logger(req, res, next) {
 const timeStamp = new Date().toLocaleString()
  console.log(`${req.method} http://localhost:9000${req.originalUrl} ${timeStamp}`)
 
 next()
}

async function validateUserId(req, res, next) {
  const {id} = req.params;
 await Users.getById(id)
  .then(user => {
    if (user) {
      req.user = user;
      next()
    } else {
      next({status: 404, message: "user not found"})
    }
  })
  .catch(err => {
    next(err)
  })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports ={
  logger,
  validatePost,
  validateUser,
  validateUserId
}
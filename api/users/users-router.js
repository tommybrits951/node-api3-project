const {validatePost, validateUser, validateUserId} = require("../middleware/middleware")
const express = require('express');
const Users = require("./users-model")
const Posts = require("../posts/posts-model")
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/users', (req, res, next) => {
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => next())
});

router.get('/users/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  try {
    res.status(200).json(req.user)
  } catch (error) {
    next()
  }
  // this needs a middleware to verify user id
});

router.post('/users', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/users/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/users/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/users/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Oops! Something went wrong!"
  })
})

// do not forget to export the router
module.exports = router;
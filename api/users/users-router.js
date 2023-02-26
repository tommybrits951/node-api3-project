const {logger, validatePost, validateUser, validateUserId} = require("../middleware/middleware")
const express = require('express');
const Users = require("./users-model")
const Posts = require("../posts/posts-model")
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res, next) => {
  await Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => next())
});

router.get('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE USER OBJECT
  try {
    res.status(200).json(req.user)
  } catch {
    next({status: 500, message: err.message})
  }
  // this needs a middleware to verify user id
});

router.post('/', async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Oops! Something went wrong!"
  })
})

// do not forget to export the router
module.exports = router;
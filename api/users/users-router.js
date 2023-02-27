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
    res.json(users)
  })
  .catch(next)
});

router.get('/users/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  try {
    res.status(200).json(req.user)
  } catch (error) {
    next(error)
  }
  // this needs a middleware to verify user id
});

router.post('/users', validateUser, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  try {
    
    const user = await Users.insert(req.body);
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
  // this needs a middleware to check that the request body is valid
});

router.put('/users/:id', validateUserId, validateUser, async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  try {
    const {id} = req.params;

    const post = await Users.update(id, {name: req.name});
    res.status(201).json(post)
  } catch (error) {
    next(error)
  }
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/users/:id', validateUserId, async (req, res, next) => {
  const {id} = req.params;
  try {

    const user = await Users.remove(id)
    res.json(req.user)
  }
    catch (error) {

    }
    // this needs a middleware to verify user id
});

router.get(`/users/:id/posts`, validateUserId, async (req, res, next) => {
  try {
    
    const userPosts = await Posts.get()
    const rightPosts = userPosts.filter(post => {
      return post.user_id === req.user.id
    })
    if (rightPosts) {
      console.log(userPosts)
      res.status(200).json(rightPosts)
    } else {
      next({status: 404, message: 'user not found'})
    }
  } catch (error) {
    next(error)
  }
  // this needs a middleware to verify user id
});

router.post('/users/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const post = req.body;
    post.user_id = req.user.id
    if (!req.text) {
      res.status(404).json({message: "user not found"})
    } else {
      const newPost = await Posts.insert(post)
      res.status(201).json(newPost)
    }
  } catch (error) {
    next(error)
  }
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Oops! Something went wrong!",
    
  })
})

// do not forget to export the router
module.exports = router;
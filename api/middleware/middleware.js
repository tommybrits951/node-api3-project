const Users = require('../users/users-model');
const Posts = require("../posts/posts-model")

function logger(req, res, next) {
 const timeStamp = new Date().toLocaleString()
  console.log(`${req.method} ${req.originalUrl} ${timeStamp}`)
 
 next()
}

async function validateUserId(req, res, next) {
  try {
    
    const {id} = req.params;
    const user = await Users.getById(id)
    if (!user) {
      res.status(404).json({message: "user not found"})

    } else {
      req.user = user
   next()
      
  }
  } catch (error) {
    next({status: 500, message: error.message})
  }
  
}

async function validateUser(req, res, next) {
  
    const {name} = req.body;
    if (!name) {
      res.status(400).json({message: "missing required name field"})
    } else {
      req.name = name.trim()
      next()
    }
}

function validatePost(req, res, next) {
  const {text} = req.body;
  if (!text) {
    
    res.status(400).json({message: "missing required text field"})
  } else {
    req.text = text;
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports ={
  logger,
  validatePost,
  validateUser,
  validateUserId
}
function logger(req, res, next) {
 console.log(`${req.method} ${req.route.baseUrl} ${Date.now().toString()}`)
 next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
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
}
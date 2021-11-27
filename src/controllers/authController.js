const register = (req, res, next) => {
  res.status(201).json({
    statusCode: 201,
    message: 'user created',
    result: req.body,
  })
  next()
}

module.exports = { register }

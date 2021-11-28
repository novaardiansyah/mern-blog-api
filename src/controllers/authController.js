const register = (req, res, next) => {
  res.status(201).json({
    statusCode: 201,
    message: 'successful registration',
    result: req.body,
  })
  next()
}

module.exports = { register }

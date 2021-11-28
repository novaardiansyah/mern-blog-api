const store = (req, res, next) => {
  res.status(201).json({
    statusCode: 201,
    message: 'successfully added new data',
    result: req.body,
  })
  next()
}

module.exports = { store }

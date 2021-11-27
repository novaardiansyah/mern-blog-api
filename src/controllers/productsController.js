const store = (req, res, next) => {
  res.json({
    statusCode: 200,
    message: 'product created',
    result: req.body.result,
  })
  next()
}

const show = (req, res, next) => {
  res.json({
    message: 'all product data',
    data: {
      name: 'nova ardiansyah',
      email: 'nova@gmail.com',
    },
  })
}

module.exports = { store, show }

const store = (req, res, next) => {
  res.json({ name: 'nova ardiansyah', email: 'nova@gmail.com' })
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

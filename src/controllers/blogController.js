const { validationResult } = require('express-validator')

const store = (req, res, next) => {
  const { title, content } = req.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed')
    error.status = 422
    error.data = errors.array()
    throw error
  }

  res.status(201).json({
    statusCode: 201,
    message: 'successfully added new data',
    data: {
      id: '1',
      title,
      content,
      createdAt: '2020-01-01',
      updatedAt: '2020-01-01',
      author: {
        uuid: '1',
        name: 'John Doe',
      },
    },
  })
  next()
}

module.exports = { store }

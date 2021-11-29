const Post = require('../models/Post')
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

  const NewPost = new Post({
    title,
    content,
    author: { uuid: '1', username: 'admin' },
  })

  NewPost.save()
    .then((post) => {
      res.status(201).json({
        message: 'Post created successfully',
        result: post,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = { store }

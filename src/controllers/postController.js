const Post = require('../models/Post')
const { validationResult } = require('express-validator')

const store = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed')
    error.status = 422
    error.data = errors.array()
    throw error
  }

  if (!req.file) {
    const error = new Error('No image provided')
    error.status = 422
    throw error
  }

  const NewPost = new Post({
    title: req.body.title,
    content: req.body.content,
    image: req.file.path,
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

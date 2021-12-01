const { validationResult } = require('express-validator')

// ! Models
const Post = require('../models/Post')

const index = (req, res, next) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        data: posts,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

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

      next()
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = { index, store }

const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')

// ! Models
const Post = require('../models/Post')

// * Get all posts
const index = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1
  const perPage = parseInt(req.query.perPage) || 5
  let totalItems

  Post.countDocuments()
    .then((count) => {
      totalItems = parseInt(count)
      return Post.find()
        .sort({ date: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then((posts) => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        result: posts,
        total_items: totalItems,
        per_page: perPage,
        current_page: currentPage,
      })
    })
    .catch((err) => {
      next(err)
    })
}

//  * Get single post
const show = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        const error = new Error('Post not found')
        error.statusCode = 404
        throw error
      }

      res.status(200).json({
        message: 'Post fetched successfully',
        result: post,
      })

      next()
    })
    .catch((err) => {
      next(err)
    })
}

// * Create post
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

// * Update post
const update = (req, res, next) => {
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

  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        const error = new Error('Post not found')
        error.statusCode = 404
        throw error
      }

      if (req.file) {
        post.image = req.file.path
      }

      post.title = req.body.title
      post.content = req.body.content

      return post.save()
    })
    .then((post) => {
      res.status(200).json({
        message: 'Post updated successfully',
        result: post,
      })

      next()
    })
    .catch((err) => {
      next(err)
    })
}

// * Delete post
const destroy = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        const error = new Error('Post not found')
        error.statusCode = 404
        throw error
      }

      removeImage(post.image)
      return Post.findByIdAndDelete(req.params.id)
    })
    .then((post) => {
      res.status(200).json({
        message: 'Post deleted successfully',
        result: post,
      })
      next()
    })
    .catch((err) => {
      next(err)
    })
}

const removeImage = (imagePath) => {
  const filePath = path.join(__dirname, '../../', imagePath)
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = { index, show, store, update, destroy }

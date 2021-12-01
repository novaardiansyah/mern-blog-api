const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

// ! Controller
const postController = require('../controllers/postController')

// * General Rules
const generalRules = [
  body('title')
    .isLength({ min: 5 })
    .withMessage('Title must be at least 5 characters long'),
  body('content')
    .isLength({ min: 5 })
    .withMessage('Content must be at least 5 characters long'),
]

// * Get all posts
router.get('/', postController.index)

// * Create post
router.post('/create', generalRules, postController.store)

// * Get single post
router.get('/:id', postController.show)

// * Update post
router.put('/:id', generalRules, postController.update)

// * Delete post
router.delete('/:id', postController.destroy)

module.exports = router

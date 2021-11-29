const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

// ! Controller
const postController = require('../controllers/postController')

router.post(
  '/create',
  [
    body('title')
      .isLength({ min: 5 })
      .withMessage('Title must be at least 5 characters long'),
    body('content')
      .isLength({ min: 5 })
      .withMessage('Content must be at least 5 characters long'),
  ],
  postController.store
)

module.exports = router

const express = require('express')
const router = express.Router()

// ! Controller
const blogController = require('../controllers/blogController')

router.post('/create', blogController.store)

module.exports = router

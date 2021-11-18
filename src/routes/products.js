const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

router.post('/products', productsController.store)
router.get('/products', productsController.show)

module.exports = router

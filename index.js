const express = require('express')
const app = express()
const port = 3001

const productsRoutes = require('./src/routes/products')

app.use('/', productsRoutes)

app.listen(port)

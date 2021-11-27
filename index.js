const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3001

const productsRoutes = require('./src/routes/products')

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/', productsRoutes)

app.listen(port)

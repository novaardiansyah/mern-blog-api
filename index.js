const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3001

// ! Routes
const blogRoutes = require('./src/routes/blog')
const authRoutes = require('./src/routes/auth')

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

app.use('/v1/blog', blogRoutes)
app.use('/v1/auth', authRoutes)

app.listen(port)

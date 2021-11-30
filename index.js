const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const bodyParser = require('body-parser')

const app = express()
const port = 3001

require('dotenv').config()

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
)

// ! Routes
const postRoutes = require('./src/routes/postRoutes')
const authRoutes = require('./src/routes/authRoutes')

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

app.use('/v1/post', postRoutes)
app.use('/v1/auth', authRoutes)

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || 'Something went wrong',
    data: error.data,
  })

  next()
})

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })

const express = require('express')

const router = express.Router()
const app = express()

router.get('/users', (req, res) => {
  console.log('url', req.url)
  console.log('method', req.method)
  res.json({ name: 'nova ardiansyah', email: 'nova@gmail.com' })
})

app.use('/', router)

app.listen(3001)

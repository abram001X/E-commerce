import express from 'express'
import cors from 'cors'
import { PORT, FRONTEND_URL } from './config.js'
import { createUser, loginUser } from './database/userDb.js'

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: FRONTEND_URL
  })
)

app.post('/sign-in', (req, res) => {
  const data = req.body
  try {
    createUser(data).then(data => {
      res.send(data)
    })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.post('/login', (req, res) => {
  const data = req.body
  try {
    loginUser(data).then(data => {
      res.send(data)
    })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

console.log('http://localhost:3000/add/account')
app.listen(PORT)

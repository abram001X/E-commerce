import express from 'express'
import cors from 'cors'
import { PORT, FRONTEND_URL, SECRET_JWT_KEY } from './config.js'
import { DbUsers } from './database/userDb.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'

config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: FRONTEND_URL
  })
)

app.post('/sign-in', async (req, res) => {
  const data = req.body
  try {
    const dbData = new DbUsers(data)
    const user = await dbData.createUser()
    res.send({ response: user })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.post('/login', async (req, res) => {
  const data = req.body
  try {
    const dbData = new DbUsers(data)
    const user = await dbData.login() // res.send(await dbData.login())
    const token = jwt.sign(
      {
        id: user.id, username: user.username, email: user.email
      },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      }
    )
    res
      .cookie('access_token', token, {
        httpOnly: true, // la cookie solo se puede leer en el servidor
        secure: process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
        sameSite: 'strict', // la cookie solo se  puede  acceder en el mismo dominio
        maxAge: 1000 * 60 * 60 // la cookie tiene un  tiempo de validez de 1h
      })
      .send({ response: user, token })
  } catch (e) {
    console.log(e)
    res.status(401).send(e.message)
  }
})

console.log('http://localhost:3000/add/account')
app.listen(PORT)

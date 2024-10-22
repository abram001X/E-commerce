import express from 'express'
import cors from 'cors'
import { PORT, FRONTEND_URL } from './config.js'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import { validateToken } from './middlewares/validateToken.js'
import { login, logout, profile, register, verifyToken } from './controllers/controllers.js'

config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true
  })
)

app.post('/signup', register)

app.post('/login', login)

app.post('/logout', logout)

app.get('/verify', validateToken, verifyToken)

app.get('/profile', validateToken, profile)

console.log('http://localhost:3000/add/account')
app.listen(PORT)

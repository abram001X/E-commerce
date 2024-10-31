import express from 'express'
import cors from 'cors'
import { PORT, FRONTEND_URL } from './config.js'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import { validateToken } from './middlewares/validateToken.js'
import { addProducts, getApiByIdProduct, getApiCategories, getProducts, images, login, logout, myCart, myProudcts, register, verifyToken } from './controllers/controllers.js'
import { upload } from './middlewares/diskStorage.js'

config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static('./assets'))
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true
  })
)

app.post('/signup', register)

app.post('/login', login)

app.post('/logout', logout)

app.get('/api/verify', validateToken, verifyToken)

app.post('/add-products', validateToken, addProducts)

app.post('/api/my-cart', validateToken, myCart)

app.post('/api/form-images', upload.array('images', 3), images)

app.get('/api/my-products', validateToken, myProudcts)

app.get('/api/get-categories', getApiCategories)

app.get('/api/get-products/:id', getApiByIdProduct)

app.get('/api/get-products', getProducts)

console.log('http://localhost:3000')

app.listen(PORT)

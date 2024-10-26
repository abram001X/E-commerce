import { SECRET_JWT_KEY } from '../config.js'
import jwt from 'jsonwebtoken'
import { User } from '../database/userDb.js'
import { Products } from '../database/productsDb.js'

export const register = async (req, res) => {
  const data = req.body
  try {
    const dbData = User
    const user = await dbData.createUser(data)
    res.json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
}

export const login = async (req, res) => {
  const data = req.body
  try {
    const dbData = User
    const user = await dbData.login(data) // res.send(await dbData.login())
    if (!user.id) {
      return res.status(401).send(user)
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      }
    )
    res
      .cookie('accessToken', token, {
        secure: true,
        sameSite: 'none',
        httpOnly: false
      })
      .json({
        user,
        message: 'Login succesfull!!',
        token
      })
  } catch (e) {
    console.log(e)
    res.status(401).json(e.message)
  }
}

export const logout = (req, res) => {
  res.cookie('accessToken', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const addProducts = async (req, res) => {
  const { id } = req.user
  const userFound = await User.findByid(id)
  if (!userFound) {
    return res.status(401).json({ message: 'User not found' })
  }
  const resProduct = await Products.addProduct(req.body, id)
  return res.json(resProduct)
}

export const verifyToken = async (req, res) => {
  const { id } = req.user
  if (!id) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }
  const userFound = await User.findByid(id)
  if (!userFound) {
    return res.status(401).json({ message: 'User not found' })
  }
  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    cart: userFound.cart
  })
}

export const myProudcts = async (req, res) => {
  const { id } = req.user
  const userFound = await User.findByid(id)
  if (!userFound) {
    return res.status(401).json({ message: 'User not found' })
  }
  const resDb = await Products.findByProduct(id)
  return res.json(resDb)
}

export const myCart = async (req, res) => {
  const { id } = req.user
  const userFound = await User.findByid(id)
  if (!userFound) {
    return res.status(401).json({ message: 'User not found' })
  }
  const resDb = await Products.addMycart(id, req.body)
  return res.json(resDb)
}

export const getApiByIdProduct = async (req, res) => {
  const productsDb = await Products.getSingleProducts(req.params.id)
  if (productsDb.message) {
    return res.status(401).json(productsDb)
  }
  return res.send(productsDb)
}

export const getApiCategories = async (req, res) => {
  const productsDb = await Products.getCategories()
  if (productsDb.message) {
    return res.status(401).json(productsDb)
  }
  return res.send(productsDb)
}

export const getProducts = async (req, res) => {
  let productsDb
  if (req.query.price_max && req.query.category_id) {
    productsDb = await Products.getProductsByPrice(req.query.price_max, req.query.category_id)
    if (productsDb.message) {
      return res.status(401).json(productsDb)
    }
  } else if (req.query.price_max) {
    productsDb = await Products.getProductsByRangePrice(req.query.price_max)
    if (productsDb.message) {
      return res.status(401).json(productsDb)
    }
  } else if (req.query.category_id) {
    productsDb = await Products.getProductsByCategory(req.query.category_id)
    if (productsDb.message) {
      return res.status(401).json(productsDb)
    }
  } else if (req.query.title) {
    productsDb = await Products.getProductsByTitle(req.query.title)
  } else productsDb = await Products.getAllProducts()
  return res.send(productsDb)
}

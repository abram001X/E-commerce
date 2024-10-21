import { SECRET_JWT_KEY } from '../config.js'
import jwt from 'jsonwebtoken'
import { User } from '../database/userDb.js'
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

export const profile = async (req, res) => {
  const { id } = req.user
  const userFound = await User.findByid(id)
  if (!userFound) {
    return res.status(401).json({ message: 'User not found' })
  }
  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email
  })
}

export const verifyToken = async (req, res) => {
  const { id } = req.user
  const userFound = await User.findByid(id)
  if (!userFound) {
    return res.status(401).json({ message: 'User not found' })
  }
  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email
  })
}

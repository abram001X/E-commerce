import { SECRET_JWT_KEY } from '../config.js'
import jwt from 'jsonwebtoken'
import { User } from '../database/userDb.js'
export const register = async (req, res) => {
  const data = req.body
  try {
    const dbData = User
    const user = await dbData.createUser(data)
    res.json({ response: user })
  } catch (e) {
    res.status(400).send(e.message)
  }
}

export const login = async (req, res) => {
  const data = req.body
  try {
    const dbData = User
    const user = await dbData.login(data) // res.send(await dbData.login())
    if (typeof user !== 'object') {
      return res.send({ response: user })
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email
      },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      }
    )
    res
      .cookie('accessToken', token, {
        httpOnly: true, // la cookie solo se puede leer en el servidor
        secure: process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
        sameSite: 'strict', // la cookie solo se  puede  acceder en el mismo dominio
        maxAge: 1000 * 60 * 60 // la cookie tiene un  tiempo de validez de 1h
      })
      .json({ response: user, token })
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

import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config.js'
export function validateToken (req, res, next) {
  const { accessToken } = req.cookies
  if (!accessToken) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }
  return jwt.verify(accessToken, SECRET_JWT_KEY, (error, user) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid Token' })
    }
    req.user = user
    next()
  })
}

import { config } from 'dotenv'

config()
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
export const PORT = process.env.PORT || 3000
export const SALT_ROUNDS = 10
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || 'super--larga-32asd-kfd03-extremadamente-322asdas11contraseña-'

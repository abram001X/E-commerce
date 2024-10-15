import { config } from 'dotenv'

config()
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
export const PORT = process.env.PORT || 3000
export const SALT_ROUNDS = 10

import { createClient } from '@libsql/client'
import { config } from 'dotenv'
import crypto from 'crypto'

import bcrypt from 'bcrypt'
// import { SALT_ROUNDS } from '../config.js'

config()
const db = createClient({
  url: process.env.URL_DB,
  authToken: process.env.DB_TOKEN
})

export async function createUser ({ username, email, password }) {
  let userData
  const hashedPassword = bcrypt.hashSync(password, 10)
  const id = crypto.randomUUID()
  try {
    userData = await db.execute({
      sql: 'INSERT INTO users(id,username,email,password) VALUES (:id,:username,:email,:hashedPassword);',
      args: { id, username, email, hashedPassword }
    })
  } catch (e) {
    console.error(e.message)
    return e.message
  }
  return { userData }
}

export async function loginUser ({ username, password }) {
  let userData
  if (typeof username !== 'string') {
    return { message: 'email must be a string' }
  }
  if (typeof password !== 'string') {
    return { message: 'password must be a string' }
  }
  try {
    userData = await db.execute({
      sql: 'SELECT id, username, email, password FROM users WHERE username = :username',
      args: { username }
    })
  } catch (e) {
    return e.message
  }
  const responseDb = userData.rows[0]
  console.log(userData)
  if (responseDb) {
    const isValid = bcrypt.compareSync(password, responseDb.password)
    if (!isValid) return { message: 'password invallid' }
    return responseDb
  }
  return { message: 'username or password no exists' }
}

import { createClient } from '@libsql/client'
import { config } from 'dotenv'
import crypto from 'crypto'

import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../config.js'

config()
const db = createClient({
  url: process.env.URL_DB,
  authToken: process.env.DB_TOKEN
})

class DbUsers {
  constructor () {
    let userData
    function validation (username, password) {
      if (typeof username !== 'string') {
        return { message: 'Username is incorrect' }
      }
      if (username.length <= 3) {
        return { message: 'Username has to be greater than 3' }
      }
      if (typeof password !== 'string') {
        return { message: 'Password must be a string' }
      }
    }

    this.createUser = async function ({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)
      const id = crypto.randomUUID()
      const userValid = validation(username, password)
      if (userValid) return userValid
      try {
        if (email && email.includes('@')) {
          userData = await db.execute({
            sql: 'INSERT INTO users(id,username,email,password) VALUES (:id,:username,:email,:hashedPassword)',
            args: { id, username, email, hashedPassword }
          })
        } else return { message: 'email is not correct' }
      } catch (e) {
        console.error(e.message)
        if (
          e.message ===
          'SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: users.username'
        ) {
          return { message: 'Username already exists' }
        }
      }
      return { message: 'Register succesfull!!' }
    }

    this.login = async function ({ username, password }) {
      const userValid = validation(username, password)
      if (userValid) return userValid
      try {
        userData = await db.execute({
          sql: 'SELECT id, username, password, email FROM users WHERE username = :username',
          args: { username }
        })
      } catch (e) {
        return { message: 'User does no exist' }
      }
      const responseDb = userData.rows[0]
      if (responseDb) {
        const isValid = bcrypt.compareSync(password, responseDb.password)
        if (!isValid) return { message: 'Password invallid' }
        const { id, username, email } = responseDb
        return {
          id,
          username,
          email
        }
      }
      return { message: 'User does no exist' }
    }

    this.findByid = async function (id) {
      try {
        userData = await db.execute({
          sql: 'SELECT id, username, email, cart FROM users WHERE id = :id',
          args: { id }
        })
      } catch (e) {
        return { message: e.message }
      }
      const responseDb = userData.rows[0]
      if (responseDb) {
        const { id, username, email, cart } = responseDb
        return {
          id,
          username,
          email,
          cart: JSON.parse(cart),
          message: 'User found'
        }
      }
    }
  }
}

export const User = new DbUsers()

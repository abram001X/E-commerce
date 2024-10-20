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
        return 'Username is incorrect'
      }
      if (username.length <= 3) {
        return 'Username has has to be greater than 3'
      }
      if (typeof password !== 'string') {
        return 'Password must be a string'
      }
    }
    this.createUser = async function ({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)
      const id = crypto.randomUUID()
      const userValid = validation(username, password)
      if (userValid) return userValid
      try {
        userData = await db.execute({
          sql: 'INSERT INTO users(id,username,email,password) VALUES (:id,:username,:email,:hashedPassword)',
          args: { id, username, email, hashedPassword }
        })
      } catch (e) {
        console.error(e.message)
        return e.message
      }
      return 'Register succesfull!!'
    }

    this.login = async function ({ username, password }) {
      const userValid = validation(username, password)
      if (userValid) return userValid
      try {
        userData = await db.execute({
          sql: 'SELECT id, username, email, password FROM users WHERE username = :username',
          args: { username }
        })
      } catch (e) {
        return e.message
      }
      const responseDb = userData.rows[0]
      if (responseDb) {
        const isValid = bcrypt.compareSync(password, responseDb.password)
        if (!isValid) return 'Password invallid'
        const { id, username, email } = responseDb
        return {
          id,
          username,
          email
        }
      }
      return 'User does no exist'
    }
    this.findByid = async function (id) {
      try {
        userData = await db.execute({
          sql: 'SELECT id, username, email FROM users WHERE id = :id',
          args: { id }
        })
      } catch (e) {
        return e.message
      }
      const responseDb = userData.rows[0]
      console.log(responseDb)
      if (responseDb) {
        return responseDb
      } else return 'User does no exist'
    }
  }
}
export const User = new DbUsers()

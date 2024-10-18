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

export class DbUsers {
  constructor ({ username, email, password }) {
    let userData
    this.username = username
    this.email = email
    this.password = password
    function validation () {
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
    this.createUser = async function () {
      const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)
      const id = crypto.randomUUID()
      const error = validation()
      if (error) return error
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

    this.login = async function () {
      const error = validation()
      if (error) return error
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
  }
}

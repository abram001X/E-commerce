import { createClient } from '@libsql/client'
import { config } from 'dotenv'

config()
const db = createClient({
  url: process.env.URL_DB,
  authToken: process.env.DB_TOKEN
})

class DbProducts {
  constructor () {
    let userData

    this.addProduct = async function (
      { title, categoryId, price, description, img },
      id
    ) {
      try {
        userData = await db.execute({
          sql: 'INSERT INTO products(title, categoryId, price, description, images,id) VALUES (:title, :categoryId, :price, :description, :img, :id)',
          args: { title, categoryId, price, description, img, id }
        })
      } catch (e) {
        console.log(e)
        return { message: e.message }
      }
      return { message: 'Product published' }
    }

    this.findByProduct = async function (id) {
      try {
        userData = await db.execute({
          sql: 'SELECT productId, title, description, images, categoryId FROM products WHERE id = :id',
          args: { id }
        })
      } catch (e) {
        console.log(e.message)
        return { message: e }
      }
      const response = userData.rows
      if (!response) {
        console.log(response)
        return { message: 'error' }
      }
      return response.map((obj) => {
        return {
          productId: obj.productId,
          title: obj.title,
          description: obj.description,
          images: JSON.parse(obj.images),
          categoryId: obj.categoryId
        }
      }) // images: JSON.parse(images)
    }

    this.addMycart = async function (id, { cart }) {
      console.log(id, cart)
      try {
        userData = await db.execute({
          sql: 'UPDATE users SET cart = :cart WHERE id = :id',
          args: { cart, id }
        })
      } catch (e) {
        console.log(e)
        return { message: e }
      }
      return { message: 'Product Add!!' }
    }

    this.getCategories = async function () {
      try {
        userData = await db.execute('SELECT categoryId, name, image FROM categories;')
      } catch (e) {
        console.log(e)
        return { message: e.message }
      }

      return userData.rows
    }
    this.getAllProducts = async function () {
      const categories = await this.getCategories()
      try {
        if (!categories.message) {
          userData = await db.execute('SELECT productId, title, description, images,price, categoryId FROM products;')
        } else return categories
      } catch (e) {
        console.log(e)
        return { message: e.message }
      }
      const products = []
      userData.rows.forEach((items) => {
        categories.forEach((category) => {
          if (category.categoryID === items.categoryId) {
            products.push({
              id: items.productId,
              title: items.title,
              price: items.price,
              description: items.description,
              category: {
                id: category.categoryID,
                name: category.name,
                image: category.image
              },
              images: JSON.parse(items.images)
            })
          }
        })
      })
      return products
    }
    this.getSingleProducts = async function (id) {
      try {
        userData = await db.execute({
          sql: 'SELECT productId, title, description, images,price, categoryId FROM products WHERE productId = :id;',
          args: { id }
        })
      } catch (e) {
        console.log(e)
        return { message: e.message }
      }
      const response = userData.rows[0]
      if (!response) {
        return { message: 'Product no exist' }
      }
      const { categoryId } = response
      const categoryDb = await db.execute({
        sql: 'SELECT categoryId, name, image FROM categories WHERE categoryId = :categoryId;',
        args: { categoryId }
      })
      const category = categoryDb.rows[0]
      return {
        id: response.productId,
        title: response.title,
        description: response.description,
        images: JSON.parse(response.images),
        price: response.price,
        category: {
          id: category.categoryID,
          name: category.name,
          image: category.image
        }
      }
    }
  }
}

export const Products = new DbProducts()

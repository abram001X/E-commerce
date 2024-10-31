import multer from 'multer'
import fs from 'node:fs'
export const upload = multer({ dest: 'assets/' })

export const saveImages = (file) => {
  const newPath = `./assets/e-commerce-${file.originalname}`
  fs.renameSync(file.path, newPath)
  return `https://e-commerce-fake.onrender.com/e-commerce-${file.originalname}`
}

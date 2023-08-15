import { configDotenv } from 'dotenv'
import mongoose from 'mongoose'

configDotenv({ path: `.env.${process.env.NODE_ENV}` })

const { DB_URL, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env
const user = encodeURIComponent(DB_USER)
const password = encodeURIComponent(DB_PASSWORD)
const dsn =
  DB_USER && DB_PASSWORD
    ? `${DB_URL}://${user}:${password}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    : `${DB_URL}://${DB_HOST}:${DB_PORT}/${DB_NAME}`
console.log(dsn)

export const connectDb = async () =>
  await mongoose.connect(dsn, {
    connectTimeoutMS: 0,
    retryWrites: true,
    writeConcern: {
      w: 'majority',
    },
  })

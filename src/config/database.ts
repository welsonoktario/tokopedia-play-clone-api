import { configDotenv } from 'dotenv'
import mongoose from 'mongoose'

configDotenv({ path: `.env.${process.env.NODE_ENV}` })

const { DB_URL, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env
const dsn =
  DB_USER && DB_PASSWORD
    ? `${DB_URL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
    : `${DB_URL}://${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`
console.log(dsn)

export const connectDb = async () =>
  await mongoose.connect(dsn, {
    connectTimeoutMS: 10000,
  })

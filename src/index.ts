import cors from 'cors'
import express from 'express'

import { connectDb } from '@config/database'

import authRoutes from '@routes/auth-routes'
import commentRoutes from '@routes/comment-routes'
import productRoutes from '@routes/product-routes'
import userRoutes from '@routes/user-routes'
import videoRoutes from '@routes/video-routes'

const ALLOWED_DOMAINS = process.env.ALLOWED_DOMAINS

const app = express()
app.use(express.json())
app.use(
  cors({
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    methods: '*',
    maxAge: 60 * 60 * 7,
    origin: ALLOWED_DOMAINS ? ALLOWED_DOMAINS.split(';') : 'http://localhost:3000',
  }),
)

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', videoRoutes)
app.use('/api', productRoutes)
app.use('/api', commentRoutes)

connectDb().then((_db) => {
  app.listen(process.env.APP_PORT, () => {
    console.info(`Server running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`)
  })
})

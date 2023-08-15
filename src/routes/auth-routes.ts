import { Router } from 'express'

import { login } from '@controllers/auth-controller'

const authRoutes: Router = Router()

authRoutes.post('/auth/login', login)

export default authRoutes

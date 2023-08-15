import { Router } from 'express'

import { createUser, findAllUsers, findUserByUsername } from '@controllers/user-controller'

const userRoutes: Router = Router()

userRoutes.get('/users', findAllUsers)
userRoutes.get('/users/:username', findUserByUsername)
userRoutes.post('/users', createUser)

export default userRoutes

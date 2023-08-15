import { Request, Response } from 'express'

import { getAllUsers, getUserByUsername, insertUser } from '@services/user-service'

import { statusFail, statusOK } from '@helpers/json-response'

export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()

    statusOK({
      res,
      data: users,
    })
  } catch (err: any) {
    statusFail({ res, msg: err.message })
  }
}

export const findUserByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params

    if (!username) {
      throw new Error("Parameter 'username' is required")
    }

    const user = await getUserByUsername(username)

    statusOK({
      res,
      data: user,
    })
  } catch (err: any) {
    statusFail({ res, msg: err.message })
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, avatarUrl } = req.body

    if (!username) {
      throw new Error("Parameter 'username' is required")
    }

    const user = await insertUser(username, avatarUrl)
    if (await user.save()) {
      statusOK({
        res,
        data: user,
        msg: 'User successfully added',
      })
    } else {
      throw new Error('An error occurred when adding new user')
    }
  } catch (err: any) {
    statusFail({ res, msg: err.message })
  }
}

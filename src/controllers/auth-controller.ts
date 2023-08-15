import { Request, Response } from 'express'

import { getUserByUsername, insertUser } from '@services/user-service'

import { statusFail, statusOK } from '@helpers/json-response'

export const login = async (req: Request, res: Response) => {
  try {
    const { username } = req.body

    if (!username) {
      throw new Error("Parameter 'username' is required")
    }

    let user = await getUserByUsername(username)

    if (!user) {
      user = await insertUser(username)
    }

    res.cookie('auth', user.username)
    statusOK({
      res,
      data: user,
    })
  } catch (err: any) {
    statusFail({ res, msg: err.message })
  }
}

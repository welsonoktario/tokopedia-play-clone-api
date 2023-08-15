import { Request, Response } from 'express'
import { Types, isValidObjectId } from 'mongoose'

import { getAllVideoComments, insertVideoComment } from '@services/comment-service'
import { getUserByUsername } from '@services/user-service'

import { statusCreated, statusFail, statusOK } from '@helpers/json-response'

export const findAllVideoComments = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params

    if (!videoId) {
      throw new Error("Parameter 'videoId' is required")
    }

    const videoObjectId = new Types.ObjectId(videoId)

    if (!isValidObjectId(videoObjectId)) {
      throw new Error("Provided 'videoId' parameter is not a valid ObjectId")
    }

    const comments = await getAllVideoComments(videoObjectId)

    statusOK({
      res,
      data: comments,
    })
  } catch (err: any) {
    statusFail({
      res,
      msg: 'Error: ' + err.message,
    })
  }
}

export const createVideoComment = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params
    const body = req.body

    if (!videoId) {
      throw new Error("Parameter 'videoId' is required")
    }

    if (!body.hasOwnProperty('username') && !body.username) {
      throw new Error("Parameter 'username' is required")
    }

    if (!body.hasOwnProperty('comment') && !body.comment) {
      throw new Error("Parameter 'comment' is required")
    }

    const videoObjectId = new Types.ObjectId(videoId)

    const user = await getUserByUsername(body.username)

    if (!user) {
      throw new Error('User not found');
    }

    const comment = await insertVideoComment(videoObjectId, user.username, body.comment)

    if (!comment) {
      throw new Error('An error occurred when adding new comment')
    }

    statusCreated({
      res,
      data: comment,
      msg: 'Comment successfully added',
    })
  } catch (err: any) {
    statusFail({
      res,
      msg: err.message,
    })
  }
}

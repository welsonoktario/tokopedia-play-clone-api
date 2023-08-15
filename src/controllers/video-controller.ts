import { Request, Response } from 'express'
import { Types, isValidObjectId } from 'mongoose'

import { getUserByUsername } from '@services/user-service'
import { getAllVideos, getVideoById, insertVideo } from '@services/video-service'

import { statusCreated, statusFail, statusOK } from '@helpers/json-response'

export const findAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = await getAllVideos()

    statusOK({
      res,
      data: videos,
    })
  } catch (err: any) {
    statusFail({
      res,
      msg: 'Error: ' + err.message,
    })
  }
}

export const findVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params

    if (!videoId) {
      throw new Error("Parameter 'videoId' is required")
    }

    const objectId = new Types.ObjectId(videoId)

    if (!isValidObjectId(objectId)) {
      throw new Error("Provided 'videoId' parameter is not a valid ObjectId")
    }

    const video = await getVideoById(objectId)

    statusOK({
      res,
      data: video,
    })
  } catch (err: any) {
    statusFail({ res, msg: err.message })
  }
}

export const createVideo = async (req: Request, res: Response) => {
  try {
    const { username, thumbnailUrl } = req.body

    if (!username) {
      throw new Error("Parameter 'username' is required")
    }

    if (!thumbnailUrl) {
      throw new Error("Parameter 'thumbnailUrl' is required")
    }

    const user = await getUserByUsername(username)
    const video = await insertVideo(user.id, thumbnailUrl)

    if (!video) {
      statusFail({
        res,
        msg: 'An error occurred when adding new video',
      })
    }

    statusCreated({
      res,
      data: video,
      msg: 'Video successfully added',
    })
  } catch (err: any) {
    statusFail({ res, msg: err.message })
  }
}

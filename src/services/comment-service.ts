import { Types } from 'mongoose'

import { Comment } from '@models/comment-model'
import { User, UserType } from '@models/user-model'
import { Video } from '@models/video-model'

export const getAllVideoComments = async (videoId: Types.ObjectId) => {
  try {
    const video = await Video.findById(videoId)

    if (!video) {
      throw new Error('Video data not found')
    }

    return video.comments
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const insertVideoComment = async (
  videoId: Types.ObjectId,
  username: string,
  comment: string,
) => {
  try {
    const video = await Video.findById(videoId)

    if (!video) {
      throw new Error('Video data not found')
    }

    const user = await User.findOne({ username })

    if (!user) {
      throw new Error('User data not found')
    }

    const commentModel = new Comment({
      user,
      comment,
    })

    video.comments!.push(commentModel)

    const insert = await video.save()

    if (insert) {
      return commentModel
    }
  } catch (err: any) {
    throw new Error(err.message)
  }
}

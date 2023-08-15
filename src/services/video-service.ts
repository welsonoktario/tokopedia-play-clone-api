import { Types } from 'mongoose'

import { Video } from '@models/video-model'

export const getAllVideos = async () => {
  try {
    return await Video.find().select(['id', 'title', 'thumbnailUrl', 'user']).populate('user')
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const getVideoById = async (videoId: Types.ObjectId) => {
  try {
    const video = await Video.findById(videoId)

    if (!video) {
      throw new Error('Video data not found')
    }

    return video
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const insertVideo = async (
  user: Types.ObjectId,
  title: string,
  embedUrl: string,
  thumbnailUrl: string,
) => {
  try {
    const video = new Video({
      user,
      title,
      embedUrl,
      thumbnailUrl,
    })

    return await video.save()
  } catch (err: any) {
    throw new Error(err.message)
  }
}

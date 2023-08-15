import { Router } from 'express'

import { createVideo, findAllVideos, findVideo } from '@controllers/video-controller'

const videoRoutes: Router = Router()

videoRoutes.get('/videos', findAllVideos)
videoRoutes.get('/videos/:videoId', findVideo)
videoRoutes.post('/videos', createVideo)

export default videoRoutes

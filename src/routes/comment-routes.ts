import { Router } from 'express'

import { createVideoComment, findAllVideoComments } from '@controllers/comment-controller'

const commentRoutes: Router = Router()

commentRoutes.get('/videos/:videoId/comments', findAllVideoComments)
commentRoutes.post('/videos/:videoId/comments', createVideoComment)

export default commentRoutes

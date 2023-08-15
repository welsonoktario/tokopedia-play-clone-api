import { Router } from 'express'

import { createProduct, findAllVideoProducts, findProduct } from '@controllers/product-controller'

const productRoutes: Router = Router()

productRoutes.get('/videos/:videoId/products', findAllVideoProducts)
productRoutes.get('/videos/:videoId/products/:productId', findProduct)
productRoutes.post('/videos/:videoId/products', createProduct)

export default productRoutes

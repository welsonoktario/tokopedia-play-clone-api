import { Request, Response } from 'express'
import { Types, isValidObjectId } from 'mongoose'

import { getAllVideoProducts, getProductById, insertProduct } from '@services/product-service'

import { statusFail, statusOK } from '@helpers/json-response'

export const findAllVideoProducts = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params

    if (!videoId) {
      throw new Error("Parameter 'videoId' is required")
    }

    const videoObjectId = new Types.ObjectId(videoId)

    if (!isValidObjectId(videoObjectId)) {
      throw new Error("Provided 'videoId' parameter is not a valid ObjectId")
    }

    const products = await getAllVideoProducts(videoObjectId)

    statusOK({
      res,
      data: products,
    })
  } catch (err: any) {
    statusFail({
      res,
      msg: 'Error: ' + err.message,
    })
  }
}

export const findProduct = async (req: Request, res: Response) => {
  try {
    const { videoId, productId } = req.params

    if (!videoId) {
      throw new Error("Parameter 'videoId' is required")
    }

    if (!productId) {
      throw new Error("Parameter 'id' is required")
    }

    const videoObjectId = new Types.ObjectId(videoId)
    const productObjectId = new Types.ObjectId(productId)

    if (!isValidObjectId(videoObjectId)) {
      throw new Error("Provided 'videoId' parameter is not a valid ObjectId")
    }

    if (!isValidObjectId(productObjectId)) {
      throw new Error("Provided 'id' parameter is not a valid ObjectId")
    }

    const product = await getProductById(videoObjectId, productObjectId)

    statusOK({
      res,
      data: product,
    })
  } catch (err: any) {
    statusFail({ res, msg: err.message })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params
    const { title, price } = req.body

    if (!videoId) {
      throw new Error("Parameter 'videoId' is required")
    }

    if (!title) {
      throw new Error("Parameter 'title' is required")
    }

    if (!price) {
      throw new Error("Parameter 'price' is required")
    }

    const videoObjectId = new Types.ObjectId(videoId)
    const product = await insertProduct(videoObjectId, title, price)

    if (!product) {
      throw new Error('An error occurred when inserting product')
    }

    statusOK({
      res,
      data: product,
      msg: 'Product created successfully',
    })
  } catch (err: any) {
    statusFail({ res, msg: err.message })
  }
}

import mongoose, { Schema, Types } from 'mongoose'

export type ProductType = {
  title: string
  price: number
  url: string
  thumbnailUrl: string
}

export const ProductSchema = new Schema<ProductType>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  url: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
})

export const Product = mongoose.model<ProductType>('Product', ProductSchema)

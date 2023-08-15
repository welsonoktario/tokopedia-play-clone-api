import { Model, Schema, model } from 'mongoose'
import { UserSchema, UserType } from './user-model'

export type CommentType = {
  user: UserType
  comment: string
  timestamp?: Date
}
type CommentModelType = Model<CommentType>
export const CommentSchema = new Schema<CommentType, CommentModelType>({
  user: { type: UserSchema, required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date, required: false, default: Date.now },
})

export const Comment = model<CommentType, CommentModelType>('Comment', CommentSchema)

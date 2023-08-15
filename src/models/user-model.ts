import mongoose, { Model, Schema, Types } from 'mongoose'

export type UserType = {
  _id: Types.ObjectId
  username: string
  avatarUrl?: string
}

type UserModelType = Model<UserType>
export const UserSchema = new Schema<UserType, UserModelType>({
  username: { type: String, required: true },
  avatarUrl: { type: String, required: false },
})

export const User = mongoose.model<UserType, UserModelType>('User', UserSchema)

import { User } from '@models/user-model'

export const getAllUsers = async () => {
  try {
    return await User.find()
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const getUserByUsername = async (username: string) => {
  try {
    const user = await User.findOne({ username })

    return user
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const insertUser = async (username: string, avatarUrl: string | undefined = undefined) => {
  try {
    const userExists = await User.findOne({ username })

    if (userExists) {
      return userExists
    }

    const user = new User({
      username,
      avatarUrl: avatarUrl ?? `https://ui-avatars.com/api/?name=${username}`,
    })

    return await user.save()
  } catch (err: any) {
    throw new Error(err.message)
  }
}

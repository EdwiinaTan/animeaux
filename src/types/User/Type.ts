import { Picture } from '..'

export interface UserType {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  picture: Picture[]
  animalId: string[]
  password: string
  token: string
}

export interface UserClient {
  createdTime: string
  fields: UserType
  id: string
}

export type UserOmit = Omit<UserType, 'id' | 'picture' | 'animalId' | 'token'>
export type UserTokenOmit = Omit<UserType, 'id' | 'picture' | 'animalId' | 'token'>
export type UserRequest = UserOmit & {
  confirmPassword: string
}

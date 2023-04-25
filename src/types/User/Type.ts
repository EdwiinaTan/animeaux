import { Picture } from '..'

export interface UserType {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  picture: Picture[]
  animalId: string[]
  note: string
}

export interface UserClient {
  createdTime: string
  fields: UserType
  id: string
}

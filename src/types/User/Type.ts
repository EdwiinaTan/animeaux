import { Picture } from '..'

export interface UserType {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  photo: Picture[]
  animalId: string
  note: string
}

export interface UserClient {
  createdTime: string
  fields: UserType
  id: string
}

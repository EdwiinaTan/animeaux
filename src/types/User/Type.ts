import { Pictures } from '..'

export interface UserType {
  id: string
  lastname: string
  firstname: string
  email: string
  phone: string
  picture: Pictures[]
  animal: string
  note: string
}

export interface UserClient {
  createdTime: string
  fields: UserType
  id: string
}

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

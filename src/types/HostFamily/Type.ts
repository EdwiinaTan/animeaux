import { Pictures } from '..'

export interface HostFamilyType {
  id: string
  lastname: string
  firstname: string
  email: string
  phone: string
  postalCode: string
  city: string
  address?: string
  picture: Pictures[]
  updatedAt: string
  createdAt: string
  animalId: string
  criteria: string
  notice: string
  description: string
  onBreak: string
}

export interface HostFamilyClient {
  createdTime: string
  fields: HostFamilyType
  id: string
}

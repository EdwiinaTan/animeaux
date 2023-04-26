import { Picture } from '..'

export interface HostFamilyType {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  postalCode: string
  city: string
  address?: string
  picture: Picture[]
  createdAt: string
  animalId: string[]
  criteria: string
  description: string
  onBreak: string
}

export interface HostFamilyClient {
  createdTime: string
  fields: HostFamilyType
  id: string
}

export type HostFamilyRequest = Omit<HostFamilyType, 'id' | 'picture' | 'createdAt'>

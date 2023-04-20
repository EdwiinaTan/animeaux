import { Picture } from '..'

export interface HostFamilyType {
  id: string
  nom: string
  prenom: string
  email: string
  phone: string
  postalCode: string
  city: string
  address?: string
  photo: Picture[]
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

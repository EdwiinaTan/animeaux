import { AnimalType } from 'src/types/Animal/Type'
import { UserType } from 'src/types/User/Type'

export interface ReturnUser {
  statusUser: 'error' | 'success' | 'loading'
  userData: UserType
}

export type UserProps = {
  params?: {
    animalDetails: AnimalType
  }
}

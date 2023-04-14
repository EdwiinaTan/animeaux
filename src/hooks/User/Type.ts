import { AnimalType } from 'src/types/Animal/Type'
import { UserClient, UserType } from 'src/types/User/Type'

export interface ReturnUser {
  statusUser: 'error' | 'success' | 'loading'
  userData: UserType
}

export interface ReturnUsers {
  statusUsers: 'error' | 'success' | 'loading'
  usersData: UserClient[]
}

export type UserProps = {
  params?: {
    animalDetails: AnimalType
  }
}

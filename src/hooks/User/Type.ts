import { AnimalType } from 'src/types/Animal/Type'
import { FetchStatus } from 'src/types/Status'
import { UserClient, UserType } from 'src/types/User/Type'

export interface ReturnUser {
  statusUser: FetchStatus
  userData: UserType
}

export interface ReturnUsers {
  statusUsers: FetchStatus
  usersData: UserClient[]
}

export type UserProps = {
  params?: {
    animalDetails: AnimalType
  }
}

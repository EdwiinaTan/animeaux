import { Picture } from './../index'
import {
  AnimalAgreement,
  AnimalColorEnum,
  AnimalGenderEnum,
  AnimalRaceEnum,
  AnimalReasonEnum,
  AnimalStatusEnum,
  AnimalTypeEnum,
} from './enum'

export interface AnimalType {
  id: string
  name: string
  species: AnimalTypeEnum
  gender: AnimalGenderEnum
  hostFamilyId?: string
  alias?: string
  icad: string
  birthday?: string
  race: AnimalRaceEnum
  color: AnimalColorEnum
  publicDescription?: string
  status: AnimalStatusEnum
  placeAssigned: string
  reason: AnimalReasonEnum
  childAgreement: AnimalAgreement
  catAgreement: AnimalAgreement
  dogAgreement: AnimalAgreement
  isSterilized?: boolean
  pictures: Picture[]
  userId: string
  privateDescription?: string
  dateAssigned: string
}

export interface AnimalClient {
  createdTime: string
  fields: AnimalType
  id: string
}

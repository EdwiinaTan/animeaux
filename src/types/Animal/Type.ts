import { Pictures } from '..'
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
  espece: AnimalTypeEnum
  genre: AnimalGenderEnum
  hostFamilyId?: string
  alias?: string
  icad: string
  birthday?: string
  race: AnimalRaceEnum
  couleur: AnimalColorEnum
  publicDescription?: string
  status: AnimalStatusEnum
  placeCare: string
  reason: AnimalReasonEnum
  childAgreement: AnimalAgreement
  catAgreement: AnimalAgreement
  dogAgreement: AnimalAgreement
  isSterilised?: boolean
  pictures: Pictures[]
  userId: string
  privateDescription?: string
  dateInCharge: string
}

export interface AnimalClient {
  createdTime: string
  fields: AnimalType
  id: string
}

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
  dateNaissance?: string
  race: AnimalRaceEnum
  couleur: AnimalColorEnum
  descriptionPublique?: string
  status: AnimalStatusEnum
  lieuEnCharge: string
  raison: AnimalReasonEnum
  ententeEnfant: AnimalAgreement
  ententeChat: AnimalAgreement
  ententeChien: AnimalAgreement
  sterilise?: boolean
  photos: Picture[]
  userId: string
  descriptionPrivee?: string
  dateEnCharge: string
}

export interface AnimalClient {
  createdTime: string
  fields: AnimalType
  id: string
}

import { Picture } from './../index'
import { FormAgreementEnum, FormResidenceEnum, FormResidenceTypeEnum } from './enum'

export interface FormInscriptionType {
  id: string
  animalName?: string
  animalRace?: string
  animalGender?: string
  firstName: string
  lastName: string
  facebookUsername: string
  picture?: Picture[]
  address: string
  postalCode: string
  city: string
  phoneOne: string
  phoneTwo?: string
  email: string
  proSituation: string
  absenceHours: number
  remoteWork?: string
  vehicle: FormAgreementEnum
  rescheduleVeterinary: string
  residenceType: FormResidenceEnum
  residence: FormResidenceTypeEnum
  surfaceArea: number
  quarantineRoom: FormAgreementEnum
  garden: FormAgreementEnum
  balcony: FormAgreementEnum
  authorizedRooms: string
  hasChild: FormAgreementEnum
  hasAnimal: FormAgreementEnum
  educationalKnowledge: FormAgreementEnum
  agreeableFamily: string
  food: string
  animalSleeping: string
  animalNotPresent: string
  animalHoliday: string
  allergy: FormAgreementEnum
  animalBehaviorProblem: string
  freeUpTime: string
  vetName?: string
  vetAddress?: string
  vetPhone?: string
  vetEmail?: string
  newColoc: number
}

export interface FormInscriptionClient {
  createdTime: string
  fields: FormInscriptionType
  id: string
}

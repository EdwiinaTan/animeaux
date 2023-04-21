import { Picture } from './../index'

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
  absenceHours: string
  remoteWork?: string
  vehicle: string
  rescheduleVeterinary: string
  residenceType: string
  residence: string
  surfaceArea: string
  quarantineRoom: string
  garden: string
  balcony: string
  authorizedRooms: string
  hasChild: string
  hasAnimal: string
  educationalKnowledge: string
  agreeableFamily: string
  food: string
  animalSleeping: string
  animalNotPresent: string
  animalHoliday: string
  allergy: string
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

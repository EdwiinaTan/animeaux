import { AnimalType } from 'src/types/Animal/Type'

export type AnimalRouteParams = {
  animalScreen: undefined
  animalInformation: {
    animalDetails: AnimalType
  }
  animalUserInCharge: {
    userId: string
  }
  animalUpdateProfile: {
    animalDetails: AnimalType
  }
  animalUpdateSituation: {
    animalDetails: AnimalType
  }
  animalUpdatePhoto: {
    animalDetails: AnimalType
  }
  hostFamilyInformation: {
    hostFamilyId: string
  }
}

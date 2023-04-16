import { AnimalType } from './../../../../types/Animal/Type'

export type AnimalRouteParams = {
  animalScreen: undefined
  animalInformation: {
    animalDetails: AnimalType
  }
  animalUserInCharge: {
    animalDetails: AnimalType
  }
  animalUpdateProfil: {
    animalDetails: AnimalType
  }
  animalUpdateSituation: {
    animalDetails: AnimalType
  }
}

import { AnimalType } from 'src/types/Animal/Type'
import { HostFamilyType } from 'src/types/HostFamily/Type'

export type AnimalRouteParams = {
  animalScreen: undefined
  animalInformation: {
    animalDetails: AnimalType
  }
  animalUserInCharge: {
    animalDetails: AnimalType
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
    hostFamilyDetails: HostFamilyType
  }
}

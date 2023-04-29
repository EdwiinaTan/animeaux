import { AnimalType } from 'src/types/Animal/Type'

export type ProfileRouteParams = {
  profileScreen: undefined
  animalInformation: {
    animalDetails: AnimalType
  }
  hostFamilyInformation: {
    hostFamilyId: string
  }
  animalUserInCharge: {
    id: string
  }
  userUpdate: undefined
}

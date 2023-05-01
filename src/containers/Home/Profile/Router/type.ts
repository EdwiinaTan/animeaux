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
  userInfo: {
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
  userUpdate: undefined
  usersScreen: undefined
}

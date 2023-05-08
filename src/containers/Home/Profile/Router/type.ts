import { AnimalType } from 'src/types/Animal/Type'
import { UserType } from 'src/types/User/Type'

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
  updateProfilePhoto: {
    user: UserType
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
  loginHomeScreen: undefined
}

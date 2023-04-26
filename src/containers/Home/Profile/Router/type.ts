import { AnimalType } from 'src/types/Animal/Type'
import { HostFamilyType } from 'src/types/HostFamily/Type'

export type ProfileRouteParams = {
  profileScreen: undefined
  animalInformation: {
    animalDetails: AnimalType
  }
  hostFamilyInformation: {
    hostFamilyDetails: HostFamilyType
  }
  animalUserInCharge: {
    id: string
  }
}

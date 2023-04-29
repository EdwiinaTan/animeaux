import { AnimalType } from 'src/types/Animal/Type'
import { HostFamilyType } from 'src/types/HostFamily/Type'

export type HostFamilyRouteParams = {
  hostFamilyScreen: undefined
  hostFamilyInformation: {
    hostFamilyId: string
  }
  hostFamilyUpdate: {
    hostFamilyDetails: HostFamilyType
  }
  hostFamilyAnimalHosted: {
    animalId: string[]
  }
  animalInformation: {
    animalDetails: AnimalType
  }
}

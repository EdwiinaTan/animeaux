import { HostFamilyType } from 'src/types/HostFamily/Type'

export type HostFamilyRouteParams = {
  hostFamilyScreen: undefined
  hostFamilyInformation: {
    hostFamilyId: string
  }
  hostFamilyUpdate: {
    hostFamilyDetails: HostFamilyType
  }
}

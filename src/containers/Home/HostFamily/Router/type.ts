import { HostFamilyType } from './../../../../types/HostFamily/Type'

export type HostFamilyRouteParams = {
  hostFamilyScreen: undefined
  hostFamilyInformation: {
    hostFamilyDetails: HostFamilyType
  }
  hostFamilyUpdate: {
    hostFamilyDetails: HostFamilyType
  }
}

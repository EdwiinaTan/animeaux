import { HostFamilyClient, HostFamilyType } from 'src/types/HostFamily/Type'
import { FetchStatus } from 'src/types/Status'

export interface ReturnHostFamily {
  statusHostFamily: FetchStatus
  hostFamilyData: HostFamilyType
}

export interface ReturnHostFamilies {
  statusHostFamilies: FetchStatus
  hostFamiliesData: HostFamilyClient[]
}

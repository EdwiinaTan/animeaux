import { HostFamilyClient, HostFamilyType } from 'src/types/HostFamily/Type'

export interface ReturnHostFamily {
  statusHostFamily: 'error' | 'success' | 'loading'
  hostFamilyData: HostFamilyType
}

export interface ReturnHostFamilies {
  statusHostFamilies: 'error' | 'success' | 'loading'
  hostFamiliesData: HostFamilyClient[]
}

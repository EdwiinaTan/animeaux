import { HostFamilyType } from 'src/types/HostFamily/Type'

export type HostFamilyRequest = Omit<HostFamilyType, 'id' | 'picture' | 'createdAt'>

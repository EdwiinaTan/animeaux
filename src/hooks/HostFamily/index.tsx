import { useQuery } from '@tanstack/react-query'
import { getHostFamilies, getHostFamilyById } from 'src/client/HostFamily'
import { HostFamilyClient, HostFamilyType } from 'src/types/HostFamily/Type'
import { ReturnHostFamilies, ReturnHostFamily } from './Type'

export const useGetHostFamilyById = (hostFamilyId: string): ReturnHostFamily => {
  const { status: statusHostFamily, data: hostFamilyData } = useQuery<HostFamilyType, Error>({
    enabled: hostFamilyId !== null,
    queryKey: ['hostFamily', hostFamilyId],
    queryFn: () => getHostFamilyById(hostFamilyId || ''),
  })

  return {
    statusHostFamily,
    hostFamilyData,
  }
}

export const useGetHostFamilies = (): ReturnHostFamilies => {
  const { status: statusHostFamilies, data: hostFamiliesData } = useQuery<
    HostFamilyClient[],
    Error
  >({
    queryKey: ['hostFamilies'],
    queryFn: getHostFamilies,
  })
  return {
    statusHostFamilies,
    hostFamiliesData,
  }
}

import { useQuery } from '@tanstack/react-query'
import { getUserById } from 'src/client/User'
import { UserType } from 'src/types/User/Type'
import { ReturnUser } from './Type'

export const useGetUserById = (userId: string): ReturnUser => {
  const { status: statusUser, data: userData } = useQuery<UserType>({
    enabled: userId !== null, // à cause de tsconfig strict true
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId || ''),
  })

  return {
    statusUser,
    userData,
  }
}

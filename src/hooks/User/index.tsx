import { useQuery } from '@tanstack/react-query'
import { getUserById, getUsers } from 'src/client/User'
import { UserClient, UserType } from 'src/types/User/Type'
import { ReturnUser, ReturnUsers } from './Type'

export const useGetUserById = (userId: string): ReturnUser => {
  const { status: statusUser, data: userData } = useQuery<UserType, Error>({
    enabled: userId !== null, // à cause de tsconfig strict true
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId || ''),
  })

  return {
    statusUser,
    userData,
  }
}

export const useGetUsers = (): ReturnUsers => {
  const { status: statusUsers, data: usersData } = useQuery<UserClient[], Error>({
    queryKey: ['users'],
    queryFn: getUsers,
  })
  return {
    statusUsers,
    usersData,
  }
}

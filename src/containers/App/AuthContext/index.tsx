import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useMemo, useState } from 'react'
import bcrypt from 'react-native-bcrypt'
import { useGetUsers } from 'src/hooks/User'
import { AuthProps } from './Type'

const initialContext: AuthProps = {
  userId: '',
  isLoading: false,
  loginUser: () => null,
  logoutUser: () => null,
}

export const AuthContext = createContext(initialContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { usersData } = useGetUsers()

  const loginUser = async (password: string) => {
    const matchingUser = usersData.filter((user) =>
      bcrypt.compareSync(password, user.fields.password)
    )
    if (matchingUser.length > 0) {
      const userId = matchingUser[0].fields.id
      await AsyncStorage.setItem('userId', userId)
      setUserId(userId)
    }
    setIsLoading(false)
  }

  const logoutUser = async () => {
    setUserId(null)
    setIsLoading(false)
    await AsyncStorage.removeItem('userId')
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true)
      let userId = await AsyncStorage.getItem('userId')
      if (userId) {
        setUserId(userId)
      }
      setIsLoading(false)
    } catch (e) {
      console.log('e', e)
    }
  }

  useEffect(() => {
    console.log('aaa')
    isLoggedIn()
  }, [])

  const value = useMemo(() => {
    return {
      userId,
      isLoading,
      loginUser,
      logoutUser,
    }
  }, [isLoading, loginUser, logoutUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

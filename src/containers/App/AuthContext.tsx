import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useMemo, useState } from 'react'
import bcrypt from 'react-native-bcrypt'
import { useGetUsers } from 'src/hooks/User'

interface AuthProps {
  userId: string
  isLoading: boolean
  loginUser: (passwortd: string) => void
  logoutUser: () => void
}

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

  const loginUser = (password: string) => {
    usersData.map((user) => {
      if (bcrypt.compareSync(password, user.fields.password) === true) {
        AsyncStorage.setItem('userId', user.fields.id)
        setUserId(user.fields.id)
      }
    })
    setIsLoading(false)
  }

  const logoutUser = () => {
    setUserId(null)
    setIsLoading(false)
    AsyncStorage.removeItem('userId')
    AsyncStorage.removeItem('userToken')
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

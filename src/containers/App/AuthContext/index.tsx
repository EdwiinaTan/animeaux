import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useMemo, useState } from 'react'
import bcrypt from 'react-native-bcrypt'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
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

  const loginUser = async (email: string, password: string) => {
    usersData.forEach(async (user) => {
      if (user.fields.email === email) {
        const match = await new Promise((resolve, reject) => {
          bcrypt.compare(password, user.fields.password, (err, result) => {
            if (err) {
              console.log('err', err)
              reject(err)
            } else {
              console.log('result', result)
              resolve(result)
            }
          })
        })
        if (match) {
          SnackbarToastComponent({ title: 'Connexion réussie' })
          await AsyncStorage.setItem('userId', user.id)
          setUserId(user.id)
        } else {
          SnackbarToastComponent({ type: 'error', title: `Erreur d'authentification` })
        }
      }
    })
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

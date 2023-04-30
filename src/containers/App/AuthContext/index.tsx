import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createContext, useEffect, useMemo, useState } from 'react'
import bcrypt from 'react-native-bcrypt'
import 'react-native-get-random-values' // allow crypto.getRandomValues() to support
import { updateUserById } from 'src/client/User'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { useGetUsers } from 'src/hooks/User'
import { v4 as uuidv4 } from 'uuid'
import { AuthProps } from './Type'

const initialContext: AuthProps = {
  userId: '',
  userToken: '',
  isLoading: false,
  loginUser: () => null,
  logoutUser: () => null,
}

export const AuthContext = createContext(initialContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState('')
  const [userToken, setUserToken] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { usersData } = useGetUsers()
  const queryClient = useQueryClient()
  const saltRounds = 10

  const mutation = useMutation({
    mutationFn: updateUserById,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', { id: userId }], data)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (err) => {
      SnackbarToastComponent({
        type: 'error',
        title: 'Erreur',
      })
      console.log('err', err)
    },
  })

  const loginUser = async (email: string, password: string) => {
    usersData.forEach(async (user) => {
      if (user.fields.email === email) {
        const match = await new Promise((resolve, reject) => {
          bcrypt.compare(
            password,
            user.fields.password,
            (err, result) => {
              if (err) {
                console.log('err', err)
                reject(err)
              } else {
                console.log('result', result)
                resolve(result)
              }
            },
            (progress) => {
              //faire le loading
              console.log('progress', progress)
            }
          )
        })
        if (match) {
          setUserId(user.id)
          const token = bcrypt.hashSync(uuidv4(), saltRounds)
          setUserToken(token)
          const dataUpdate = {
            token: token,
          }
          mutation.mutateAsync({ id: user.id, values: dataUpdate })
          SnackbarToastComponent({ title: 'Connexion réussie' })
          await AsyncStorage.setItem('userToken', token)
        } else {
        }
      }
    })
    setIsLoading(false)
  }

  const logoutUser = async () => {
    setUserId(null)
    setUserToken(null)
    setIsLoading(false)
    const dataUpdate = {
      token: null,
    }
    mutation.mutateAsync({ id: userId, values: dataUpdate })
    await AsyncStorage.removeItem('userToken').then(() => {
      SnackbarToastComponent({ type: 'info', title: 'À bientôt ! 👋' })
    })
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true)
      let userTokenId = await AsyncStorage.getItem('userToken')
      if (userTokenId) {
        setUserToken(userTokenId)
      }
      setIsLoading(false)
    } catch (e) {
      console.log('e', e)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  const value = useMemo(() => {
    return {
      userId,
      userToken,
      isLoading,
      loginUser,
      logoutUser,
    }
  }, [isLoading, loginUser, logoutUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

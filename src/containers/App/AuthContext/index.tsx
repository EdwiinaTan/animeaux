import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createContext, useEffect, useMemo, useState } from 'react'
import bcrypt from 'react-native-bcrypt'
import { updateUserById } from 'src/client/User'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { useGetUsers } from 'src/hooks/User'
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

  const mutation = useMutation({
    mutationFn: updateUserById,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', { id: userId }], data)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      SnackbarToastComponent({ title: 'Connexion réussie' })
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
          const token = bcrypt.hashSync(`${user.id}${user.fields.email}`)
          setUserToken(token)
          const data = {
            firstName: user.fields.firstName,
            lastName: user.fields.lastName,
            email: user.fields.email,
            password: user.fields.password,
            phone: user.fields.phone,
            token: token,
          }
          mutation.mutateAsync({ id: user.id, values: data })
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
    await AsyncStorage.removeItem('userToken')
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
    console.log('token', userToken)

    console.log('aaa')
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

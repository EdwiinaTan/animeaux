import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createContext, useMemo, useState } from 'react'
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
  setUserToken: () => null,
  isLoading: false,
  loginUser: () => null,
  logoutUser: () => null,
}

export const AuthContext = createContext(initialContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState('')
  const [userToken, setUserToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { usersData } = useGetUsers()
  const queryClient = useQueryClient()
  const saltRounds = 10

  const mutation = useMutation({
    mutationFn: updateUserById,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', { id: userId }], data)
      queryClient.invalidateQueries({ queryKey: ['getUserToken'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setIsLoading(false)
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
    const userAuth = usersData.filter((user) => user.fields.email === email)
    console.log('userAuth', userAuth)
    if (userAuth.length > 0) {
      setIsLoading(true)
      const match = await new Promise((resolve, reject) => {
        bcrypt.compare(
          password,
          userAuth[0].fields.password,
          (err, result) => {
            if (err) {
              console.log('err', err)
              reject(err)
            } else {
              console.log('result', result)
              resolve(result)
              if (result === true) {
                setIsLoading(false)
              }
            }
          },
          (progress) => {
            console.log('progress', progress)
          }
        )
      })
      if (match) {
        //create token by uuidv4 with salt hashed
        const token = bcrypt.hashSync(uuidv4(), saltRounds)
        AsyncStorage.setItem('userToken', token)
        setUserId(userAuth[0].id)
        setUserToken(token)
        const dataUpdate = {
          token: token,
        }
        mutation.mutateAsync({ id: userAuth[0].id, values: dataUpdate })
        SnackbarToastComponent({ title: 'Connexion réussie' })
      } else {
        setIsLoading(false)
        SnackbarToastComponent({ type: 'error', title: 'La connexion a échoué' })
      }
    } else {
      setIsLoading(false)
      SnackbarToastComponent({ type: 'error', title: 'La connexion a échoué' })
    }
  }

  const logoutUser = async () => {
    setUserId(null)
    setIsLoading(false)
    // const dataUpdate = {
    //   token: '',
    // }
    // mutation.mutateAsync({ id: userId, values: dataUpdate })
    // await AsyncStorage.removeItem('userToken').then(() => {
    //   SnackbarToastComponent({ type: 'info', title: 'À bientôt ! 👋' })
    // })
  }

  // const isLoggedIn = async () => {
  //   try {
  //     setIsLoading(true)
  //     let userTokenId = await AsyncStorage.getItem('userToken')
  //     if (userTokenId) {
  //       setUserToken(userTokenId)
  //     }
  //     setIsLoading(false)
  //   } catch (e) {
  //     console.log('e', e)
  //   }
  // }

  // useEffect(() => {
  //   isLoggedIn()
  // }, [])

  const value = useMemo(() => {
    return {
      userId,
      userToken,
      setUserToken,
      isLoading,
      loginUser,
      logoutUser,
    }
  }, [isLoading, loginUser, logoutUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

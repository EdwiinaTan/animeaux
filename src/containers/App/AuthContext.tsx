import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createContext, useEffect, useMemo, useState } from 'react'
import bcrypt from 'react-native-bcrypt'
import { updateUserById } from 'src/client/User'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { useGetUsers } from 'src/hooks/User'

interface AuthProps {
  userId: string
  userToken: string
  isLoading: boolean
  loginUser: (email: string, passwortd: string) => void
  logoutUser: () => void
}

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
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      SnackbarToastComponent({
        title: 'Vous êtes bien connecté',
      })
    },
    onError: (err) => {
      SnackbarToastComponent({
        type: 'error',
        title: 'Erreur',
      })
      console.log('err', err)
    },
  })

  const updateTokenUser = async (data) => {
    mutation.mutate(data)
  }

  const loginUser = (email: string, password: string) => {
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    // const charactersLength = characters.length
    // let token = ''
    // for (let i = 0; i < length; i++) {
    //   token += characters.charAt(Math.floor(Math.random() * charactersLength))
    // }
    usersData.map((user) => {
      if (bcrypt.compareSync(password, user.fields.password) === true) {
        // const payload = {
        //   userId: user.fields.id,
        //   email: email,
        //   password: password,
        //   exp: Math.floor(Date.now() / 1000) + 60 * 60,
        // }
        // let token = CryptoJS.SHA256.encrypt(payload, SECRET_TOKEN).toString() //decrypt
        const token = 'fzfezfkezpofkez'
        const data = {
          ...user.fields,
          token: token,
        }
        console.log('data', data)
        console.log('ici?????')
        AsyncStorage.setItem('userId', user.fields.id)
        AsyncStorage.setItem('userToken', token)
        setUserId(user.fields.id)
        setUserToken(token)
        updateTokenUser(data)
      }
    })
    setIsLoading(false)
  }

  const logoutUser = () => {
    setUserId(null)
    setUserToken(null)
    setIsLoading(false)
    AsyncStorage.removeItem('userId')
    AsyncStorage.removeItem('userToken')
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true)
      let userId = await AsyncStorage.getItem('userId')
      let userToken = await AsyncStorage.getItem('userToken')
      userId = JSON.parse(userId)

      if (userId) {
        setUserId(userId)
        setUserToken(userToken)
      }
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
  }, [userToken, isLoading, loginUser, logoutUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

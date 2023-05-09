import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { useContext, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { theme } from 'src/constant/Theme'
import { AuthContext } from 'src/containers/App/AuthContext'
import { RouterHome } from './Router/Home'
import { RouterLogin } from './Router/Login'

export const AppContainer = () => {
  const { isLoading } = useContext(AuthContext)
  const [token, setToken] = useState<string | undefined>()
  AsyncStorage.getItem('userToken').then((value) => setToken(value))

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.blue} />
      </View>
    )
  }

  return (
    <>
      <View style={{ zIndex: 1 }}>
        <Toast />
      </View>
      <NavigationContainer>{token ? <RouterHome /> : <RouterLogin />}</NavigationContainer>
    </>
  )
}

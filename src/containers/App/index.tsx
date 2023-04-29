import { NavigationContainer } from '@react-navigation/native'
import { useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { theme } from 'src/constant/Theme'
import { AuthContext } from 'src/containers/App/AuthContext'
import { Router } from './Router'
import { RouterAnimal } from './Router/animal'

export const AppContainer = () => {
  const { isLoading, userToken } = useContext(AuthContext)
  console.log('userAppToken', userToken)

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
      <NavigationContainer>{userToken ? <RouterAnimal /> : <Router />}</NavigationContainer>
    </>
  )
}

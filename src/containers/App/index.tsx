import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import { Router } from './Router'

export const AppContainer = () => {
  return (
    <>
      <View style={{ zIndex: 1 }}>
        <Toast />
      </View>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </>
  )
}

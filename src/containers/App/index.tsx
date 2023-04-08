import { NavigationContainer } from '@react-navigation/native'
import { Router } from './Router'

export const AppContainer = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}

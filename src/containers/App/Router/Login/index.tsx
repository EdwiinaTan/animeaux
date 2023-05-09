import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import { LoginRouter } from 'src/containers/Login/Router'

export const RouterLogin: React.FC = () => {
  const Stack = createNativeStackNavigator()

  // LOGIN ROUTE
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="login_screen">
        <Stack.Screen
          name="login_screen"
          component={LoginRouter}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  )
}

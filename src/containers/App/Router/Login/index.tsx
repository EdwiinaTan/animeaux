import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import { PRIVATE_BASE } from 'src/constant/Routes'
import { LoginRouter } from 'src/containers/Login/Router'

export const RouterLogin: React.FC = () => {
  const Stack = createNativeStackNavigator()

  // LOGIN ROUTE
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName={PRIVATE_BASE}>
        {/* <Stack.Screen name={PRIVATE_BASE} component={HomeRouter} options={{ headerShown: false }} /> */}
        <Stack.Screen
          name={PRIVATE_BASE}
          component={LoginRouter}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  )
}
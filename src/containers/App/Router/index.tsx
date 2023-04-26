import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import { PRIVATE_BASE } from 'src/constant/Routes'
import { HomeRouter } from 'src/containers/Home/Router'

export const Router: React.FC = () => {
  const Stack = createNativeStackNavigator()

  return (
    // initialRouteName : Private or login
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName={PRIVATE_BASE}>
        {/* <Stack.Screen name={ROUTES.AUTH.LOGIN} component={Login} options={{ headerShown: true }} /> */}
        <Stack.Screen name={PRIVATE_BASE} component={HomeRouter} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  )
}

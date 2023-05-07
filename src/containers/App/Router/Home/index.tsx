import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import { PRIVATE_BASE } from 'src/constant/Routes'
import { HomeRouter } from 'src/containers/Home/Router'

export const RouterHome: React.FC = () => {
  const Stack = createNativeStackNavigator()

  // ANIMAL AUTH ROUTE
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName={PRIVATE_BASE}>
        <Stack.Screen name={PRIVATE_BASE} component={HomeRouter} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  )
}

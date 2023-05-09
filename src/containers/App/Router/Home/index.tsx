import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import { HomeRouter } from 'src/containers/Home/Router'

export const RouterHome: React.FC = () => {
  const Stack = createNativeStackNavigator()

  // ANIMAL AUTH ROUTE
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="home_screen">
        <Stack.Screen name="home_screen" component={HomeRouter} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  )
}

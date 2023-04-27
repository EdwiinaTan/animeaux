import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeRouter } from 'src/containers/Home/Router'
import { Login } from '..'
import { Register } from '../Register'
import { LoginRouteParams } from './type'

export const LoginRouter: React.FC = () => {
  const Tab = createNativeStackNavigator<LoginRouteParams>()

  return (
    <Tab.Navigator
      initialRouteName="loginScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="loginScreen" component={Login} />
      <Tab.Screen
        name="registerScreen"
        component={Register}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Tab.Screen
        name="animalHomeScreen"
        component={HomeRouter}
        options={{ animation: 'slide_from_right' }}
      />
    </Tab.Navigator>
  )
}

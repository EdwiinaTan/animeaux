import { createNativeStackNavigator } from '@react-navigation/native-stack'
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
    </Tab.Navigator>
  )
}

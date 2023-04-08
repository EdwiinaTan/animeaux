import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HostFamily } from '..'
import { AnimalUpdate } from '../../Animal/Update/Profile'
import { HostFamilyInformation } from '../Information'
import { HostFamilyRouteParams } from './type'

export const HostFamilyRouter: React.FC = () => {
  const Tab = createNativeStackNavigator<HostFamilyRouteParams>()

  return (
    <Tab.Navigator
      initialRouteName="hostFamilyScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="hostFamilyScreen" component={HostFamily} />
      <Tab.Screen
        name="hostFamilyInformation"
        component={HostFamilyInformation}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="hostFamilyUpdate"
        component={AnimalUpdate} // fix
        options={{ animation: 'slide_from_right' }}
      />
    </Tab.Navigator>
  )
}

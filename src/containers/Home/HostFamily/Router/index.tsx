import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HostFamily } from '..'
import { AnimalInformation } from '../../Animal/Information'
import { HostFamilyInformation } from '../Information'
import { HostFamilyUpdate } from '../Update'
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
      <Tab.Screen
        name="hostFamilyScreen"
        component={HostFamily}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="hostFamilyInformation"
        component={HostFamilyInformation}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="hostFamilyUpdate"
        component={HostFamilyUpdate}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="animalInformation"
        component={AnimalInformation}
        options={{ animation: 'slide_from_right' }}
      />
    </Tab.Navigator>
  )
}

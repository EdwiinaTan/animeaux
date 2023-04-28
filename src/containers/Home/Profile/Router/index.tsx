import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserInCharge } from 'src/components/User'
import { Profile } from '..'
import { AnimalInformation } from '../../Animal/Information'
import { HostFamilyInformation } from '../../HostFamily/Information'
import { ProfileRouteParams } from './type'

export const ProfileRouter: React.FC = () => {
  const Tab = createNativeStackNavigator<ProfileRouteParams>()

  return (
    <Tab.Navigator
      initialRouteName="profileScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="profileScreen" component={Profile} />
      <Tab.Screen
        name="animalInformation"
        component={AnimalInformation}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="hostFamilyInformation"
        component={HostFamilyInformation}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="animalUserInCharge"
        component={UserInCharge}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="userUpdate"
        component={UserInCharge}
        options={{ animation: 'slide_from_right' }}
      />
    </Tab.Navigator>
  )
}

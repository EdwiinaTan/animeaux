import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserInCharge } from 'src/components/User'
import { Profile } from '..'
import { AnimalInformation } from '../../Animal/Information'
import { UpdateAnimalPhoto } from '../../Animal/Update/Photo'
import { UpdateAnimalProfile } from '../../Animal/Update/Profile'
import { UpdateAnimalSituation } from '../../Animal/Update/Situation'
import { HostFamilyInformation } from '../../HostFamily/Information'
import { UserUpdate } from '../Update'
import { UpdateProfilePhoto } from '../Update/Photo'
import { UsersScreen } from '../Users'
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
        component={UserUpdate}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="animalUpdateProfile"
        component={UpdateAnimalProfile}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="animalUpdateSituation"
        component={UpdateAnimalSituation}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="animalUpdatePhoto"
        component={UpdateAnimalPhoto}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="usersScreen"
        component={UsersScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="userInfo"
        component={UserInCharge}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="updateProfilePhoto"
        component={UpdateProfilePhoto}
        options={{ animation: 'slide_from_right' }}
      />
    </Tab.Navigator>
  )
}

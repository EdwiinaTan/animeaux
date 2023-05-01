import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserInCharge } from 'src/components/User'
import { Animal } from '..'
import { HostFamilyInformation } from '../../HostFamily/Information'
import { HostFamilyUpdate } from '../../HostFamily/Update'
import { AnimalInformation } from '../Information'
import { UpdateAnimalPhoto } from '../Update/Photo'
import { UpdateAnimalProfile } from '../Update/Profile'
import { UpdateAnimalSituation } from '../Update/Situation'
import { AnimalRouteParams } from './type'

export const AnimalRouter: React.FC = () => {
  const Tab = createNativeStackNavigator<AnimalRouteParams>()

  return (
    <Tab.Navigator
      initialRouteName="animalScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="animalScreen" component={Animal} />
      <Tab.Screen
        name="animalInformation"
        component={AnimalInformation}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="animalUserInCharge"
        component={UserInCharge}
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
        name="hostFamilyInformation"
        component={HostFamilyInformation}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="hostFamilyUpdate"
        component={HostFamilyUpdate}
        options={{ animation: 'slide_from_right' }}
      />
    </Tab.Navigator>
  )
}

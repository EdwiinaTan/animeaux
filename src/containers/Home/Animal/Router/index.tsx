import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserInCharge } from 'src/components/User'
import { Animal } from '..'
import { AnimalInformation } from '../Information'
import { AnimalPhoto } from '../Update/Photo'
import { AnimalUpdate } from '../Update/Profile'
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
        component={AnimalUpdate}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="animalUpdateSituation"
        component={UpdateAnimalSituation}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="animalUpdatePhoto"
        component={AnimalPhoto}
        options={{ animation: 'slide_from_right' }}
      />
    </Tab.Navigator>
  )
}

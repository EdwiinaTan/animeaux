import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Animal } from '..'
import { AnimalInformation } from '../Information'
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
        name="animalUpdateProfil"
        component={AnimalUpdate}
        options={{ animation: 'slide_from_right' }}
      />
      <Tab.Screen
        name="animalUpdateSituation"
        component={UpdateAnimalSituation}
        options={{ animation: 'slide_from_right' }}
      />
    </Tab.Navigator>
  )
}

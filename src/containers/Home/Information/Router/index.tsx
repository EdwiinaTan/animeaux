import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Information } from '..'
import { ResultForm } from '../FormHostFamily/ResultForm'
import { InformationRouteParams } from './type'

export const InformationRouter: React.FC = () => {
  const Tab = createNativeStackNavigator<InformationRouteParams>()

  return (
    <Tab.Navigator
      initialRouteName="informationScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="informationScreen" component={Information} />
      <Tab.Screen
        name="informationForm"
        component={ResultForm}
        options={{ animation: 'slide_from_right' }}
      />
    </Tab.Navigator>
  )
}

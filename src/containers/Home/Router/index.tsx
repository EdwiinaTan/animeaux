import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useRef } from 'react'
import { IconAntDesign, IconIonicons, IconOcticons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { AnimalRouter } from '../Animal/Router'
import { HostFamilyRouter } from '../HostFamily/Router'
import { Information } from '../Information'
import { AddAnimal } from '../NewProfil/Animal'
import { AddHostFamily } from '../NewProfil/HostFamily'
import { Profile } from '../Profile'
import { BottomSheetAdd } from './BottomSheet'
import { ButtomCustom } from './Styled'
import { AddRouteParams, RouteParams } from './Type'

export const HomeRouter: React.FC = () => {
  const Tab = createBottomTabNavigator<RouteParams & AddRouteParams>()
  const bottomSheetModalRef = useRef(null)

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present()
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { position: 'relative' },
        }}
      >
        <Tab.Screen
          name="animal"
          component={AnimalRouter}
          options={{
            tabBarIcon: ({ focused }) => (
              <IconIonicons
                name={focused ? 'paw' : 'ios-paw-outline'}
                size={20}
                color={focused ? theme.colors.primary : theme.colors.grey0}
              />
            ),
          }}
        />
        <Tab.Screen
          name="hostFamily"
          component={HostFamilyRouter}
          options={{
            tabBarIcon: ({ focused }) => (
              <IconIonicons
                name={focused ? 'md-home-sharp' : 'md-home-outline'}
                size={20}
                style={{ paddingRight: 16 }}
                color={focused ? theme.colors.primary : theme.colors.grey0}
              />
            ),
          }}
        />
        <Tab.Screen
          name="add"
          component={AddAnimal}
          options={{
            tabBarButton: () => (
              <ButtomCustom onPress={handlePresentModal}>
                <IconAntDesign name="plus" size={32} color={theme.colors.white} />
              </ButtomCustom>
            ),
          }}
        />
        <Tab.Screen
          name="information"
          component={Information}
          options={{
            tabBarIcon: ({ focused }) => (
              <IconIonicons
                name={focused ? 'information-circle' : 'information-circle-outline'}
                size={24}
                style={{ paddingLeft: 16 }}
                color={focused ? theme.colors.primary : theme.colors.grey0}
              />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <IconOcticons
                name={focused ? 'person-fill' : 'person'}
                size={20}
                color={focused ? theme.colors.primary : theme.colors.grey0}
              />
            ),
          }}
        />
        <Tab.Screen
          name="addAnimal"
          component={AddAnimal}
          options={{
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name="addHostFamily"
          component={AddHostFamily}
          options={{
            tabBarButton: () => null,
          }}
        />
      </Tab.Navigator>
      <BottomSheetAdd bottomSheetModalRef={bottomSheetModalRef} />
    </>
  )
}

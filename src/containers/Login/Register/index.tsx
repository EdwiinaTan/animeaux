import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View } from 'react-native'
import { HeaderComponent } from 'src/components/Header'
import { LoginRouteParams } from '../Router/type'

export const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LoginRouteParams>>()

  return (
    <View>
      <HeaderComponent onClickGoBack={() => navigation.goBack()} title="Création de compte" />
    </View>
  )
}

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CardAnimal } from 'src/components/Card/Animal'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { HostFamilyRouteParams } from '../Router/type'

export const AnimalHosted: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()
  const route = useRoute<RouteProp<HostFamilyRouteParams>>()
  const {
    params: { animalId },
  } = route as { params: { animalId: string[] } }
  return (
    <Layout>
      <HeaderComponent onClickGoBack={() => navigation.goBack()} title="Animaux hébergés" />
      {animalId && <CardAnimal listItem={animalId} />}
    </Layout>
  )
}

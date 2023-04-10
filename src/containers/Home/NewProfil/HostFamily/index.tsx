import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'

export const AddHostFamily = () => {
  const navigation = useNavigation()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Ajouter une famille d’accueil" />
      <Text>ADD HOST FAMILY</Text>
    </Layout>
  )
}

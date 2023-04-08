import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'

export const AddAnimal = () => {
  const navigation = useNavigation()

  const onClickGoBack = () => {
    return navigation.goBack()
  }
  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Ajouter un animal" />
      <Text>ADD ANIMAL</Text>
    </Layout>
  )
}

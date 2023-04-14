import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { useAirtableAnimal } from 'src/hooks/Animal'

export const AddHostFamily = () => {
  const navigation = useNavigation()
  const { dataTest } = useAirtableAnimal()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Ajouter une famille d’accueil" />
      <Text>ADD HOST FAMILY</Text>
      <FlatList
        data={dataTest}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </Layout>
  )
}

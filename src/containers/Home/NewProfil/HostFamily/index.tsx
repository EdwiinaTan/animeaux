import { useNavigation } from '@react-navigation/native'
import Airtable from 'airtable'
import { AIRTABLE_API_KEY, AIRTABLE_APP_ID } from 'config'
import { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { AnimalType } from 'src/types/Animal/Type'

export const AddHostFamily = () => {
  const navigation = useNavigation()
  const [data, setData] = useState<AnimalType[]>([])

  const onClickGoBack = () => {
    return navigation.goBack()
  }
  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_APP_ID)

  useEffect(() => {
    base('animal')
      .select()
      .eachPage(
        function page(records: any, fetchNextPage) {
          if (records) {
            records.forEach(function (record: any) {
              console.log('data', record.fields)
              setData((prevState) => [...prevState, record.fields])
            })
          }

          fetchNextPage()
        },
        function done(err) {
          if (err) {
            console.error(err)
            return
          }
        }
      )
  }, [])
  // console.log('data', data)

  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Ajouter une famille d’accueil" />
      <Text>ADD HOST FAMILY</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </Layout>
  )
}

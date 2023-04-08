import { useEffect, useState } from 'react'
import { FlatList, ListRenderItem, Text, View } from 'react-native'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SearchBarComponent } from 'src/components/SearchBar'
import { SkeletonCard } from 'src/components/SkeletonCard'
import { useGetHostFamilies } from 'src/hooks/HostFamily'
import { HostFamilyClient } from 'src/types/HostFamily/Type'
import { FetchStatus } from 'src/types/Status'
import { uppercaseWord } from 'src/utils/Functions'
import CardContainer from './Card'

export const HostFamily = (): React.ReactElement => {
  const [search, setSearch] = useState<string>()
  const [filtered, setFiltered] = useState<HostFamilyClient[]>()
  const { statusHostFamilies, hostFamiliesData } = useGetHostFamilies()

  useEffect(() => {
    if (search && search.length > 0) {
      setFiltered(
        hostFamiliesData.filter((hostFamily: HostFamilyClient) => searchHostFamily(hostFamily))
      )
    } else {
      setFiltered(hostFamiliesData)
    }
  }, [search, hostFamiliesData])

  const searchHostFamily = (hostFamily: HostFamilyClient) => {
    return hostFamily.fields.firstname.indexOf(uppercaseWord(search)) >= 0
  }

  const renderAnimal: ListRenderItem<HostFamilyClient> = ({ item }) => {
    return <CardContainer hostFamily={item.fields} />
  }

  return (
    <Layout>
      <HeaderComponent title="Famille d’accueil" />
      <SearchBarComponent search={search} setSearch={setSearch} />
      {statusHostFamilies !== FetchStatus.LOADING && <Spacing size="16" />}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderAnimal}
        ListEmptyComponent={
          statusHostFamilies === FetchStatus.LOADING ? (
            <View>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </View>
          ) : search ? (
            <Text>Aucune famille d’accueil trouvé</Text>
          ) : (
            <Text>Aucune famille d’accueil pour le moment</Text>
          )
        }
      />
    </Layout>
  )
}

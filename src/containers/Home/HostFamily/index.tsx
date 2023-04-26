import { NoFamilyFoundSvg } from 'assets/svg/noFamilyFound'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, ListRenderItem, RefreshControl, View } from 'react-native'
import { getHostFamilies } from 'src/client/HostFamily'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SearchBarComponent } from 'src/components/SearchBar'
import { SkeletonCard } from 'src/components/SkeletonCard'
import { Body1 } from 'src/components/Typo'
import { useGetHostFamilies } from 'src/hooks/HostFamily'
import { HostFamilyClient } from 'src/types/HostFamily/Type'
import { FetchStatus } from 'src/types/Status'
import { uppercaseWord, waitTimeOut } from 'src/utils/Functions'
import CardContainer from './Card'

export const HostFamily = (): React.ReactElement => {
  const [search, setSearch] = useState<string>()
  const [filtered, setFiltered] = useState<HostFamilyClient[]>()
  const { statusHostFamilies, hostFamiliesData } = useGetHostFamilies()
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (search && search.length > 0) {
      setFiltered(
        hostFamiliesData.filter((hostFamily: HostFamilyClient) => searchHostFamily(hostFamily))
      )
    } else {
      setFiltered(hostFamiliesData)
    }
  }, [search, hostFamiliesData])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const value = await getHostFamilies()
      await waitTimeOut(1000)
      setFiltered(value)
    } catch (error) {
      console.error(error)
    } finally {
      setIsRefreshing(false)
    }
  }, [getHostFamilies])

  const searchHostFamily = (hostFamily: HostFamilyClient) => {
    return (
      hostFamily.fields.firstName.indexOf(uppercaseWord(search)) >= 0 ||
      hostFamily.fields.lastName.indexOf(uppercaseWord(search)) >= 0
    )
  }

  const renderAnimal: ListRenderItem<HostFamilyClient> = ({ item }) => {
    return <CardContainer hostFamily={item.fields} />
  }

  const renderEmptySearchAnimal = () => {
    if (search) {
      return 'trouvé'
    } else {
      return 'pour le moment'
    }
  }

  return (
    <Layout>
      <HeaderComponent title="Famille d’accueil" />
      <SearchBarComponent search={search} setSearch={setSearch} />
      {statusHostFamilies === FetchStatus.LOADING ? (
        <View>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      ) : (
        <>
          <Spacing size="8" />
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={renderAnimal}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
            ListEmptyComponent={
              <View style={{ alignItems: 'center' }}>
                <Body1>Aucune famille d'accueil {renderEmptySearchAnimal()}</Body1>
                <NoFamilyFoundSvg />
              </View>
            }
          />
        </>
      )}
    </Layout>
  )
}

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, ListRenderItem, RefreshControl } from 'react-native'
import { getUsers } from 'src/client/User'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Body1 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetUsers } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import { UserClient } from 'src/types/User/Type'
import { waitTimeOut } from 'src/utils/Functions'
import CardContainer from '../Card'
import { ProfileRouteParams } from '../Router/type'

export const UsersScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileRouteParams>>()
  const listRef = useRef(null)
  const { statusUsers, usersData } = useGetUsers()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filtered, setFiltered] = useState<UserClient[]>(usersData)

  if (statusUsers === FetchStatus.LOADING) {
    return <ActivityIndicator size="large" color={theme.colors.blue} />
  }

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const value = await getUsers()
      await waitTimeOut(1000)
      setFiltered(value)
    } catch (error) {
      console.error(error)
    } finally {
      setIsRefreshing(false)
    }
  }, [getUsers])

  const renderAnimal: ListRenderItem<UserClient> = ({ item }) => {
    return <CardContainer userId={item.fields.id} />
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={() => navigation.goBack()} title="Liste des utilisateurs" />
      <FlatList
        style={{ height: '100%' }}
        ref={listRef}
        data={filtered}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        keyExtractor={(item) => item.id}
        renderItem={renderAnimal}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        ListEmptyComponent={<Body1 textAlign="center">Aucun pour le moment</Body1>}
      />
    </Layout>
  )
}

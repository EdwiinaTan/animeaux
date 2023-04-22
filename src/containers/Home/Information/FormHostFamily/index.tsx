import { useCallback, useRef, useState } from 'react'
import { FlatList, ListRenderItem, RefreshControl, View } from 'react-native'
import { getFormInscriptions } from 'src/client/FormInscription'
import { SkeletonCard } from 'src/components/SkeletonCard'
import { Body1 } from 'src/components/Typo'
import { FormInscriptionClient } from 'src/types/FormInscription/Type'
import { FetchStatus } from 'src/types/Status'
import { waitTimeOut } from 'src/utils/Functions'
import CardContainer from './Card'
import { InfoFormProps } from './Type'

export const InfoFormHostFamily: React.FC<InfoFormProps> = ({ data, status }) => {
  const listRef = useRef(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [result, setResult] = useState<FormInscriptionClient[]>(data)

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    getFormInscriptions().then((value: FormInscriptionClient[]) =>
      waitTimeOut(1000).then(() => {
        setIsRefreshing(false)
        setResult(value)
      })
    )
  }, [])

  const renderFormHostFamily: ListRenderItem<FormInscriptionClient> = ({ item }) => {
    return <CardContainer formHostFamily={item.fields} />
  }

  return (
    <>
      {status === FetchStatus.LOADING ? (
        <View>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      ) : (
        <FlatList
          style={{ height: '100%' }}
          ref={listRef}
          data={result}
          keyExtractor={(item) => item.id}
          renderItem={renderFormHostFamily}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
          ListEmptyComponent={<Body1 textAlign="center">Aucune réponse pour le moment</Body1>}
        />
      )}
    </>
  )
}

import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, ListRenderItem, RefreshControl, View } from 'react-native'
import 'react-native-gesture-handler'
import { getAnimals } from 'src/client/Animal'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SearchBarComponent } from 'src/components/SearchBar'
import { SkeletonCard } from 'src/components/SkeletonCard'
import { Body1 } from 'src/components/Typo'
import { useGetAnimals } from 'src/hooks/Animal'
import { AnimalTypeEnum } from 'src/types/Animal/enum'
import { AnimalClient } from 'src/types/Animal/Type'
import { FetchStatus } from 'src/types/Status'
import { uppercaseWord, waitTimeOut } from 'src/utils/Functions'
import CardContainer from './Card'
import { FilterAnimal } from './Filter'

export const Animal = (): React.ReactElement => {
  const [search, setSearch] = useState<string>()
  const [isActive, setIsActive] = useState<AnimalTypeEnum>(AnimalTypeEnum.ALL)
  const listRef = useRef(null)
  const navigation = useNavigation()
  const { statusAnimal, animalData } = useGetAnimals() //useEffect
  const [filtered, setFiltered] = useState<AnimalClient[]>(animalData)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    refacto()
  }, [search, animalData, isActive, statusAnimal])

  useEffect(() => {
    navigation.addListener('focus', () => {
      listRef.current?.scrollToOffset({ offset: 0, animated: false })
    })
  }, [navigation])

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    getAnimals().then((value: AnimalClient[]) =>
      waitTimeOut(1000).then(() => {
        setFiltered(value)
        setIsRefreshing(false)
      })
    )
  }, [])

  const refacto = (): void => {
    // ça marche mais à refacto lol
    if (search && search.length > 0) {
      if (isActive === AnimalTypeEnum.ALL) {
        setFiltered(
          animalData.filter(
            (animalSearch: AnimalClient) =>
              animalSearch.fields.name.indexOf(uppercaseWord(search)) >= 0
          )
        )
      } else {
        const all = animalData.filter(
          (animalSearch: AnimalClient) => animalSearch.fields.species === isActive
        )
        setFiltered(
          all.filter(
            (animalSearch: AnimalClient) =>
              animalSearch.fields.name.indexOf(uppercaseWord(search)) >= 0
          )
        )
      }
    } else {
      if (isActive === AnimalTypeEnum.ALL) {
        setFiltered(animalData)
      } else {
        setFiltered(
          animalData.filter(
            (animalSearch: AnimalClient) => animalSearch.fields.species === isActive
          )
        )
      }
    }
  }

  // const filterSearchAnimal = () => {
  //   if (search && search.length > 0) {
  //     setFiltered(
  //       animal.filter(
  //         (animalSearch: AnimalClient) =>
  //           animalSearch.fields.name.indexOf(uppercaseWord(search)) >= 0
  //       )
  //     )
  //   } else {
  //     setFiltered(animal)
  //   }
  // }

  // const filterTypeAnimal = () => {
  //   if (isActive === AnimalTypeEnum.ALL) {
  //     setFiltered(animal)
  //   } else {
  //     setFiltered(
  //       animal.filter((animalSearch: AnimalClient) => animalSearch.fields.species === isActive)
  //     )
  //   }
  // }

  const renderAnimal: ListRenderItem<AnimalClient> = ({ item }) => {
    return <CardContainer animal={item.fields} />
  }

  const renderSearchNotFound = () => {
    if (isActive === AnimalTypeEnum.ALL) {
      return 'animal'
    }
    return isActive
  }

  // faire icons + text => aucun animal / chien trouvé
  return (
    <View>
      <Layout>
        <HeaderComponent title="Animal" />
        <SearchBarComponent search={search} setSearch={setSearch} />
        <Spacing size="8" />
        {statusAnimal === FetchStatus.LOADING ? (
          <View>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </View>
        ) : (
          <>
            <FilterAnimal setIsActive={setIsActive} isActive={isActive} />
            <FlatList
              style={{ height: '100%' }}
              ref={listRef}
              data={filtered}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              keyExtractor={(item) => item.id}
              renderItem={renderAnimal}
              refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
              }
              ListEmptyComponent={
                search ? (
                  <Body1 textAlign="center">{`Aucun ${renderSearchNotFound()} trouvé`}</Body1>
                ) : (
                  <Body1 textAlign="center">Aucun {isActive} pour le moment</Body1>
                )
              }
            />
          </>
        )}
      </Layout>
    </View>
  )
}

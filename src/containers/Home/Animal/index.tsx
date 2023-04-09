import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, ListRenderItem, Text, View } from 'react-native'
import 'react-native-gesture-handler'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SearchBarComponent } from 'src/components/SearchBar'
import { SkeletonCard } from 'src/components/SkeletonCard'
import { useGetAnimals } from 'src/hooks/Animal'
import { AnimalTypeEnum } from 'src/types/Animal/enum'
import { AnimalClient } from 'src/types/Animal/Type'
import { FetchStatus } from 'src/types/Status'
import { uppercaseWord } from 'src/utils/Functions'
import CardContainer from './Card'
import { FilterAnimal } from './Filter'

export const Animal = (): React.ReactElement => {
  const [search, setSearch] = useState<string>()
  const [isActive, setIsActive] = useState<AnimalTypeEnum>(AnimalTypeEnum.ALL)
  const bottomSheetModalRef = useRef(null)
  const navigation = useNavigation()
  const snapPoints = ['30%']
  const { status, animal } = useGetAnimals() //useEffect
  const [filtered, setFiltered] = useState<AnimalClient[]>(animal)
  const scrollViewRef = useRef(null)

  useEffect(() => {
    refacto()
  }, [search, animal, isActive, status])

  const handleScrollTo = (y) => {
    scrollViewRef.current.scrollTo({ y, animated: true })
  }

  const refacto = () => {
    // ça marche mais à refacto lol
    if (search && search.length > 0) {
      if (isActive === AnimalTypeEnum.ALL) {
        setFiltered(
          animal.filter(
            (animalSearch: AnimalClient) =>
              animalSearch.fields.name.indexOf(uppercaseWord(search)) >= 0
          )
        )
      } else {
        const all = animal.filter(
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
        setFiltered(animal)
      } else {
        setFiltered(
          animal.filter((animalSearch: AnimalClient) => animalSearch.fields.species === isActive)
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

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  )

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present()
  }

  const renderAnimal: ListRenderItem<AnimalClient> = ({ item }) => {
    return <CardContainer animal={item.fields} />
  }

  const listRef = useRef(null)

  useEffect(() => {
    navigation.addListener('focus', () => {
      listRef.current?.scrollToOffset({ offset: 0, animated: false })
    })
  }, [navigation])

  // faire icons + text => aucun animal / chien trouvé
  return (
    <View>
      <Layout>
        <HeaderComponent title="Animal" toggleOverlay={handlePresentModal} />
        <SearchBarComponent search={search} setSearch={setSearch} />
        <Spacing size="8" />
        {status !== FetchStatus.LOADING && (
          <FilterAnimal setIsActive={setIsActive} isActive={isActive} />
        )}
        <FlatList
          style={{ height: '100%' }}
          ref={listRef}
          data={filtered}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          keyExtractor={(item) => item.id}
          renderItem={renderAnimal}
          ListEmptyComponent={
            status === FetchStatus.LOADING ? (
              <View>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </View>
            ) : search ? (
              <View>
                <Text style={{ textAlign: 'center' }}>Aucun {isActive} trouvé</Text>
              </View>
            ) : (
              <Text style={{ textAlign: 'center' }}>Aucun {isActive} pour le moment</Text>
            )
          }
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
        >
          <View>
            <Text>Hellloooooooo</Text>
            <Text>Hellloooooooo</Text>
            <Text>Hellloooooooo</Text>
            <Text>Hellloooooooo</Text>
            <Text>Hellloooooooo</Text>
            <Text>Hellloooooooo</Text>
            <Text>Hellloooooooo</Text>
            <Text>Hellloooooooo</Text>
            <Text>Hellloooooooo</Text>
            <Text>Hellloooooooo</Text>
            <Text>Hellloooooooo</Text>
            <Text>Hellloooooooo</Text>
          </View>
        </BottomSheetModal>
      </Layout>
    </View>
  )
}

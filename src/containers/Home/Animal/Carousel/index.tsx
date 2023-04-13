import { useRef, useState } from 'react'
import { ActivityIndicator, Animated, StyleSheet, useWindowDimensions, View } from 'react-native'
import { Image } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { theme } from 'src/constant/Theme'
import { AnimalType } from 'src/types/Animal/Type'
import { Carousel, ContainerPagination, PaginationText } from './Styled'

interface CarouselAnimalProps {
  animal: AnimalType
}

export const CarouselAnimal: React.FC<CarouselAnimalProps> = ({ animal }) => {
  const { width } = useWindowDimensions()
  const newWidth = width - 32
  const scrollX = useRef(new Animated.Value(0)).current
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
  const [currentIndex, setCurrentIndex] = useState(0)
  const slidesRef = useRef(null)

  const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  return (
    <Carousel>
      <FlatList
        data={animal.pictures}
        renderItem={({ item }) => (
          <View style={[style.container, { width: newWidth }]}>
            <Image
              source={{ uri: item.url }}
              style={{
                width: newWidth,
                height: 250,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                resizeMode: 'contain',
              }}
              containerStyle={{
                backgroundColor: theme.colors.grey1,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        )}
        keyExtractor={(item) => `carousel_${item.id}`}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
      <ContainerPagination>
        <PaginationText>
          {currentIndex + 1}/{animal.pictures.length}
        </PaginationText>
      </ContainerPagination>
    </Carousel>
  )
}

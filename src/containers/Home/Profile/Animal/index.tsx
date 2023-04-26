import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Card } from 'src/components/Card'
import { ChipComponent } from 'src/components/Chip'
import { ImageProfile } from 'src/components/ImageProfile'
import { Body1 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetAnimalById } from 'src/hooks/Animal'
import { AnimalType } from 'src/types/Animal/Type'
import { animalAge, renderAnimalGender } from 'src/utils/Functions'
import { ProfileRouteParams } from '../Router/type'
import { AnimalGender, Container, ContainerChip, ContainerImage, Description } from './Styled'
import { InChargeProps } from './Type'

export const UserAnimalInCharge: React.FC<InChargeProps> = ({ listItem }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileRouteParams>>()

  if (!listItem || listItem.length === 0) {
    return (
      <View>
        <ActivityIndicator size="large" color={theme.colors.blue} />
      </View>
    )
  }

  const renderField = (key: string, value: string) => {
    if (value) {
      return (
        <Body1>
          {key} : {value}
        </Body1>
      )
    }
  }

  const onClick = (animal: AnimalType) => {
    navigation.navigate('animalInformation', { animalDetails: animal })
  }

  const renderListAnimals = () => {
    return listItem.map((item: string, key: number) => {
      if (item) {
        const animal = useGetAnimalById(item).animalData
        if (animal) {
          return (
            <TouchableOpacity onPress={() => onClick(animal)} activeOpacity={1} key={key}>
              <Card id={`cardHostFamily_${animal.id}`} key={key}>
                <Container key={key}>
                  <ContainerImage>
                    <ImageProfile picture={animal.pictures} />
                  </ContainerImage>
                  <Description>
                    <AnimalGender>
                      <Body1 paddingRight={4}>{animal.name}</Body1>
                      {renderAnimalGender(animal)}
                    </AnimalGender>
                    <Body1>{animalAge(animal.birthday)}</Body1>
                    <Body1>Race : {animal.race}</Body1>
                    <Body1>{renderField('Icad', animal.icad)}</Body1>
                    <ContainerChip>
                      <ChipComponent value={animal.status} />
                    </ContainerChip>
                  </Description>
                </Container>
              </Card>
            </TouchableOpacity>
          )
        }
      }
    })
  }

  return <>{renderListAnimals()}</>
}

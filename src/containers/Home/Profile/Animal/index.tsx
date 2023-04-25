import { ActivityIndicator, View } from 'react-native'
import { Card } from 'src/components/Card'
import { ChipComponent } from 'src/components/Chip'
import { ImageProfile } from 'src/components/ImageProfile'
import { Body1 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetAnimalById } from 'src/hooks/Animal'
import { animalAge } from 'src/utils/Functions'
import { renderAnimalGender } from '../../Animal/Utils'
import { AnimalGender, Container, ContainerChip, ContainerImage, Description } from './Styled'
import { InChargeProps } from './Type'

export const UserAnimalInCharge: React.FC<InChargeProps> = ({ listItem }) => {
  if (!listItem || listItem.length === 0) {
    return (
      <View>
        <ActivityIndicator size="large" color={theme.colors.blue} />
      </View>
    )
  }

  const renderListAnimals = () => {
    return listItem.map((item: string, key: number) => {
      if (item) {
        const animal = useGetAnimalById(item).animalData
        if (animal) {
          return (
            <Card id={`cardHostFamily_${animal.id}`} key={key}>
              <Container>
                <ContainerImage>
                  <ImageProfile picture={animal.pictures} />
                </ContainerImage>
                <Description>
                  <AnimalGender>
                    <Body1 paddingRight={4}>{animal.name}</Body1>
                    {renderAnimalGender(animal)}
                  </AnimalGender>
                  <Body1>{animalAge(animal.birthday)}</Body1>
                  <Body1>{animal.race}</Body1>
                  <ContainerChip>
                    <ChipComponent value={animal.status} />
                  </ContainerChip>
                </Description>
              </Container>
            </Card>
          )
        }
      }
    })
  }

  return <>{renderListAnimals()}</>
}

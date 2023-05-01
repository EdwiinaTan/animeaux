import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Card } from 'src/components/Card'
import { ChipComponent } from 'src/components/Chip'
import { ImageProfile } from 'src/components/ImageProfile'
import { Body1 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { ProfileRouteParams } from 'src/containers/Home/Profile/Router/type'
import { useGetAnimals } from 'src/hooks/Animal'
import { AnimalType } from 'src/types/Animal/Type'
import { FetchStatus } from 'src/types/Status'
import { animalAge, renderAnimalGender } from 'src/utils/Functions'
import { AnimalGender, Container, ContainerChip, ContainerImage, Description } from './Styled'
import { InChargeProps } from './Type'

export const CardAnimal: React.FC<InChargeProps> = ({ listItem }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileRouteParams>>()
  const { animalData, statusAnimal } = useGetAnimals()

  if (statusAnimal === FetchStatus.LOADING) {
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
    const animalFiltered = animalData.filter((data) => listItem.includes(data.fields.id))
    return animalFiltered.map(({ fields }, key) => {
      return (
        <TouchableOpacity onPress={() => onClick(fields)} activeOpacity={1} key={key}>
          <Card id={`cardHostFamily_${fields.id}`} key={key}>
            <Container key={key}>
              <ContainerImage>
                <ImageProfile picture={fields.pictures} />
              </ContainerImage>
              <Description>
                <AnimalGender>
                  <Body1 paddingRight={4}>{fields.name}</Body1>
                  {renderAnimalGender(fields)}
                </AnimalGender>
                <Body1>{animalAge(fields.birthday)}</Body1>
                <Body1>Race : {fields.race}</Body1>
                <Body1>{renderField('Couleur', fields.color)}</Body1>
                <ContainerChip>
                  <ChipComponent value={fields.status} />
                </ContainerChip>
              </Description>
            </Container>
          </Card>
        </TouchableOpacity>
      )
    })
  }

  return <>{renderListAnimals()}</>
}

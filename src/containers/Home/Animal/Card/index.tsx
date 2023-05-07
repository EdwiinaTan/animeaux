import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Skeleton } from '@rneui/themed'
import { TouchableOpacity } from 'react-native'
import { Card } from 'src/components/Card'
import { ChipComponent } from 'src/components/Chip'
import { ImageProfile } from 'src/components/ImageProfile'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1 } from 'src/components/Typo'
import { useGetUserById } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import { animalAge, renderAnimalGender } from 'src/utils/Functions'
import { AnimalRouteParams } from '../Router/type'
import { AnimalGender, Container, ContainerChip, ContainerImage, Description } from './Styled'
import { CardComponentProps } from './Type'

const CardContainer: React.FC<CardComponentProps> = ({ animal }) => {
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const { statusUser, userData } = useGetUserById(animal.userId)

  const onClick = () => {
    navigation.navigate('animalInformation', { animalDetails: animal })
  }

  const renderUser = () => {
    if (statusUser === FetchStatus.LOADING) {
      return (
        <>
          <Skeleton animation="pulse" width={200} height={12} />
          <Spacing size="4" />
        </>
      )
    } else if (!userData) {
      return <Body1>Bénévole : aucun</Body1>
    } else {
      return (
        <Body1>
          Bénévole : {userData?.firstName} {userData?.lastName}
        </Body1>
      )
    }
  }

  return (
    <TouchableOpacity onPress={onClick} activeOpacity={1}>
      <Card id={`cardAnimal_${animal.id}`}>
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
            <Body1>Race : {animal.race}</Body1>
            {renderUser()}
            <ContainerChip>
              <ChipComponent value={animal.status} />
            </ContainerChip>
          </Description>
        </Container>
      </Card>
    </TouchableOpacity>
  )
}

export default CardContainer

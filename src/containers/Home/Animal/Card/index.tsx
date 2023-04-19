import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Skeleton } from '@rneui/themed'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
import { Card } from 'src/components/Card'
import { ChipComponent } from 'src/components/Chip'
import { Body1 } from 'src/components/Typo'
import { useGetHostFamilyById } from 'src/hooks/HostFamily'
import { useGetUserById } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import { animalAge } from 'src/utils/Functions'
import { AnimalRouteParams } from '../Router/type'
import { renderAnimalGender, renderHostFamily } from '../Utils'
import { AnimalGender, Container, ContainerChip, ContainerImage, Description } from './Styled'
import { CardComponentProps } from './Type'

const CardContainer: React.FC<CardComponentProps> = ({ animal }) => {
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const { statusUser, userData } = useGetUserById(animal.userId)
  const { statusHostFamily, hostFamilyData } = useGetHostFamilyById(animal.hostFamilyId)

  const onClick = () => {
    navigation.navigate('animalInformation', { animalDetails: animal })
  }

  return (
    <TouchableOpacity onPress={onClick} activeOpacity={1}>
      <Card id={`cardAnimal_${animal.id}`}>
        <Container>
          <ContainerImage>
            <Image
              source={{ uri: animal?.photos[0]?.url }}
              style={{ width: 100, height: 100, borderRadius: 8 }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Image resizeMode="cover" source={{ uri: animal?.photos[0]?.url }} />
          </ContainerImage>
          <Description>
            <AnimalGender>
              <Body1 paddingRight={4}>{animal.name}</Body1>
              {renderAnimalGender(animal)}
            </AnimalGender>
            <Body1>{animalAge(animal.dateNaissance)}</Body1>
            {statusUser === FetchStatus.LOADING ? (
              <Skeleton animation="pulse" width={200} height={12} />
            ) : (
              <Body1>
                Responsable : {userData?.firstname} {userData?.lastname}
              </Body1>
            )}
            {renderHostFamily(statusHostFamily, hostFamilyData)}
            {/* {statusHostFamily === FetchStatus.FAILED && <Text>failed</Text>}
            {statusHostFamily === FetchStatus.LOADING ? (
              <Skeleton animation="pulse" width={200} height={12} />
            ) : (
              hostFamilyData &&
              hostFamilyData?.firstname && (
                <Text>
                  FA : {hostFamilyData?.firstname} {hostFamilyData?.lastname}
                </Text>
              )
            )} */}
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

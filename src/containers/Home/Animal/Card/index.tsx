import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Skeleton } from '@rneui/themed'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { Card, Image, Text } from 'react-native-elements'
import { ChipComponent } from 'src/components/Chip'
import { Spacing } from 'src/components/Layout/Spacing'
import { useGetHostFamilyById } from 'src/hooks/HostFamily'
import { useGetUserById } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
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
      <Card
        containerStyle={{
          borderRadius: 8,
          borderColor: 'transparent',
          position: 'relative',
          marginTop: 1,
          marginBottom: 16,
        }}
      >
        <Container>
          <ContainerImage>
            <Image
              source={{ uri: animal?.pictures[0]?.url }}
              style={{ width: 100, height: 100, borderRadius: 8 }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Image resizeMode="cover" source={{ uri: animal?.pictures[0]?.url }} />
          </ContainerImage>
          <Description>
            <AnimalGender>
              <Text style={{ paddingRight: 4 }}>{animal.name}</Text>
              {renderAnimalGender(animal)}
            </AnimalGender>
            <Spacing size="4" />
            <Text>2 ans</Text>
            <Spacing size="4" />
            {statusUser === FetchStatus.LOADING ? (
              <Skeleton animation="pulse" width={200} height={12} />
            ) : (
              <Text>
                Responsable : {userData?.firstname} {userData?.lastname}
              </Text>
            )}
            <Spacing size="4" />
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

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { Card } from 'src/components/Card'
import { ImageProfile } from 'src/components/ImageProfile'
import { Body1 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetUserById } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import { ProfileRouteParams } from '../Router/type'
import { Container, ContainerImage, Description } from './Styled'
import { CardComponentProps } from './Type'

const CardContainer: React.FC<CardComponentProps> = ({ userId }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileRouteParams>>()
  const { statusUser, userData } = useGetUserById(userId)

  const onClick = () => {
    navigation.navigate('userInfo', { userId: userData.id })
  }

  if (statusUser === FetchStatus.LOADING) {
    return <ActivityIndicator size="large" color={theme.colors.blue} />
  }

  return (
    <TouchableOpacity onPress={onClick} activeOpacity={1}>
      <Card id={`cardAnimal_${userData.id}`}>
        <Container>
          <ContainerImage>
            <ImageProfile picture={userData.picture} />
          </ContainerImage>
          <Description>
            <Body1 paddingRight={4}>
              {userData.firstName} {userData.lastName}
            </Body1>
            <Body1>{userData.email}</Body1>
            <Body1>{userData.phone}</Body1>
          </Description>
        </Container>
      </Card>
    </TouchableOpacity>
  )
}

export default CardContainer

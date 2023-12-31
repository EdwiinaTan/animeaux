import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native'
import { Card } from 'src/components/Card'
import { ImageProfile } from 'src/components/ImageProfile'
import { Layout } from 'src/components/Layout'
import { SkeletonCard } from 'src/components/SkeletonCard'
import { Body1 } from 'src/components/Typo'
import { useGetHostFamilyById } from 'src/hooks/HostFamily'
import { FetchStatus } from 'src/types/Status'
import { formatPhoneNumber } from 'src/utils/Functions'
import { HostFamilyRouteParams } from '../Router/type'
import { Container, ContainerImage, Description } from './Styled'
import { CardComponentProps } from './Type'

const CardContainer: React.FC<CardComponentProps> = ({ hostFamily }) => {
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()
  const { statusHostFamily } = useGetHostFamilyById(hostFamily.id)

  const onClick = () => {
    navigation.navigate('hostFamilyInformation', { hostFamilyId: hostFamily.id })
  }

  if (statusHostFamily === FetchStatus.LOADING) {
    return (
      <Layout>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </Layout>
    )
  }

  return (
    <TouchableOpacity onPress={onClick} activeOpacity={1}>
      <Card id={`cardHostFamily_${hostFamily.id}`}>
        <Container>
          <ContainerImage>
            <ImageProfile picture={hostFamily.picture} />
          </ContainerImage>
          <Description>
            <Body1>
              {hostFamily.firstName} {hostFamily.lastName}
            </Body1>
            <Body1>{formatPhoneNumber(hostFamily.phone)}</Body1>
            <Body1>{hostFamily.email}</Body1>
            <Body1>{hostFamily.city}</Body1>
          </Description>
        </Container>
      </Card>
    </TouchableOpacity>
  )
}

export default CardContainer

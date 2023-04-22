import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NoPictureSvg } from 'assets/svg/noPicture'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native-elements'
import { Card } from 'src/components/Card'
import { Layout } from 'src/components/Layout'
import { SkeletonCard } from 'src/components/SkeletonCard'
import { Body1 } from 'src/components/Typo'
import { useGetHostFamilyById } from 'src/hooks/HostFamily'
import { FetchStatus } from 'src/types/Status'
import { formatPhoneNumber } from 'src/utils/Functions'
import { HostFamilyRouteParams } from '../Router/type'
import { Container, ContainerImage } from './Styled'
import { CardComponentProps } from './Type'

const CardContainer: React.FC<CardComponentProps> = ({ hostFamily }) => {
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()
  const { statusHostFamily } = useGetHostFamilyById(hostFamily.id)

  const onClick = () => {
    navigation.navigate('hostFamilyInformation', { hostFamilyDetails: hostFamily })
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
          {hostFamily.picture ? (
            <ContainerImage>
              <Image
                source={{ uri: hostFamily.picture[0].url }}
                style={{ width: 100, height: 100, borderRadius: 8 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </ContainerImage>
          ) : (
            <View style={{ paddingRight: 16 }}>
              <NoPictureSvg />
            </View>
          )}
          <View style={{ flexDirection: 'column' }}>
            <Body1>
              {hostFamily.firstName} {hostFamily.lastName}
            </Body1>
            <Body1>{formatPhoneNumber(hostFamily.phone)}</Body1>
            <Body1>{hostFamily.email}</Body1>
            <Body1>{hostFamily.city}</Body1>
          </View>
        </Container>
      </Card>
    </TouchableOpacity>
  )
}

export default CardContainer

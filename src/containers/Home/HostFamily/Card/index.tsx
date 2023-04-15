import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Card, Image, Text } from 'react-native-elements'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SkeletonCard } from 'src/components/SkeletonCard'
import { useGetHostFamilyById } from 'src/hooks/HostFamily'
import { FetchStatus } from 'src/types/Status'
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
          {hostFamily.picture && hostFamily.picture[0] && (
            <ContainerImage>
              <Image
                source={{ uri: hostFamily.picture[0].url }}
                style={{ width: 100, height: 100, borderRadius: 8 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </ContainerImage>
          )}
          <View style={{ flexDirection: 'column' }}>
            <Text>
              {hostFamily.firstname} {hostFamily.lastname}
            </Text>
            <Spacing size="4" />
            <Text>{hostFamily.phone}</Text>
            <Spacing size="4" />
            <Text>{hostFamily.email}</Text>
            <Spacing size="4" />
            <Text>{hostFamily.city}</Text>
          </View>
        </Container>
      </Card>
    </TouchableOpacity>
  )
}

export default CardContainer

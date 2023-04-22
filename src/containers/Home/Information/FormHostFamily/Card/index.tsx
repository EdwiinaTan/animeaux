import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native-elements'
import { Card } from 'src/components/Card'
import { Layout } from 'src/components/Layout'
import { SkeletonCard } from 'src/components/SkeletonCard'
import { Body1 } from 'src/components/Typo'
import { useGetFormInscriptionById } from 'src/hooks/FormInscription'
import { FetchStatus } from 'src/types/Status'
import { formatPhoneNumber } from 'src/utils/Functions'
import { Container, ContainerImage } from './Styled'
import { CardComponentProps } from './Type'

const CardContainer: React.FC<CardComponentProps> = ({ formHostFamily }) => {
  const { statusFormInscription } = useGetFormInscriptionById(formHostFamily.id)
  // const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()

  const onClick = () => {
    // navigation.navigate('hostFamilyInformation', { hostFamilyDetails: hostFamily })
  }

  if (statusFormInscription === FetchStatus.LOADING) {
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
      <Card id={`cardFormHostFamily_${formHostFamily.id}`}>
        <Container>
          {formHostFamily.picture && formHostFamily.picture[0] && (
            <ContainerImage>
              <Image
                source={{ uri: formHostFamily.picture[0].url }}
                style={{ width: 100, height: 100, borderRadius: 8 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </ContainerImage>
          )}
          <View style={{ flexDirection: 'column' }}>
            <Body1>
              {formHostFamily.firstName} {formHostFamily.lastName}
            </Body1>
            <Body1>{formatPhoneNumber(formHostFamily.phoneOne)}</Body1>
            <Body1>{formHostFamily.email}</Body1>
            <Body1>{formHostFamily.city}</Body1>
          </View>
        </Container>
      </Card>
    </TouchableOpacity>
  )
}

export default CardContainer

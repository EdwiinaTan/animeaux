import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TouchableOpacity, View } from 'react-native'
import { Card } from 'src/components/Card'
import { ImageProfile } from 'src/components/ImageProfile'
import { Layout } from 'src/components/Layout'
import { SkeletonCard } from 'src/components/SkeletonCard'
import { Body1 } from 'src/components/Typo'
import { useGetFormInscriptionById } from 'src/hooks/FormInscription'
import { FetchStatus } from 'src/types/Status'
import { formatPhoneNumber } from 'src/utils/Functions'
import { InformationRouteParams } from '../../Router/type'
import { Container, ContainerImage } from './Styled'
import { CardComponentProps } from './Type'

const CardContainer: React.FC<CardComponentProps> = ({ formHostFamily }) => {
  const { statusFormInscription } = useGetFormInscriptionById(formHostFamily.id)
  const navigation = useNavigation<NativeStackNavigationProp<InformationRouteParams>>()

  const onClick = () => {
    navigation.navigate('informationForm', { informationId: formHostFamily.id })
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
          <ContainerImage>
            <ImageProfile picture={formHostFamily.picture} />
          </ContainerImage>
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

import { RouteProp, useRoute } from '@react-navigation/native'
import { ActivityIndicator, View } from 'react-native'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1, Title3 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetFormInscriptionById } from 'src/hooks/FormInscription'
import { FetchStatus } from 'src/types/Status'
import { InformationRouteParams } from '../../Router/type'
import { Card, Container } from './Styled'

export const ResultForm = () => {
  const route = useRoute<RouteProp<InformationRouteParams>>()
  const {
    params: { informationId },
  } = route as { params: { informationId: string } }
  const { statusFormInscription, formInscriptionData } = useGetFormInscriptionById(informationId)

  if (statusFormInscription === FetchStatus.LOADING) {
    return (
      <View>
        <ActivityIndicator size="large" color={theme.colors.blue} />
      </View>
    )
  }

  return (
    <Layout>
      <HeaderComponent title="Résultat du formulaire" />
      <Container>
        <Card>
          <Spacing size="8" />
          <Title3>IDENTITÉ DE L'ANIMAL À ACCUEILLIR</Title3>
          <Spacing size="8" />
          <Body1>Nom : {formInscriptionData.animalName}</Body1>
          <Body1>Prénom : {formInscriptionData.animalRace}</Body1>
          <Body1>Sexe : {formInscriptionData.animalGender}</Body1>
        </Card>
        <Spacing size="16" />
        <Card>
          <Title3>IDENTITÉ DE LA FAMILLE</Title3>
          <Spacing size="8" />
          <Body1>Nom : {formInscriptionData.firstName}</Body1>
          <Body1>Prénom : {formInscriptionData.lastName}</Body1>
          <Body1>Pseudo facebook : {formInscriptionData.facebookUsername}</Body1>
        </Card>
      </Container>
    </Layout>
  )
}

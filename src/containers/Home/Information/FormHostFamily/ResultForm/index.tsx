import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ActivityIndicator, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1, Title3 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetFormInscriptionById } from 'src/hooks/FormInscription'
import { FetchStatus } from 'src/types/Status'
import { formatPhoneNumber } from 'src/utils/Functions'
import { InformationRouteParams } from '../../Router/type'
import { Card, Container, TextLine } from './Styled'

export const ResultForm = () => {
  const route = useRoute<RouteProp<InformationRouteParams>>()
  const {
    params: { informationId },
  } = route as { params: { informationId: string } }
  const { statusFormInscription, formInscriptionData } = useGetFormInscriptionById(informationId)
  const navigation = useNavigation<NativeStackNavigationProp<InformationRouteParams>>()

  if (statusFormInscription === FetchStatus.LOADING) {
    return (
      <View>
        <ActivityIndicator size="large" color={theme.colors.blue} />
      </View>
    )
  }

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const renderOptionalField = (value: string) => {
    if (value) {
      return value
    }
    return 'Non renseigné'
  }

  const renderDivider = () => {
    return (
      <>
        <Spacing size="8" />
        <Divider />
        <Spacing size="8" />
      </>
    )
  }

  return (
    <Layout>
      <HeaderComponent
        title={`Formulaire de ${formInscriptionData.firstName} ${formInscriptionData.lastName}`}
        onClickGoBack={onClickGoBack}
      />
      <Container>
        <Card>
          <Spacing size="8" />
          <Title3>IDENTITÉ DE L'ANIMAL À ACCUEILLIR</Title3>
          <Spacing size="8" />
          <Body1>Nom : {renderOptionalField(formInscriptionData.animalName)}</Body1>
          <Body1>Prénom : {renderOptionalField(formInscriptionData.animalRace)}</Body1>
          <Body1>Sexe : {renderOptionalField(formInscriptionData.animalGender)}</Body1>
        </Card>
        <Spacing size="16" />
        <Card>
          <Title3>IDENTITÉ DE LA FAMILLE D’ACCUEIL</Title3>
          <Spacing size="8" />
          <Body1>
            <TextLine>Nom</TextLine> : {formInscriptionData.firstName}
          </Body1>
          <Body1>
            <TextLine>Prénom</TextLine> : {formInscriptionData.lastName}
          </Body1>
          <Body1>
            <TextLine>Pseudo facebook</TextLine> : {formInscriptionData.facebookUsername}
          </Body1>
          <Body1>
            <TextLine>Adresse</TextLine> : {formInscriptionData.address}
          </Body1>
          <Body1>
            <TextLine>Code postal</TextLine> : {formInscriptionData.postalCode}
          </Body1>
          <Body1>
            <TextLine>Ville</TextLine> : {formInscriptionData.city}
          </Body1>
          <Body1>
            <TextLine>Téléphone 1</TextLine> : {formatPhoneNumber(formInscriptionData.phoneOne)}
          </Body1>
          <Body1>
            <TextLine>Téléphone 2</TextLine> :{' '}
            {formInscriptionData.phoneTwo &&
              renderOptionalField(formatPhoneNumber(formInscriptionData.phoneTwo))}
          </Body1>
          <Body1>
            <TextLine>Adresse mail</TextLine> : {formInscriptionData.email}
          </Body1>
          <Body1>
            <TextLine>Situation professionnelle</TextLine> : {formInscriptionData.proSituation}
          </Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Nombre d'heures d'absence journalières</TextLine> :
          </Body1>
          <Body1>{formInscriptionData.absenceHours}h</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>
              En cas de télétravail ou chômage partiel, avez-vous pensé à votre reprise à temps
              complet, post-COVID ?
            </TextLine>
          </Body1>
          <Body1>{renderOptionalField(formInscriptionData.remoteWork)}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Êtes-vous véhiculé ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.vehicle}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>
              Êtes-vous bien en mesure de vous déplacer pour assurer les rdv vétérinaire ?
            </TextLine>
          </Body1>
          <Body1>{formInscriptionData.rescheduleVeterinary}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Vous êtes ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.residenceType}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Vous habitez ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.residence}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Quelle est la superficie de votre habitat ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.surfaceArea}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Disposez-vous d'une pièce pour l'isolement en quarantaine ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.quarantineRoom}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Avez-vous un jardin ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.garden}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Avez-vous un balcon ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.balcony}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Quelles sont les pièces autorisées aux animaux ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.authorizedRooms}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Avez-vous des enfants ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.hasChild}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Avez-vous des animaux ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.hasAnimal}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Avez-vous des connaissances dans l'éducation ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.educationalKnowledge}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Toute la famille est-elle d'accord pour accueillir un animal ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.agreeableFamily}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>
              Que prévoyez-vous de donner comme nourriture à l'animal si elle n'est pas fournie par
              l'association ?
            </TextLine>
          </Body1>
          <Body1>{formInscriptionData.food}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Où l'animal dormira-t-il la nuit ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.animalSleeping}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Où l'animal restera-t-il durant votre absence ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.animalSleeping}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>Où l'animal restera-t-il durant vos vacances ?</TextLine>
          </Body1>
          <Body1>{formInscriptionData.animalHoliday}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>
              Avez-vous (ou quelqu'un de votre entourage) des allergies à un animal ?
            </TextLine>
          </Body1>
          <Body1>{formInscriptionData.allergy}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>
              Si l'animal a des problèmes de comportements, que feriez-vous pour y remédier ?
            </TextLine>
          </Body1>
          <Body1>{formInscriptionData.animalBehaviorProblem}</Body1>
          {renderDivider()}
          <Body1>
            <TextLine>
              En cas de problématique de comportement, un encadrement avec un éducateur pourra être
              préconisé. Etes-vous en mesure de vous libérer du temps pour aider l'animal ?
            </TextLine>
          </Body1>
          <Body1>{formInscriptionData.freeUpTime}</Body1>
        </Card>
        <Spacing size="16" />
        <Card>
          <Spacing size="8" />
          <Title3>IDENTITE DE VOTRE VÉTÉRINAIRE</Title3>
          <Spacing size="8" />
          <Body1>Nom : {renderOptionalField(formInscriptionData.vetName)}</Body1>
          <Body1>Adresse : {renderOptionalField(formInscriptionData.vetAddress)}</Body1>
          <Body1>Numéro de téléphone : {renderOptionalField(formInscriptionData.vetPhone)}</Body1>
          <Body1>Adresse mail : {renderOptionalField(formInscriptionData.vetEmail)}</Body1>
        </Card>
        <Spacing size="16" />
      </Container>
    </Layout>
  )
}

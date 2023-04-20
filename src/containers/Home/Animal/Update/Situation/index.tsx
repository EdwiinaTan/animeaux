import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import { updateAnimalById } from 'src/client/Animal'
import { AnimalSituation } from 'src/components/Animal/Situation'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { useGetHostFamilyById } from 'src/hooks/HostFamily'
import { useGetUserById } from 'src/hooks/User'
import { AnimalAgreement } from 'src/types/Animal/enum'
import { AnimalType } from 'src/types/Animal/Type'
import { FetchStatus } from 'src/types/Status'
import { AnimalRouteParams } from '../../Router/type'
import { Card, Container, Keyboard } from './Styled'
import { AnimalRequest } from './Type'

export const UpdateAnimalSituation: React.FC = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const { statusHostFamily, hostFamilyData } = useGetHostFamilyById(animalDetails.hostFamilyId)
  const { statusUser, userData } = useGetUserById(animalDetails.userId)

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues = {
    hostFamilyId: animalDetails.hostFamilyId,
    status: animalDetails.status,
    lieuEnCharge: animalDetails.lieuEnCharge,
    raison: animalDetails.raison,
    ententeEnfant: animalDetails.ententeEnfant,
    ententeChat: animalDetails.ententeChat,
    ententeChien: animalDetails.ententeChien,
    userId: animalDetails.userId,
    descriptionPrivee: animalDetails.descriptionPrivee,
    sterilise: animalDetails.sterilise ? AnimalAgreement.YES : AnimalAgreement.NO,
  }

  const renderDefaultOptionHostFamily = () => {
    if (statusHostFamily === FetchStatus.SUCCESS) {
      return {
        key: hostFamilyData.id,
        value: `${hostFamilyData.prenom} ${hostFamilyData.nom}`,
      }
    }
  }

  const renderDefaultOptionUser = () => {
    if (statusUser === FetchStatus.SUCCESS) {
      return {
        key: userData.id,
        value: `${userData.prenom} ${userData.nom}`,
      }
    }
  }
  const renderDefaultOptionPlace = () => {
    return {
      key: animalDetails.lieuEnCharge,
      value: animalDetails.lieuEnCharge,
    }
  }

  const updateAnimal = (values: AnimalRequest) => {
    updateAnimalById(animalDetails.id, values)
    navigation.goBack()
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier la situation de ${animalDetails.name}`}
      />
      <Keyboard behavior="position" enabled>
        <Container>
          <Card>
            <Formik
              initialValues={initialValues}
              // validationSchema={validationSchema}
              onSubmit={(values) => updateAnimal(values)}
            >
              {({ handleChange, values, handleSubmit, handleBlur }) => (
                <AnimalSituation
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  renderDefaultOptionHostFamily={renderDefaultOptionHostFamily}
                  renderDefaultOptionUser={renderDefaultOptionUser}
                  renderDefaultOptionPlace={renderDefaultOptionPlace}
                />
              )}
            </Formik>
          </Card>
          <Spacing size="24" />
        </Container>
      </Keyboard>
    </Layout>
  )
}

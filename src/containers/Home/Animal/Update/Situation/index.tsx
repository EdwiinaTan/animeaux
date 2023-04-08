import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { AnimalAgreement, AnimalReasonEnum, AnimalStatusEnum } from 'src/types/Animal/enum'
import { AnimalType } from 'src/types/Animal/Type'
import { AnimalRouteParams } from '../../Router/type'
import { CheckBoxComponent } from '../Checkbox'
import { Card, Container } from './Styled'

export const UpdateAnimalSituation = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()

  // const validationSchema = Yup.object().shape({
  //   name: Yup.string()
  //     .min(1, 'Le nom doit contenir au moins 1 caractère')
  //     .required('Le nom est requis'),
  //   alias: Yup.string().min(1, 'L’alias doit contenir au moins 1 caractère'),
  // })

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues = {
    status: animalDetails.status,
    reason: animalDetails.reason,
    dogAgreement: animalDetails.dogAgreement,
    catAgreement: animalDetails.catAgreement,
    kidAgreement: animalDetails.childAgreement,
  }

  const statusArray = [
    { label: 'Adopté', value: AnimalStatusEnum.ADOPTE },
    { label: 'Décédé', value: AnimalStatusEnum.DECEDE },
    { label: 'Libre', value: AnimalStatusEnum.LIBRE },
    { label: 'Adoptable', value: AnimalStatusEnum.ADOPTABLE },
    { label: 'Réservable', value: AnimalStatusEnum.RESERVABLE },
    { label: 'Indisponible', value: AnimalStatusEnum.INDISPONIBLE },
    { label: 'Réservé', value: AnimalStatusEnum.RESERVE },
  ]

  const reasonArray = [
    { label: 'Décès du propriétaire', value: AnimalReasonEnum.DECES_DU_PROPRIETAIRE },
    { label: 'Abandon', value: AnimalReasonEnum.ABANDON },
    { label: 'Maltraitance', value: AnimalReasonEnum.MALTRAITANCE },
    { label: 'Errance', value: AnimalReasonEnum.ERRANCE },
    { label: 'Autre raison', value: AnimalReasonEnum.AUTRE_RAISON },
  ]

  const agreementArray = [
    { label: 'Oui', value: AnimalAgreement.YES },
    { label: 'Non', value: AnimalAgreement.NO },
    { label: 'Inconnu', value: AnimalAgreement.UNKNOW },
  ]

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier la situation de ${animalDetails.name}`}
      />
      <Container>
        <Card>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={(values) => console.log('submit: ', values)}
          >
            {({ handleChange, values, handleSubmit, handleBlur }) => (
              <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text>Prise en charge</Text>
                <Spacing size="8" />
                {statusArray.map((status, key) => (
                  <CheckBoxComponent
                    key={`status_${key}`}
                    animal={status}
                    values={values.status}
                    handleChange={() => handleChange('status')(status.value)}
                  />
                ))}
                <Spacing size="8" />
                <Text>Status</Text>
                <Spacing size="8" />
                {statusArray.map((status, key) => (
                  <CheckBoxComponent
                    key={`status_${key}`}
                    animal={status}
                    values={values.status}
                    handleChange={() => handleChange('status')(status.value)}
                  />
                ))}
                <Spacing size="8" />
                <Text>Raison</Text>
                <Spacing size="8" />
                {reasonArray.map((reason, key) => (
                  <CheckBoxComponent
                    key={`reason_${key}`}
                    animal={reason}
                    values={values.reason}
                    handleChange={() => handleChange('reason')(reason.value)}
                  />
                ))}
                <Spacing size="8" />
                <Text>Entente</Text>
                <Spacing size="8" />
                <Text>Chien</Text>
                <Spacing size="8" />
                {agreementArray.map((dogAgreement, key) => (
                  <CheckBoxComponent
                    key={`dogAgreement_${key}`}
                    animal={dogAgreement}
                    values={values.dogAgreement}
                    handleChange={() => handleChange('dogAgreement')(dogAgreement.value)}
                  />
                ))}
                <Text>Chat</Text>
                <Spacing size="8" />
                {agreementArray.map((catAgreement, key) => (
                  <CheckBoxComponent
                    key={`catAgreement_${key}`}
                    animal={catAgreement}
                    values={values.catAgreement}
                    handleChange={() => handleChange('catAgreement')(catAgreement.value)}
                  />
                ))}
                <Text>Enfant</Text>
                <Spacing size="8" />
                {agreementArray.map((kidAgreement, key) => (
                  <CheckBoxComponent
                    key={`catAgreement_${key}`}
                    animal={kidAgreement}
                    values={values.kidAgreement}
                    handleChange={() => handleChange('kidAgreement')(kidAgreement.value)}
                  />
                ))}
                <Spacing size="8" />
                <Button title="Submit" onPress={() => handleSubmit()} />
              </View>
            )}
          </Formik>
        </Card>
        <Spacing size="24" />
      </Container>
    </Layout>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.lightColors.white,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.lightColors.greyOutline,
  },
})

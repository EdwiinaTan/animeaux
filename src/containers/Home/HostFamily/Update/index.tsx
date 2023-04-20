import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import { StyleSheet } from 'react-native'
import { updateHostFamilyById } from 'src/client/HostFamily'
import { HeaderComponent } from 'src/components/Header'
import { HostFamilyProfile } from 'src/components/HostFamily'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { HostFamilyRouteParams } from 'src/containers/Home/HostFamily/Router/type'
import { HostFamilyType } from 'src/types/HostFamily/Type'
import { startsWithVowel } from 'src/utils/Functions'
import { Card, Container, Keyboard } from './Styled'

export const HostFamilyUpdate = () => {
  const route = useRoute<RouteProp<HostFamilyRouteParams>>()
  const {
    params: { hostFamilyDetails },
  } = route as { params: { hostFamilyDetails: HostFamilyType } }
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues = {
    nom: hostFamilyDetails.nom,
    prenom: hostFamilyDetails.prenom,
    email: hostFamilyDetails.email,
    phone: hostFamilyDetails.phone,
    postalCode: hostFamilyDetails.postalCode,
    city: hostFamilyDetails.city,
    address: hostFamilyDetails.address,
    animalId: hostFamilyDetails.animalId,
    criteria: hostFamilyDetails.criteria,
    description: hostFamilyDetails.description,
    onBreak: hostFamilyDetails.onBreak,
  }

  const updateAnimal = (values) => {
    console.log('value', values)
    updateHostFamilyById(hostFamilyDetails.id, values)
    navigation.goBack()
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier le ${startsWithVowel(hostFamilyDetails.prenom)}`}
      />
      <Keyboard behavior="position" enabled>
        <Container>
          <Card>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                updateAnimal(values)
              }}
            >
              {({ handleChange, values, handleSubmit, handleBlur }) => (
                <HostFamilyProfile
                  values={values}
                  handleSubmit={handleSubmit}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
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

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.greyOutline,
  },
})

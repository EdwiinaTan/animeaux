import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik, FormikValues } from 'formik'
import { StyleSheet } from 'react-native'
import { updateHostFamilyById } from 'src/client/HostFamily'
import { HostFamilyProfile } from 'src/components/Form/HostFamily'
import { validationHostFamily } from 'src/components/Form/HostFamily/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { CardStyle, ContainerStyle } from 'src/constant/Theme/Styled'
import { HostFamilyRouteParams } from 'src/containers/Home/HostFamily/Router/type'
import { HostFamilyType } from 'src/types/HostFamily/Type'
import { startsWithVowel } from 'src/utils/Functions'
import { Keyboard } from './Styled'

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
    firstName: hostFamilyDetails.firstName,
    lastName: hostFamilyDetails.lastName,
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

  const updateHostFamily = (values) => {
    console.log('value', values)
    updateHostFamilyById(hostFamilyDetails.id, values)
    navigation.goBack()
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier le ${startsWithVowel(hostFamilyDetails.firstName)}`}
      />
      <Keyboard behavior="padding" enabled>
        <ContainerStyle>
          <CardStyle>
            <Formik
              validationSchema={validationHostFamily}
              initialValues={initialValues}
              onSubmit={(values) => {
                updateHostFamily(values)
              }}
            >
              {(field: FormikValues) => <HostFamilyProfile field={field} />}
            </Formik>
          </CardStyle>
          <Spacing size="24" />
        </ContainerStyle>
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

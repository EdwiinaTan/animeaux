import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, FormikValues } from 'formik'
import { updateHostFamilyByIdTest } from 'src/client/HostFamily'
import { HostFamilyProfile } from 'src/components/Form/HostFamily'
import { validationHostFamily } from 'src/components/Form/HostFamily/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { CardStyle, ContainerStyle } from 'src/constant/Theme/Styled'
import { HostFamilyRouteParams } from 'src/containers/Home/HostFamily/Router/type'
import { HostFamilyType } from 'src/types/HostFamily/Type'
import { startsWithVowel } from 'src/utils/Functions'
import { Keyboard } from './Styled'
import { HostFamilyRequest } from './Type'

export const HostFamilyUpdate = () => {
  const route = useRoute<RouteProp<HostFamilyRouteParams>>()
  const {
    params: { hostFamilyDetails },
  } = route as { params: { hostFamilyDetails: HostFamilyType } }
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()
  const queryClient = useQueryClient()

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

  const mutation = useMutation({
    mutationFn: updateHostFamilyByIdTest,
    onSuccess: (data) => {
      navigation.navigate('hostFamilyScreen')
      queryClient.setQueryData(
        ['hostFamily', { id: hostFamilyDetails.id }],
        (oldData: HostFamilyRequest) =>
          oldData
            ? {
                ...oldData,
                data,
              }
            : oldData
      )
      queryClient.invalidateQueries({ queryKey: ['hostFamilies'] })
    },
    onError: (err) => {
      console.log('err', err)
    },
  })

  const updateHostFamily = async (values: HostFamilyRequest) => {
    if (values) {
      const data = {
        ...values,
      }
      mutation.mutateAsync({ id: hostFamilyDetails.id, values: data })
    }
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

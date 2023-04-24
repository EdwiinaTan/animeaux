import { useNavigation } from '@react-navigation/native'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { Formik, FormikValues } from 'formik'
import { postHostFamily } from 'src/client/HostFamily'
import { HostFamilyProfile } from 'src/components/Form/HostFamily'
import { validationHostFamily } from 'src/components/Form/HostFamily/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { CardStyle, ContainerStyle } from 'src/constant/Theme/Styled'
import { Keyboard } from './Styled'

export const AddHostFamily = () => {
  const navigation = useNavigation()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postalCode: '',
    city: '',
    address: '',
    animalId: '',
    criteria: '',
    description: '',
    onBreak: '',
  }

  const queryClient = new QueryClient()

  const mutation = useMutation({
    mutationFn: postHostFamily,
    onSuccess: () => {
      onClickGoBack()
      queryClient.invalidateQueries(['hostFamilies'])
    },
    onError: (err) => {
      console.log('err', err)
    },
  })

  const addHostFamily = (values) => {
    mutation.mutate({ ...values, animalId: [values.animalId] })
    // postHostFamily(values)
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Ajouter une famille d’accueil" />
      <Keyboard behavior="padding" enabled>
        <ContainerStyle>
          <CardStyle>
            <Formik
              validationSchema={validationHostFamily}
              initialValues={initialValues}
              onSubmit={(values) => {
                addHostFamily(values)
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

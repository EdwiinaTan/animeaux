import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { Formik } from 'formik'
import { postHostFamily } from 'src/client/HostFamily'
import { HostFamilyProfile } from 'src/components/Form/HostFamily'
import { validationHostFamily } from 'src/components/Form/HostFamily/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { HostFamilyRouteParams } from '../../HostFamily/Router/type'
import { Card, Container, Keyboard } from './Styled'

export const AddHostFamily = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()
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
      navigation.navigate('hostFamilyScreen')
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
        <Container>
          <Card>
            <Formik
              validationSchema={validationHostFamily}
              initialValues={initialValues}
              onSubmit={(values) => {
                addHostFamily(values)
              }}
            >
              {({ handleChange, values, handleSubmit, handleBlur, errors, touched }) => (
                <HostFamilyProfile
                  values={values}
                  handleSubmit={handleSubmit}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
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

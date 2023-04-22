import { useNavigation } from '@react-navigation/native'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { Formik } from 'formik'
import { StyleSheet } from 'react-native'
import { postHostFamily } from 'src/client/HostFamily'
import { HostFamilyProfile } from 'src/components/Form/HostFamily'
import { validationHostFamily } from 'src/components/Form/HostFamily/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { Card, Container, Keyboard } from './Styled'

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
      navigation.goBack()
      queryClient.invalidateQueries(['hostFamilies'])
    },
  })

  const addHostFamily = (values) => {
    try {
      if (values) {
        console.log('value', values)
        mutation.mutate(values)
        // postHostFamily(values)
      }
    } catch (err) {
      console.log('err', err)
    }
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

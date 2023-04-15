import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import { useRef } from 'react'
import { StyleSheet } from 'react-native'
import { updateAnimalByIdTest } from 'src/client/Animal'
import { AnimalProfile } from 'src/components/Animal/Profile'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { AnimalType } from 'src/types/Animal/Type'
import { startsWithVowel } from 'src/utils/Functions'
import * as Yup from 'yup'
import { AnimalRouteParams } from '../../Router/type'
import { Card, Container, Keyboard } from './Styled'
import { AnimalRequest } from './Type'

export const AnimalUpdate = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const nameRef = useRef(animalDetails.name)

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Le nom doit contenir au moins 1 caractère')
      .required('Le nom est requis'),
    alias: Yup.string().min(1, 'L’alias doit contenir au moins 1 caractère'),
  })

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues: AnimalRequest = {
    species: animalDetails.species,
    gender: animalDetails.gender,
    name: animalDetails.name,
    alias: animalDetails.alias,
    icadNumber: animalDetails.icadNumber,
    race: animalDetails.race,
    color: animalDetails.color,
    publicDescription: animalDetails.publicDescription,
  }

  const updateAnimal = (values: AnimalRequest) => {
    updateAnimalByIdTest(animalDetails.id, values)
    navigation.goBack()
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier le ${startsWithVowel(animalDetails.name)}`}
      />
      <Keyboard behavior="position" enabled>
        <Container>
          <Card>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values: AnimalRequest) => {
                updateAnimal(values)
              }}
            >
              {({ handleChange, values, handleSubmit, handleBlur }) => (
                <AnimalProfile
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  animalDetails={animalDetails}
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

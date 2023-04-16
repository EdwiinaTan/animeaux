import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import { updateAnimalByIdTest } from 'src/client/Animal'
import { AnimalProfile } from 'src/components/Animal/Profile'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
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
  // const nameRef = useRef(animalDetails.name)

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Le nom doit être requis')
      .min(2, 'Le nom doit contenir au moins 2 caractères'),
    alias: Yup.string().min(2, 'L’alias doit contenir au moins 2 caractères'),
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
              {({ handleChange, values, handleSubmit, handleBlur, errors, touched }) => (
                <AnimalProfile
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  animalDetails={animalDetails}
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

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { updateAnimalByIdTest } from 'src/client/Animal'
import { AnimalProfile } from 'src/components/Animal/Profile'
import { validationAnimalProfile } from 'src/components/Animal/Profile/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { AnimalType } from 'src/types/Animal/Type'
import { startsWithVowel } from 'src/utils/Functions'
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

  const onClickGoBack = () => {
    return navigation.goBack()
  }
  // const queryClient = useQueryClient()

  const initialValues: AnimalRequest = {
    espece: animalDetails.espece,
    genre: animalDetails.genre,
    name: animalDetails.name,
    alias: animalDetails.alias,
    icad: animalDetails.icad,
    race: animalDetails.race,
    couleur: animalDetails.couleur,
    descriptionPublique: animalDetails.descriptionPublique,
  }

  // const updateAnimalMutation = useMutation({
  //   mutationFn: updateAnimalByIdTest,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['animalsUpdate'] })
  //   },
  // })

  const updateAnimal = (values: AnimalRequest) => {
    updateAnimalByIdTest(animalDetails.id, values)
    // updateAnimalMutation.mutate({ ...values })
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
              validationSchema={validationAnimalProfile}
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

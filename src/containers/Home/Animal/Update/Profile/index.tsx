import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { updateAnimalByIdTest } from 'src/client/Animal'
import { AnimalProfile } from 'src/components/Form/Animal/Profile'
import { validationAnimalProfile } from 'src/components/Form/Animal/Profile/Utils'
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
  // const queryClient = useQueryClient()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues: AnimalRequest = {
    species: animalDetails.species,
    gender: animalDetails.gender,
    name: animalDetails.name,
    alias: animalDetails.alias,
    birthday: animalDetails.birthday,
    icad: animalDetails.icad,
    race: animalDetails.race,
    color: animalDetails.color,
    publicDescription: animalDetails.publicDescription,
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
    navigation.navigate('animalScreen')
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier le ${startsWithVowel(animalDetails.name)}`}
      />
      <Keyboard behavior="padding" enabled>
        <Container>
          <Card>
            <Formik
              initialValues={initialValues}
              validationSchema={validationAnimalProfile}
              onSubmit={(values: AnimalRequest) => {
                updateAnimal(values)
              }}
            >
              {({
                handleChange,
                values,
                handleSubmit,
                handleBlur,
                errors,
                touched,
                setFieldValue,
              }) => (
                <AnimalProfile
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  animalDetails={animalDetails}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
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

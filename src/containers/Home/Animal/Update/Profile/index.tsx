import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { QueryClient, useMutation } from '@tanstack/react-query'
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
import { Container, Keyboard } from './Styled'
import { AnimalRequest } from './Type'

export const AnimalUpdate = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const queryClient = new QueryClient()
  // const nameRef = useRef(animalDetails.name)

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

  const mutation = useMutation({
    mutationFn: updateAnimalByIdTest,
    onSuccess: (data) => {
      // https://tanstack.com/query/v4/docs/react/guides/updates-from-mutation-responses
      // queryClient.setQueryData(['animal', { id: animalDetails.id }], data)
      queryClient.setQueryData(['animals', { id: animalDetails.id }], (oldData: AnimalRequest) =>
        oldData
          ? {
              ...oldData,
              data,
            }
          : oldData
      )
    },
    onError: (err) => {
      console.log('err', err)
    },
  })

  const updateAnimal = async (values: AnimalRequest) => {
    // updateAnimalByIdTest(animalDetails.id, values) - ancien
    const data = {
      id: animalDetails.id,
      values,
    }
    try {
      if (values) {
        mutation.mutateAsync(data)
      }
    } catch (err) {
      console.log('err', err)
    } finally {
      navigation.navigate('animalScreen')
    }
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier le ${startsWithVowel(animalDetails.name)}`}
      />
      <Keyboard behavior="padding" enabled>
        <Container>
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
          <Spacing size="24" />
        </Container>
      </Keyboard>
    </Layout>
  )
}

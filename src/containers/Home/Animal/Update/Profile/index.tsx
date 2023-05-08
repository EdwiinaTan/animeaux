import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, FormikValues } from 'formik'
import { Platform } from 'react-native'
import { updateAnimalById } from 'src/client/Animal'
import { AnimalProfile } from 'src/components/Form/Animal/Profile'
import { validationAnimalProfile } from 'src/components/Form/Animal/Profile/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { ContainerStyle, KeyboardStyle } from 'src/constant/Theme/Styled'
import { AnimalType } from 'src/types/Animal/Type'
import { startsWithVowel } from 'src/utils/Functions'
import { AnimalRouteParams } from '../../Router/type'
import { AnimalProfileRequest } from './Type'

export const UpdateAnimalProfile = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const queryClient = useQueryClient()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues: AnimalProfileRequest = {
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
    mutationFn: updateAnimalById,
    onSuccess: (data) => {
      navigation.navigate('animalInformation', { animalDetails: animalDetails })
      queryClient.setQueryData(
        ['animal', { id: animalDetails.id }],
        (oldData: AnimalProfileRequest) =>
          oldData
            ? {
                ...oldData,
                data,
              }
            : oldData
      )
      queryClient.invalidateQueries({ queryKey: ['animals'] })
      SnackbarToastComponent({
        title: 'La modification a bien été prise en compte',
      })
    },
    onError: (err) => {
      SnackbarToastComponent({
        type: 'error',
        title: 'Erreur',
      })
      console.log('err', err)
    },
  })

  const updateAnimal = async (values: AnimalProfileRequest) => {
    if (values) {
      mutation.mutateAsync({
        id: animalDetails.id,
        values,
      })
    }
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Éditer le ${startsWithVowel(animalDetails.name)}`}
      />
      <KeyboardStyle behavior={Platform.select({ android: undefined, ios: 'padding' })} enabled>
        <ContainerStyle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationAnimalProfile}
            onSubmit={(values: AnimalProfileRequest) => {
              updateAnimal(values)
            }}
          >
            {(field: FormikValues) => <AnimalProfile animalDetails={animalDetails} field={field} />}
          </Formik>
          <Spacing size="24" />
        </ContainerStyle>
      </KeyboardStyle>
    </Layout>
  )
}

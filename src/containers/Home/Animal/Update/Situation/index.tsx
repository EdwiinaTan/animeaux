import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, FormikValues } from 'formik'
import { Platform } from 'react-native'
import { updateAnimalById } from 'src/client/Animal'
import { AnimalSituation } from 'src/components/Form/Animal/Situation'
import { validationAnimalSituation } from 'src/components/Form/Animal/Situation/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { ContainerStyle, KeyboardStyle } from 'src/constant/Theme/Styled'
import { useGetHostFamilyById } from 'src/hooks/HostFamily'
import { useGetUserById } from 'src/hooks/User'
import { AnimalType } from 'src/types/Animal/Type'
import { FetchStatus } from 'src/types/Status'
import { AnimalRouteParams } from '../../Router/type'
import { AnimalSituationRequest } from './Type'

export const UpdateAnimalSituation = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const { statusHostFamily, hostFamilyData } = useGetHostFamilyById(animalDetails.hostFamilyId)
  const { statusUser, userData } = useGetUserById(animalDetails.userId)
  const queryClient = useQueryClient()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues = {
    hostFamilyId: animalDetails.hostFamilyId,
    status: animalDetails.status,
    placeAssigned: animalDetails.placeAssigned,
    dateAssigned: animalDetails.dateAssigned,
    reason: animalDetails.reason,
    childAgreement: animalDetails.childAgreement,
    catAgreement: animalDetails.catAgreement,
    dogAgreement: animalDetails.dogAgreement,
    userId: animalDetails.userId,
    privateDescription: animalDetails.privateDescription,
    isSterilized: animalDetails.isSterilized,
  }

  const renderDefaultOptionHostFamily = () => {
    if (statusHostFamily === FetchStatus.SUCCESS) {
      return {
        key: hostFamilyData.id,
        value: `${hostFamilyData.firstName} ${hostFamilyData.lastName}`,
      }
    }
  }

  const renderDefaultOptionUser = () => {
    if (statusUser === FetchStatus.SUCCESS) {
      return {
        key: userData.id,
        value: `${userData.firstName} ${userData.lastName}`,
      }
    }
  }
  const renderDefaultOptionPlace = () => {
    return {
      key: animalDetails.placeAssigned,
      value: animalDetails.placeAssigned,
    }
  }

  const mutation = useMutation({
    mutationFn: updateAnimalById,
    onSuccess: (data) => {
      navigation.navigate('animalInformation', { animalDetails: animalDetails })
      queryClient.setQueryData(
        ['animal', { id: animalDetails.id }],
        (oldData: AnimalSituationRequest) =>
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

  const updateAnimal = async (values: AnimalSituationRequest) => {
    let data
    if (values) {
      if (values.hostFamilyId) {
        data = {
          ...values,
          hostFamilyId: [values.hostFamilyId],
          userId: [values.userId],
        }
      } else {
        data = {
          ...values,
          userId: [values.userId],
        }
      }

      mutation.mutateAsync({ id: animalDetails.id, values: data })
    }
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Éditer la situation de ${animalDetails.name}`}
      />
      <KeyboardStyle behavior={Platform.select({ android: undefined, ios: 'padding' })} enabled>
        <ContainerStyle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationAnimalSituation}
            onSubmit={(values: AnimalSituationRequest) => updateAnimal(values)}
          >
            {(field: FormikValues) => (
              <AnimalSituation
                field={field}
                renderDefaultOptionHostFamily={renderDefaultOptionHostFamily}
                renderDefaultOptionUser={renderDefaultOptionUser}
                renderDefaultOptionPlace={renderDefaultOptionPlace}
              />
            )}
          </Formik>
          <Spacing size="24" />
        </ContainerStyle>
      </KeyboardStyle>
    </Layout>
  )
}

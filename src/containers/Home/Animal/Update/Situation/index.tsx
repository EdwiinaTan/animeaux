import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { Formik, FormikValues } from 'formik'
import { updateAnimalByIdTest } from 'src/client/Animal'
import { AnimalSituation } from 'src/components/Form/Animal/Situation'
import { validationAnimalSituation } from 'src/components/Form/Animal/Situation/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { ContainerStyle } from 'src/constant/Theme/Styled'
import { useGetHostFamilyById } from 'src/hooks/HostFamily'
import { useGetUserById } from 'src/hooks/User'
import { AnimalType } from 'src/types/Animal/Type'
import { FetchStatus } from 'src/types/Status'
import { AnimalRouteParams } from '../../Router/type'
import { Keyboard } from './Styled'
import { AnimalRequest } from './Type'

export const UpdateAnimalSituation: React.FC = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const { statusHostFamily, hostFamilyData } = useGetHostFamilyById(animalDetails.hostFamilyId)
  const { statusUser, userData } = useGetUserById(animalDetails.userId)
  const queryClient = new QueryClient()

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
    mutationFn: updateAnimalByIdTest,
    onSuccess: (data) => {
      navigation.navigate('animalScreen')
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
    // updateAnimalById(animalDetails.id, values)
    if (values) {
      const data = {
        ...values,
        userId: [values.userId],
        hostFamilyId: [values.hostFamilyId],
      }
      mutation.mutateAsync({ id: animalDetails.id, values: data })
    }
  }

  //utiliser (field) au lieu de tout passer en param comme ça lol
  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier la situation de ${animalDetails.name}`}
      />
      <Keyboard behavior="padding" enabled>
        <ContainerStyle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationAnimalSituation}
            onSubmit={(values) => updateAnimal(values)}
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
      </Keyboard>
    </Layout>
  )
}

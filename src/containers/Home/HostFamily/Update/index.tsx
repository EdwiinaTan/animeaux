import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, FormikValues } from 'formik'
import { useState } from 'react'
import { Platform, ScrollView } from 'react-native'
import { updateHostFamilyById } from 'src/client/HostFamily'
import { CardAnimal } from 'src/components/Card/Animal'
import { HostFamilyProfile } from 'src/components/Form/HostFamily'
import { validationHostFamily } from 'src/components/Form/HostFamily/Utils'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { Body1 } from 'src/components/Typo'
import { CardStyle, ContainerStyle, KeyboardStyle } from 'src/constant/Theme/Styled'
import { HostFamilyRouteParams } from 'src/containers/Home/HostFamily/Router/type'
import { HostFamilyRequest, HostFamilyType } from 'src/types/HostFamily/Type'
import { startsWithVowel } from 'src/utils/Functions'

export const HostFamilyUpdate = () => {
  const route = useRoute<RouteProp<HostFamilyRouteParams>>()
  const {
    params: { hostFamilyDetails },
  } = route as { params: { hostFamilyDetails: HostFamilyType } }
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()
  const queryClient = useQueryClient()
  const [selected, setSelected] = useState<string[]>([])
  const [selectedNotHosted, setSelectedNotHosted] = useState<string[]>([])

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues: HostFamilyRequest = {
    firstName: hostFamilyDetails.firstName,
    lastName: hostFamilyDetails.lastName,
    email: hostFamilyDetails.email,
    phone: hostFamilyDetails.phone,
    postalCode: hostFamilyDetails.postalCode,
    city: hostFamilyDetails.city,
    address: hostFamilyDetails.address,
    animalId: hostFamilyDetails.animalId,
    criteria: hostFamilyDetails.criteria,
    description: hostFamilyDetails.description,
    onBreak: hostFamilyDetails.onBreak,
  }

  const mutation = useMutation({
    mutationFn: updateHostFamilyById,
    onSuccess: (data) => {
      navigation.navigate('hostFamilyScreen')
      queryClient.setQueryData(
        ['hostFamily', { id: hostFamilyDetails.id }],
        (oldData: HostFamilyRequest) =>
          oldData
            ? {
                ...oldData,
                data,
              }
            : oldData
      )
      queryClient.invalidateQueries({ queryKey: ['hostFamilies'] })
      queryClient.invalidateQueries({ queryKey: ['hostFamily', hostFamilyDetails.id] })
      queryClient.invalidateQueries({ queryKey: ['getUserToken'] })
      SnackbarToastComponent({
        title: 'La modification a bien été prise en compte',
        subTitle: `FA édité : ${hostFamilyDetails.firstName} ${hostFamilyDetails.lastName}`,
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

  const updateHostFamily = async (values: HostFamilyRequest) => {
    let data: HostFamilyRequest
    if (selected.length > 0 && selectedNotHosted.length > 0) {
      selected.push(...values.animalId)
      let newAnimalArray = selected.filter((animal) => !selectedNotHosted.includes(animal))
      data = { ...values, animalId: newAnimalArray }
    } else {
      if (selected.length > 0 && selectedNotHosted.length === 0) {
        if (values.animalId && values.animalId.length > 0) {
          selected.push(...values.animalId)
        }
        data = { ...values, animalId: selected }
      } else if (selectedNotHosted.length > 0 && selected.length === 0) {
        let dataFiltered = values.animalId
        let filtered = dataFiltered.filter((animal) => !selectedNotHosted.includes(animal))
        data = { ...values, animalId: filtered }
      } else {
        data = { ...values }
      }
    }
    mutation.mutateAsync({ id: hostFamilyDetails.id, values: data })
  }

  const renderListAnimal = () => {
    if (
      hostFamilyDetails &&
      hostFamilyDetails.animalId &&
      hostFamilyDetails.animalId.length !== 0
    ) {
      return (
        <>
          <Spacing size="8" />
          <Body1 textAlign="center">
            Animaux hébergé{hostFamilyDetails.animalId.length > 1 ? 's' : ''} (
            {hostFamilyDetails.animalId.length})
          </Body1>
          <Spacing size="4" />
          <CardAnimal listItem={hostFamilyDetails.animalId} />
          <Spacing size="24" />
        </>
      )
    }
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier le ${startsWithVowel(hostFamilyDetails.firstName)}`}
      />
      <KeyboardStyle behavior={Platform.select({ android: undefined, ios: 'padding' })} enabled>
        <ScrollView>
          <ContainerStyle>
            <CardStyle>
              <Formik
                validationSchema={validationHostFamily}
                initialValues={initialValues}
                onSubmit={(values) => {
                  updateHostFamily(values)
                }}
              >
                {(field: FormikValues) => (
                  <HostFamilyProfile
                    field={field}
                    hostFamilyDetails={hostFamilyDetails}
                    setSelected={setSelected}
                    setSelectedNotHosted={setSelectedNotHosted}
                  />
                )}
              </Formik>
            </CardStyle>
            <Spacing size="16" />
          </ContainerStyle>
          {renderListAnimal()}
        </ScrollView>
      </KeyboardStyle>
    </Layout>
  )
}

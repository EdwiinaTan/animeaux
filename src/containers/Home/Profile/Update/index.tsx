import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, FormikValues } from 'formik'
import { useContext, useState } from 'react'
import { ActivityIndicator, Platform, ScrollView, View } from 'react-native'
import { updateUserById } from 'src/client/User'
import { CardAnimal } from 'src/components/Card/Animal'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { Body1 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { KeyboardStyle } from 'src/constant/Theme/Styled'
import { AuthContext } from 'src/containers/App/AuthContext'
import { useGetUserByToken } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import { ProfileRouteParams } from '../Router/type'
import { UserUpdateForm } from './Form'
import { Container } from './Styled'
import { UserRequest } from './Type'
import { validationUser } from './Utils'

export const UserUpdate = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileRouteParams>>()
  const { userToken } = useContext(AuthContext)
  const { statusTokenUser, userDataToken } = useGetUserByToken(userToken)
  const queryClient = useQueryClient()
  const [selected, setSelected] = useState<string[]>([])
  const [selectedNoCharge, setSelectedNoCharge] = useState<string[]>([])

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues: UserRequest = {
    firstName: userDataToken.firstName,
    lastName: userDataToken.lastName,
    email: userDataToken.email,
    phone: userDataToken.phone,
    animalId: userDataToken.animalId,
  }

  const mutation = useMutation({
    mutationFn: updateUserById,
    onSuccess: (data) => {
      navigation.navigate('profileScreen')
      queryClient.setQueryData(['user', { id: userDataToken.id }], data)
      queryClient.invalidateQueries({ queryKey: ['getUserToken'] })
      queryClient.invalidateQueries({ queryKey: ['user', userDataToken.id] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
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

  const userAuthUpdate = async (values: UserRequest) => {
    let data: UserRequest
    if (selected.length > 0 && selectedNoCharge.length > 0) {
      //add animal selected
      selected.push(...values.animalId)
      // filter remove animal by selectedNoCharge
      let newAnimalArray = selected.filter((animal) => !selectedNoCharge.includes(animal))
      data = { ...values, animalId: newAnimalArray }
    } else {
      if (selected.length > 0 && selectedNoCharge.length === 0) {
        //values animalId exist
        if (values.animalId && values.animalId.length > 0) {
          selected.push(...values.animalId)
        }
        // value animalId doesn't exist
        data = { ...values, animalId: selected }
      } else if (selectedNoCharge.length > 0 && selected.length === 0) {
        // create array filter
        let dataFiltered = values.animalId
        // remove it by filter selectedNoCharge
        let filtered = dataFiltered.filter((animal) => !selectedNoCharge.includes(animal))
        data = { ...values, animalId: filtered }
      }
      // no add & remove animal selected
      else {
        data = { ...values }
      }
    }
    mutation.mutateAsync({ id: userDataToken.id, values: data })
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Éditer mon profil" />
      {statusTokenUser === FetchStatus.LOADING ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.blue} />
        </View>
      ) : (
        <KeyboardStyle behavior={Platform.select({ android: undefined, ios: 'padding' })} enabled>
          <ScrollView>
            <Container>
              <Formik
                validationSchema={validationUser}
                initialValues={initialValues}
                onSubmit={(values) => {
                  userAuthUpdate(values)
                }}
              >
                {(field: FormikValues) => (
                  <UserUpdateForm
                    field={field}
                    userDataToken={userDataToken}
                    setSelected={setSelected}
                    setSelectedNoCharge={setSelectedNoCharge}
                  />
                )}
              </Formik>
              <Spacing size="16" />
            </Container>
            {userDataToken.animalId && userDataToken.animalId.length !== 0 && (
              <>
                <Body1 textAlign="center">
                  Anima{userDataToken.animalId.length > 1 ? 'ux' : 'l'} en charge (
                  {userDataToken.animalId.length})
                </Body1>
                <Spacing size="4" />
                <CardAnimal listItem={userDataToken.animalId} />
                <Spacing size="24" />
              </>
            )}
          </ScrollView>
        </KeyboardStyle>
      )}
    </Layout>
  )
}

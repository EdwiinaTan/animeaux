import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, FormikValues } from 'formik'
import { useContext, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { updateUserById } from 'src/client/User'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { theme } from 'src/constant/Theme'
import { ContainerStyle, Keyboard } from 'src/constant/Theme/Styled'
import { AuthContext } from 'src/containers/App/AuthContext'
import { useGetUserById } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import { ProfileRouteParams } from '../Router/type'
import { UserUpdateForm } from './Form'
import { UserRequest } from './Type'
import { validationUser } from './Utils'

export const UserUpdate = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileRouteParams>>()
  const queryClient = useQueryClient()
  const { userId } = useContext(AuthContext)
  const { statusUser, userData } = useGetUserById(userId)
  const [selected, setSelected] = useState<string[]>([])
  const [selectedNoCharge, setSelectedNoCharge] = useState<string[]>([])

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    animalId: userData.animalId,
  }

  const mutation = useMutation({
    mutationFn: updateUserById,
    onSuccess: (data) => {
      navigation.goBack()
      queryClient.setQueryData(['user', { id: userId }], (oldData: UserRequest) =>
        oldData
          ? {
              ...oldData,
              data,
            }
          : oldData
      )
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

  console.log('values', selected)

  const userAuthUpdate = async (values: UserRequest) => {
    let data: UserRequest
    console.log('values', values)
    if (selected.length > 0) {
      if (values.animalId) {
        selected.push(...values.animalId)
      } else {
        console.log('passe ici nan ?')
        data = { ...values, animalId: selected }
      }
      console.log('data1111', data)
    } else {
      data = { ...values }
    }
    if (selectedNoCharge.length > 0) {
      let dataFiltered = values.animalId
      let filtered = dataFiltered.filter((animal) => !selectedNoCharge.includes(animal))
      data = { ...values, animalId: filtered }
    } else {
      data = { ...values }
    }
    console.log('data', data)
    mutation.mutateAsync({ id: userId, values: data })
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Modifier mon compte" />
      {statusUser === FetchStatus.LOADING ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.blue} />
        </View>
      ) : (
        <Keyboard behavior="padding" enabled>
          <ContainerStyle>
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
                  setSelected={setSelected}
                  setSelectedNoCharge={setSelectedNoCharge}
                />
              )}
            </Formik>
            <Spacing size="24" />
          </ContainerStyle>
        </Keyboard>
      )}
    </Layout>
  )
}

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Field, Formik } from 'formik'
import { useContext } from 'react'
import { ActivityIndicator, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import { updateUserById } from 'src/client/User'
import { styles } from 'src/components/Form/Animal/Styled'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { Body2, Body3 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { CardStyle, ContainerStyle, Keyboard, TextRed } from 'src/constant/Theme/Styled'
import { AuthContext } from 'src/containers/App/AuthContext'
import { useGetUserById } from 'src/hooks/User'
import { FetchStatus } from 'src/types/Status'
import { ProfileRouteParams } from '../Router/type'

export const UserUpdate = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileRouteParams>>()
  const queryClient = useQueryClient()
  const { userId } = useContext(AuthContext)
  const { statusUser, userData } = useGetUserById(userId)

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  interface UserRequest {
    firstName: string
    lastName: string
    email: string
    phone: string
    animalId: string[]
  }

  const initialValues = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    animalId: userData.animalId,
    //animalId
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

  const updateUser = async (values: UserRequest) => {
    let data
    if (values) {
      if (values.animalId) {
        data = {
          ...values,
          animalId: values.animalId,
        }
      } else {
        data = {
          ...values,
          animalId: null,
        }
      }
      console.log('data', data)
      mutation.mutateAsync({ id: userId, values: data })
    }
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
            <CardStyle>
              <Formik
                initialValues={initialValues}
                onSubmit={(values: UserRequest) => {
                  updateUser(values)
                }}
              >
                {({ handleChange, handleBlur, values, handleSubmit, isValid, errors, touched }) => (
                  <>
                    <Body2>
                      Nom de famille<TextRed>*</TextRed>
                    </Body2>
                    <Spacing size="4" />
                    <Field name="lastName">
                      {({ field }) => (
                        <TextInput
                          {...field}
                          style={styles.input}
                          placeholder="Veuillez mettre votre nom de famille"
                          onChangeText={handleChange('lastName')}
                          onChange={handleChange('lastName')}
                          onBlur={handleBlur('lastName')}
                          value={values.lastName}
                        />
                      )}
                    </Field>
                    {errors.lastName && touched.lastName && (
                      <Body3 color={theme.colors.red}>{errors.lastName}</Body3>
                    )}
                    <Spacing size="16" />
                    <Body2>
                      Prénom<TextRed>*</TextRed>
                    </Body2>
                    <Spacing size="4" />
                    <Field name="firstName">
                      {({ field }) => (
                        <TextInput
                          {...field}
                          style={styles.input}
                          placeholder="Veuillez mettre votre prénom"
                          onChangeText={handleChange('firstName')}
                          onChange={handleChange('firstName')}
                          onBlur={handleBlur('firstName')}
                          value={values.firstName}
                        />
                      )}
                    </Field>
                    {errors.firstName && touched.firstName && (
                      <Body3 color={theme.colors.red}>{errors.firstName}</Body3>
                    )}
                    <Spacing size="16" />
                    <Body2>
                      Adresse mail<TextRed>*</TextRed>
                    </Body2>
                    <Spacing size="4" />
                    <Field name="email">
                      {({ field }) => (
                        <TextInput
                          {...field}
                          autoCapitalize="none"
                          style={styles.input}
                          keyboardType="email-address"
                          placeholder="Veuillez mettre l’adresse mail"
                          onChangeText={handleChange('email')}
                          onChange={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                        />
                      )}
                    </Field>
                    {errors.email && touched.email && (
                      <Body3 color={theme.colors.red}>{errors.email}</Body3>
                    )}
                    <Spacing size="16" />
                    <Body2>
                      Téléphone<TextRed>*</TextRed>
                    </Body2>
                    <Spacing size="4" />
                    <Field name="phone">
                      {({ field }) => (
                        <TextInput
                          {...field}
                          style={styles.input}
                          keyboardType="decimal-pad"
                          placeholder="Veuillez mettre votre numéro de téléphone"
                          onChangeText={handleChange('phone')}
                          onChange={handleChange('phone')}
                          onBlur={handleBlur('phone')}
                          value={values.phone}
                        />
                      )}
                    </Field>
                    {errors.phone && touched.phone && (
                      <Body3 color={theme.colors.red}>{errors.phone}</Body3>
                    )}
                    <Spacing size="16" />
                    <Button
                      title="Valider mes modification"
                      onPress={() => handleSubmit()}
                      disabled={!isValid}
                    />
                  </>
                )}
              </Formik>
            </CardStyle>
            <Spacing size="24" />
          </ContainerStyle>
        </Keyboard>
      )}
    </Layout>
  )
}

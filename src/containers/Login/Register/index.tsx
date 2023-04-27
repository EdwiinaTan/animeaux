import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Field, Formik } from 'formik'
import { useState } from 'react'
import { TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import { postUser } from 'src/client/User'
import { styles } from 'src/components/Form/Animal/Styled'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { SnackbarToastComponent } from 'src/components/SnackbarToast'
import { Body2, Body3 } from 'src/components/Typo'
import { IconMaterialCommunityIcons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { CardStyle, ContainerStyle, Keyboard, TextRed } from 'src/constant/Theme/Styled'
import { UserRequest } from 'src/types/User/Type'
import * as Yup from 'yup'
import { LoginRouteParams } from '../Router/type'
import { PasswordContainer } from './Styled'

export const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LoginRouteParams>>()
  const [securePassword, setSecurePassword] = useState(true)
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true)
  const queryClient = useQueryClient()

  const initialValues = {
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  }

  const validationAddUser = Yup.object().shape({
    lastName: Yup.string().required('Le nom de famille est requis'),
    firstName: Yup.string().required('Le prénom est requis'),
    email: Yup.string().email('Le format est incorrect').required('L’adresse mail est requise'),
    phone: Yup.string()
      .required('Le téléphone est requis')
      .length(10, 'Le téléphone doit contenir 10 chiffres'),
    password: Yup.string().required('Le mot de passe est requis'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'La confirmation de mot de passe doit correspondre avec le mot de passe'
    ),
  })

  const onClickPasswordEye = () => {
    setSecurePassword(!securePassword)
  }
  const onClickPasswordConfirmEye = () => {
    setSecureConfirmPassword(!secureConfirmPassword)
  }

  const mutation = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      navigation.goBack()
      queryClient.invalidateQueries(['users'])
      SnackbarToastComponent({
        title: 'La création de votre compte a bien été prise en compte',
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

  const addUser = (values: UserRequest) => {
    let data: UserRequest
    data = {
      ...values,
    }
    delete data.confirmPassword
    console.log('data', data)
    // mutation.mutate(data)
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={() => navigation.goBack()} title="Création de compte" />
      <Keyboard behavior="padding" enabled>
        <ContainerStyle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationAddUser}
            onSubmit={(values: UserRequest) => {
              addUser(values)
            }}
          >
            {({ handleChange, handleBlur, values, errors, touched, handleSubmit, isValid }) => (
              <CardStyle>
                <Body2>
                  Nom de famille<TextRed>*</TextRed>
                </Body2>
                <Spacing size="4" />
                <Field name="lastName">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Veuillez mettre votre nom"
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
                      placeholder="Veuillez mettre votre prénom*"
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
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder="Veuillez mettre votre adresse mail*"
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
                      keyboardType="phone-pad"
                      style={styles.input}
                      placeholder="Veuillez mettre votre téléphone*"
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
                <Body2>
                  Mot de passe<TextRed>*</TextRed>
                </Body2>
                <Spacing size="4" />
                <Field name="password">
                  {({ field }) => (
                    <PasswordContainer>
                      <TextInput
                        {...field}
                        secureTextEntry={securePassword}
                        autoCapitalize="none"
                        style={[styles.input, { width: '88%' }]}
                        placeholder="Veuillez choisir votre mot de passe*"
                        onChangeText={handleChange('password')}
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                      {values.password && securePassword ? (
                        <IconMaterialCommunityIcons
                          name="eye"
                          size={24}
                          onPress={onClickPasswordEye}
                        />
                      ) : (
                        <IconMaterialCommunityIcons
                          name="eye-off"
                          size={24}
                          onPress={onClickPasswordEye}
                        />
                      )}
                    </PasswordContainer>
                  )}
                </Field>
                {errors.password && touched.password && (
                  <Body3 color={theme.colors.red}>{errors.password}</Body3>
                )}
                <Spacing size="16" />
                <Body2>
                  Confirmation du mot de passe<TextRed>*</TextRed>
                </Body2>
                <Spacing size="4" />
                <Field name="confirmPassword">
                  {({ field }) => (
                    <PasswordContainer>
                      <TextInput
                        {...field}
                        secureTextEntry={secureConfirmPassword}
                        autoCapitalize="none"
                        style={[styles.input, { width: '88%' }]}
                        placeholder="Veuillez confirmer le mot de passe*"
                        onChangeText={handleChange('confirmPassword')}
                        onChange={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                      />
                      {values.confirmPassword && secureConfirmPassword ? (
                        <IconMaterialCommunityIcons
                          name="eye"
                          size={24}
                          onPress={onClickPasswordConfirmEye}
                        />
                      ) : (
                        <IconMaterialCommunityIcons
                          name="eye-off"
                          size={24}
                          onPress={onClickPasswordConfirmEye}
                        />
                      )}
                    </PasswordContainer>
                  )}
                </Field>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Body3 color={theme.colors.red}>{errors.confirmPassword}</Body3>
                )}
                <Spacing size="16" />
                <Button title="Valider" onPress={() => handleSubmit()} disabled={!isValid} />
              </CardStyle>
            )}
          </Formik>
        </ContainerStyle>
      </Keyboard>
    </Layout>
  )
}

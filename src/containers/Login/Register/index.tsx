import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Field, Formik } from 'formik'
import { useState } from 'react'
import { Platform, TextInput } from 'react-native'
import bcrypt from 'react-native-bcrypt'
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
import { CardStyle, ContainerStyle, KeyboardStyle, TextRed } from 'src/constant/Theme/Styled'
import { UserRequest } from 'src/types/User/Type'
import { LoginRouteParams } from '../Router/type'
import { PasswordContainer } from './Styled'
import { validationAddUser } from './Utils'

export const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LoginRouteParams>>()
  const [securePassword, setSecurePassword] = useState(true)
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true)
  const queryClient = useQueryClient()
  const salt = bcrypt.genSaltSync(10)

  const initialValues = {
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  }

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

  const addUser = async (values) => {
    let data
    data = {
      ...values,
      password: bcrypt.hashSync(values.password, salt),
      // token:
    }
    delete data.confirmPassword
    mutation.mutate(data)
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={() => navigation.goBack()} title="Création de compte" />
      <KeyboardStyle behavior={Platform.select({ android: undefined, ios: 'padding' })} enabled>
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
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder="Veuillez mettre votre adresse mail"
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
                      placeholder="Veuillez mettre votre téléphone"
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
                        placeholder="Veuillez choisir votre mot de passe"
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
                <Body3 color={theme.colors.grey2}>- Au minimum 7 caractères</Body3>
                <Body3 color={theme.colors.grey2}>- 1 chiffre</Body3>
                <Body3 color={theme.colors.grey2}>- 1 caractère spécial</Body3>
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
                        placeholder="Veuillez confirmer le mot de passe"
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
      </KeyboardStyle>
    </Layout>
  )
}

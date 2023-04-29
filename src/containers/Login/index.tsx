import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AnimalSvg } from 'assets/svg/animal'
import { Field, Formik } from 'formik'
import { useContext, useState } from 'react'
import { TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from 'src/components/Form/Animal/Styled'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body2, Body3, Title1 } from 'src/components/Typo'
import { IconMaterialCommunityIcons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { CardStyle, KeyboardStyle, TextRed } from 'src/constant/Theme/Styled'
import * as Yup from 'yup'
import { AuthContext } from '../App/AuthContext'
import { LoginRouteParams } from './Router/type'
import { PasswordContainer } from './Styled'

export const Login = () => {
  const { loginUser } = useContext(AuthContext)
  const navigation = useNavigation<NativeStackNavigationProp<LoginRouteParams>>()
  const [securePassword, setSecurePassword] = useState(true)

  const onClickPasswordEye = () => {
    setSecurePassword(!securePassword)
  }

  const initialValues = {
    email: '',
    password: '',
  }

  const validationLogin = Yup.object().shape({
    email: Yup.string().email('Le format est incorrect').required('L’adresse mail est requise'),
    password: Yup.string().required('Le responsable est obligatoire'),
  })

  const onClickRegister = () => {
    navigation.navigate('registerScreen')
  }

  return (
    <KeyboardStyle behavior="padding" enabled>
      <SafeAreaView>
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          <CardStyle>
            <Spacing size="32" />
            <Title1 textAlign="center">Bienvenue !</Title1>
            <View style={{ alignItems: 'center' }}>
              <AnimalSvg />
            </View>
            <Spacing size="16" />
            <Formik
              initialValues={initialValues}
              validationSchema={validationLogin}
              onSubmit={(values) => {
                loginUser(values.email, values.password)
              }}
            >
              {({ handleChange, handleBlur, values, handleSubmit, isValid, errors, touched }) => (
                <>
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
                  <Spacing size="8" />
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
                  <Button title="Créer un compte" onPress={() => onClickRegister()} />
                  <Spacing size="16" />
                  <Button title="Valider" onPress={() => handleSubmit()} disabled={!isValid} />
                </>
              )}
            </Formik>
          </CardStyle>
        </View>
      </SafeAreaView>
    </KeyboardStyle>
  )
}

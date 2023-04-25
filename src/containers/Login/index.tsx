import { AnimalSvg } from 'assets/svg/animal'
import { Field, Formik } from 'formik'
import { TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from 'src/components/Form/Animal/Styled'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body2, Title1 } from 'src/components/Typo'
import { CardStyle, ContainerStyle, TextRed } from 'src/constant/Theme/Styled'
import * as Yup from 'yup'

export const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  }

  const validationAnimalSituation = Yup.object().shape({
    email: Yup.string().email('Le format est incorrect').required('L’adresse mail est requise'),
    password: Yup.string().required('Le responsable est obligatoire'),
  })

  const updateAnimal = async (values) => {
    console.log('lala')
  }

  return (
    <SafeAreaView>
      <ContainerStyle>
        <CardStyle>
          <Spacing size="32" />
          <Title1 textAlign="center">Bienvenue !</Title1>
          <View style={{ alignItems: 'center' }}>
            <AnimalSvg />
          </View>
          <Spacing size="16" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationAnimalSituation}
            onSubmit={(values) => updateAnimal(values)}
          >
            {({ handleChange, handleBlur, values, handleSubmit }) => (
              <>
                <Body2>
                  Adresse mail<TextRed>*</TextRed>
                </Body2>
                <Spacing size="4" />
                <Field name="email">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      keyboardType="email-address"
                      placeholder="Veuillez mettre l’adresse mail"
                      onChangeText={handleChange('postalCode')}
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                  )}
                </Field>
                <Spacing size="8" />
                <Body2>
                  Mot de passe<TextRed>*</TextRed>
                </Body2>
                <Spacing size="4" />
                <Field name="phone">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Veuillez mettre le mot de passe"
                      onChangeText={handleChange('password')}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                  )}
                </Field>
                <Spacing size="32" />
                <Button title="Créer un compte" onPress={() => handleSubmit()} />
                <Spacing size="16" />
                <Button title="Connexion" onPress={() => handleSubmit()} />
              </>
            )}
          </Formik>
        </CardStyle>
      </ContainerStyle>
    </SafeAreaView>
  )
}

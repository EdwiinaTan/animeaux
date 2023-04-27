import { Field, FormikValues } from 'formik'
import { TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import { styles } from 'src/components/Form/Animal/Styled'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body2, Body3 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { TextRed } from 'src/constant/Theme/Styled'

interface FormLoginProps {
  field?: FormikValues
  onClickRegister: () => void
}

export const FormLogin: React.FC<FormLoginProps> = ({ field, onClickRegister }) => {
  const { handleChange, handleBlur, values, handleSubmit, isValid, errors, touched } = field

  return (
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
      {errors.email && touched.email && <Body3 color={theme.colors.red}>{errors.email}</Body3>}
      <Spacing size="8" />
      <Body2>
        Mot de passe<TextRed>*</TextRed>
      </Body2>
      <Spacing size="4" />
      <Field name="password">
        {({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Veuillez mettre le mot de passe"
            onChangeText={handleChange('password')}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
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
  )
}

import { Field } from 'formik'
import { TextInput, View } from 'react-native'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { Button } from 'react-native-elements'
import { styles } from 'src/components/Form/Animal/Styled'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body2, Body3 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { CardStyle, TextRed } from 'src/constant/Theme/Styled'
import { useGetAnimals } from 'src/hooks/Animal'
import { FetchStatus } from 'src/types/Status'
import { UserUpdateFormProps } from './Type'

export const UserUpdateForm: React.FC<UserUpdateFormProps> = ({
  field,
  setSelected,
  setSelectedNoCharge,
  userDataToken,
}) => {
  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isValid } = field
  const { statusAnimal, animalData } = useGetAnimals()

  const animalDataList = () => {
    let animalArray = []
    let animalNotMyChargeArray = []

    if (statusAnimal === FetchStatus.SUCCESS) {
      animalData.map(({ fields }) => {
        if (!fields.userId) {
          animalArray.push({
            key: fields.id,
            value: fields.name,
          })
        }
        if (fields.userId && userDataToken.id === fields.userId[0]) {
          animalNotMyChargeArray.push({
            key: fields.id,
            value: fields.name,
          })
        }
      })
      return {
        animalArray,
        animalNotMyChargeArray,
      }
    }
  }

  return (
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
      {errors.email && touched.email && <Body3 color={theme.colors.red}>{errors.email}</Body3>}
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
      {errors.phone && touched.phone && <Body3 color={theme.colors.red}>{errors.phone}</Body3>}
      <Spacing size="16" />
      <Body2>Ajouter un animal en charge</Body2>
      <Spacing size="4" />
      <View style={{ width: '100%' }}>
        <Field name="animalId">
          {({ field }) => (
            <MultipleSelectList
              {...field}
              setSelected={(val: string[]) => setSelected(val)}
              data={animalDataList().animalArray}
              placeholder="Rechercher"
              save="key"
              label="En charge"
            />
          )}
        </Field>
      </View>
      {userDataToken.animalId && userDataToken.animalId.length > 0 && (
        <>
          <Spacing size="16" />
          <Body2>Enlever un animal à ma charge</Body2>
          <Spacing size="4" />
          <View style={{ width: '100%' }}>
            <Field name="animalId">
              {({ field }) => (
                <MultipleSelectList
                  {...field}
                  setSelected={(val: string[]) => setSelectedNoCharge(val)}
                  data={animalDataList().animalNotMyChargeArray}
                  placeholder="Rechercher"
                  save="key"
                  label="N'est plus à ma charge"
                />
              )}
            </Field>
          </View>
        </>
      )}
      <Spacing size="16" />
      <Button title="Valider mes modification" onPress={() => handleSubmit()} disabled={!isValid} />
    </CardStyle>
  )
}

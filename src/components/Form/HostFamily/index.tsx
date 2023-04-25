import { Field } from 'formik'
import { TextInput, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button } from 'react-native-elements'
import { theme } from 'src/constant/Theme'
import { TextRed } from 'src/constant/Theme/Styled'
import { useGetAnimals } from 'src/hooks/Animal'
import { FetchStatus } from 'src/types/Status'
import { Spacing } from '../../Layout/Spacing'
import { Body2, Body3 } from '../../Typo'
import { styles } from '../Animal/Styled'
import { ContainerForm } from './Styled'
import { HostFamilyFormProps } from './Type'

export const HostFamilyProfile: React.FC<HostFamilyFormProps> = ({ field }) => {
  const { statusAnimal, animalData } = useGetAnimals()
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = field

  const animalDataList = () => {
    let animalArray = []
    if (statusAnimal === FetchStatus.SUCCESS) {
      animalData.map(({ fields }) => {
        animalArray.push({
          key: fields.id,
          value: fields.name,
        })
      })
      return animalArray
    }
  }

  return (
    <>
      <ContainerForm>
        <Body2>
          Nom<TextRed>*</TextRed>
        </Body2>
        <Spacing size="4" />
        <Field name="lastName">
          {({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Veuillez mettre le nom de famille"
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
              placeholder="Veuillez mettre le prénom"
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
              placeholder="Veuillez mettre le prénom"
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
              keyboardType="phone-pad"
              placeholder="Veuillez mettre le prénom"
              onChangeText={handleChange('phone')}
              onChange={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
          )}
        </Field>
        {errors.phone && touched.phone && <Body3 color={theme.colors.red}>{errors.phone}</Body3>}
        <Spacing size="16" />
        <Body2>
          Code postal<TextRed>*</TextRed>
        </Body2>
        <Spacing size="4" />
        <Field name="postalCode">
          {({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Veuillez mettre le code postal"
              onChangeText={handleChange('postalCode')}
              onChange={handleChange('postalCode')}
              onBlur={handleBlur('postalCode')}
              value={values.postalCode}
            />
          )}
        </Field>
        {errors.postalCode && touched.postalCode && (
          <Body3 color={theme.colors.red}>{errors.postalCode}</Body3>
        )}
        <Spacing size="16" />
        <Body2>
          Ville<TextRed>*</TextRed>
        </Body2>
        <Spacing size="4" />
        <Field name="city">
          {({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Veuillez mettre la ville"
              onChangeText={handleChange('city')}
              onChange={handleChange('city')}
              onBlur={handleBlur('city')}
              value={values.city}
            />
          )}
        </Field>
        {errors.city && touched.city && <Body3 color={theme.colors.red}>{errors.city}</Body3>}
        <Spacing size="16" />
        <Body2>
          Adresse<TextRed>*</TextRed>
        </Body2>
        <Spacing size="4" />
        <Field name="address">
          {({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Veuillez mettre la ville"
              onChangeText={handleChange('address')}
              onChange={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
            />
          )}
        </Field>
        {errors.address && touched.address && (
          <Body3 color={theme.colors.red}>{errors.address}</Body3>
        )}
        <Spacing size="16" />
        <Body2>Critère</Body2>
        <Spacing size="4" />
        <Field name="criteria">
          {({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Veuillez mettre un critère"
              onChangeText={handleChange('criteria')}
              onChange={handleChange('criteria')}
              onBlur={handleBlur('criteria')}
              value={values.criteria}
            />
          )}
        </Field>
        <Spacing size="16" />
        <Body2>Description</Body2>
        <Spacing size="4" />
        <Field name="description">
          {({ field }) => (
            <TextInput
              {...field}
              multiline
              style={styles.input}
              placeholder="Veuillez mettre une description"
              onChangeText={handleChange('description')}
              onChange={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
            />
          )}
        </Field>
        <Spacing size="16" />
        <Body2>En pause ?</Body2>
        <Spacing size="4" />
        <Field name="onBreak">
          {({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Veuillez mettre si la FA est en pause"
              onChangeText={handleChange('onBreak')}
              onChange={handleChange('onBreak')}
              onBlur={handleBlur('onBreak')}
              value={values.onBreak}
            />
          )}
        </Field>
        <Spacing size="16" />
        <Body2>Animal recueilli</Body2>
        <Spacing size="4" />
        <View style={{ width: '100%' }}>
          <Field name="animalId">
            {({ field }) => (
              //MultipleSelectList
              <SelectList
                inputStyles={{ padding: 0 }}
                boxStyles={{
                  width: '100%',
                  borderColor: theme.colors.grey0,
                }}
                label="Animaux"
                {...field}
                searchPlaceholder="Rechercher"
                setSelected={handleChange('animalId')}
                onChange={handleChange('animalId')}
                data={animalDataList()}
                onBlur={handleBlur('animalId')}
                placeholder="Veuillez choisir l'animal"
                save="key"
                value={values.animalId}
              />
            )}
          </Field>
        </View>
        <Spacing size="24" />
      </ContainerForm>
      <Button title="Valider" onPress={() => handleSubmit()} />
    </>
  )
}

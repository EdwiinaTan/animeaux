import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { TextInput, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button, Divider } from 'react-native-elements'
import { CheckBoxComponent } from 'src/components/Animal/Checkbox'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body2, Body3, Title3 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { colorArray, genderArray, raceArray, specieArray } from 'src/utils/Animal'
import { ContainerCheckbox, styles, TextRed } from '../Styled'
import { AnimalFormProps } from '../Type'

export const AnimalProfile: React.FC<AnimalFormProps> = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  animalDetails,
  errors,
  touched,
}) => {
  const [race, setRace] = useState<string>('')
  const [color, setColor] = useState<string>('')

  useEffect(() => {
    if (animalDetails) {
      setRace(animalDetails.race)
      setColor(animalDetails.color)
    } else {
      setRace('')
      setColor('')
    }
  }, [])

  return (
    <>
      <ContainerCheckbox>
        <Title3>
          Espèce<TextRed>*</TextRed>
        </Title3>
        <Spacing size="8" />
        {specieArray.map((specie, key) => (
          <CheckBoxComponent
            key={`species_${key}`}
            animal={specie}
            values={values.species}
            handleChange={() => handleChange('species')(specie.value)}
          />
        ))}
        <Spacing size="24" />
        <Title3>
          Genre<TextRed>*</TextRed>
        </Title3>
        <Spacing size="8" />
        {genderArray.map((gender, key) => (
          <CheckBoxComponent
            key={`gender_${key}`}
            animal={gender}
            values={values.gender}
            handleChange={() => handleChange('gender')(gender.value)}
          />
        ))}
      </ContainerCheckbox>
      <Spacing size="24" />
      <Divider />
      <Spacing size="8" />
      <Title3>Informations</Title3>
      <Spacing size="8" />
      <Body2>
        Nom<TextRed>*</TextRed>
      </Body2>
      <Field name="name">
        {({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            placeholder="Veuillez mettre le nom de l’animal"
            onChangeText={handleChange('name')}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
        )}
      </Field>
      {errors.name && touched.name && <Body3 color={theme.colors.red}>{errors.name}</Body3>}
      <Spacing size="16" />
      <Body2>Alias</Body2>
      <Field name="alias">
        {({ field }) => (
          <TextInput
            focusable
            {...field}
            // autoFocus
            style={styles.input}
            placeholder="Veuillez mettre l’alias"
            onChangeText={handleChange('alias')}
            onChange={handleChange('alias')}
            onBlur={handleBlur('alias')}
            value={values.alias}
          />
        )}
      </Field>
      {errors.alias && touched.alias && <Body3 color={theme.colors.red}>{errors.alias}</Body3>}
      <Spacing size="16" />
      <Body2>Icad</Body2>
      <Field name="icadNumber">
        {({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            placeholder="Veuillez mettre le numéro icad"
            onChangeText={handleChange('icadNumber')}
            onChange={handleChange('icadNumber')}
            onBlur={handleBlur('icadNumber')}
            value={values.icadNumber}
          />
        )}
      </Field>
      <Spacing size="16" />
      <Body2>
        Race<TextRed>*</TextRed>
      </Body2>
      <View style={{ width: '100%' }}>
        <Field name="race">
          {({ field }) => (
            <SelectList
              inputStyles={{ padding: 0 }}
              boxStyles={{
                width: '100%',
                borderColor: theme.colors.grey0,
              }}
              {...field}
              searchPlaceholder="Rechercher"
              setSelected={handleChange('race')}
              onChange={handleChange('race')}
              data={raceArray}
              placeholder="Veuillez choisir la race"
              defaultOption={{ key: race, value: race }}
              save="key"
              value={values.race}
            />
          )}
        </Field>
      </View>
      <Spacing size="16" />
      <Body2>Couleur</Body2>
      <View style={{ width: '100%' }}>
        <Field name="color">
          {({ field }) => (
            <SelectList
              boxStyles={{
                width: '100%',
                borderColor: theme.colors.grey0,
              }}
              {...field}
              searchPlaceholder="Rechercher"
              setSelected={handleChange('color')}
              onChange={handleChange('color')}
              data={colorArray}
              defaultOption={{ key: color, value: color }}
              placeholder="Veuillez choisir la couleur"
              save="key"
              value={values.color}
            />
          )}
        </Field>
      </View>
      <Spacing size="16" />
      <Body2>Description publique</Body2>
      <Field name="publicDescription">
        {({ field }) => (
          <TextInput
            focusable
            {...field}
            editable
            multiline
            style={styles.input}
            placeholder={'Veuillez mettre une description publique'}
            onChangeText={handleChange('publicDescription')}
            onChange={handleChange('publicDescription')}
            onBlur={handleBlur('publicDescription')}
            value={values.publicDescription}
          />
        )}
      </Field>
      <Spacing size="24" />
      <Button title="Submit" onPress={() => handleSubmit()} />
    </>
  )
}

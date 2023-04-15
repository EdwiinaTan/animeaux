import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button, Divider } from 'react-native-elements'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { CheckBoxComponent } from 'src/containers/Home/Animal/Update/Checkbox'
import { colorArray, genderArray, raceArray, specieArray } from 'src/utils/Animal'
import { AnimalFormProps } from '../Type'
import { ContainerCheckbox } from './Styled'

export const AnimalProfile: React.FC<AnimalFormProps> = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  animalDetails,
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
        <Text>Espèce</Text>
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
        <Text>Genre</Text>
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
      <Text>Informations</Text>
      <Spacing size="8" />
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Nom</Text>
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Alias</Text>
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Icad</Text>
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Race</Text>
      <Spacing size="4" />
      <View style={{ width: '100%' }}>
        <Field name="race">
          {({ field }) => (
            <SelectList
              inputStyles={{ padding: 0 }}
              boxStyles={{
                width: '100%',
                borderColor: theme.colors.greyOutline,
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Couleur</Text>
      <Spacing size="4" />
      <View style={{ width: '100%' }}>
        <Field name="color">
          {({ field }) => (
            <SelectList
              boxStyles={{
                width: '100%',
                borderColor: theme.colors.greyOutline,
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Description public</Text>
      <Field name="publicDescription">
        {({ field }) => (
          <TextInput
            focusable
            {...field}
            editable
            multiline
            style={styles.input}
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

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.grey0,
  },
})

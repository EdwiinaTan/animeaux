import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button, Divider } from 'react-native-elements'
import { CheckBoxComponent } from 'src/components/Animal/Checkbox'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body2, Body3, Title3 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import {
  AnimalColorEnum,
  AnimalGenderEnum,
  AnimalRaceEnum,
  AnimalTypeEnum,
} from 'src/types/Animal/enum'
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
  const [selectedDate, setSelectedDate] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (animalDetails) {
      setRace(animalDetails.race)
      setColor(animalDetails.couleur)
    } else {
      setRace('')
      setColor('')
    }
  }, [])

  const raceArray = Object.keys(AnimalRaceEnum).map((key) => ({
    key: key,
    value: AnimalRaceEnum[key],
  }))

  const colorArray = Object.keys(AnimalColorEnum).map((key) => ({
    key: key,
    value: AnimalColorEnum[key],
  }))

  const especeArray = Object.keys(AnimalTypeEnum).map((key) => ({
    label: AnimalTypeEnum[key],
    value: AnimalTypeEnum[key],
  }))

  const genreArray = Object.keys(AnimalGenderEnum).map((key) => ({
    label: AnimalGenderEnum[key],
    value: AnimalGenderEnum[key],
  }))

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString)
    setModalVisible(false)
  }

  return (
    <>
      <ContainerCheckbox>
        <Title3>
          Espèce<TextRed>*</TextRed>
        </Title3>
        <Spacing size="8" />
        {especeArray.map((espece, key) => (
          <CheckBoxComponent
            key={`espece_${key}`}
            animal={espece}
            values={values.espece}
            handleChange={() => handleChange('espece')(espece.value)}
          />
        ))}
        <Spacing size="24" />
        <Title3>
          Genre<TextRed>*</TextRed>
        </Title3>
        <Spacing size="8" />
        {genreArray.map((genre, key) => (
          <CheckBoxComponent
            key={`genre_${key}`}
            animal={genre}
            values={values.genre}
            handleChange={() => handleChange('genre')(genre.value)}
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
      <Field name="nom">
        {({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            placeholder="Veuillez mettre le nom de l’animal"
            onChangeText={handleChange('nom')}
            onChange={handleChange('nom')}
            onBlur={handleBlur('nom')}
            value={values.nom}
          />
        )}
      </Field>
      <Spacing size="16" />
      <View>
        <Text>Date de naissance : {selectedDate}</Text>
        <Button title="Open datepicker" onPress={() => setModalVisible(true)} />
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Calendar onDayPress={handleDateSelect} />
            </View>
          </View>
        </Modal>
      </View>
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
      <Field name="icad">
        {({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            placeholder="Veuillez mettre le numéro icad"
            onChangeText={handleChange('icad')}
            onChange={handleChange('icad')}
            onBlur={handleBlur('icad')}
            value={values.icad}
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
              save="value"
              value={values.race}
            />
          )}
        </Field>
      </View>
      <Spacing size="16" />
      <Body2>Couleur</Body2>
      <View style={{ width: '100%' }}>
        <Field name="couleur">
          {({ field }) => (
            <SelectList
              boxStyles={{
                width: '100%',
                borderColor: theme.colors.grey0,
              }}
              {...field}
              searchPlaceholder="Rechercher"
              setSelected={handleChange('couleur')}
              onChange={handleChange('couleur')}
              data={colorArray}
              defaultOption={{ key: color, value: color }}
              placeholder="Veuillez choisir la couleur"
              save="value"
              value={values.couleur}
            />
          )}
        </Field>
      </View>
      <Spacing size="16" />
      <Body2>Description publique</Body2>
      <Field name="descriptionPublique">
        {({ field }) => (
          <TextInput
            focusable
            {...field}
            editable
            multiline
            style={styles.input}
            placeholder={'Veuillez mettre une description publique'}
            onChangeText={handleChange('descriptionPublique')}
            onChange={handleChange('descriptionPublique')}
            onBlur={handleBlur('descriptionPublique')}
            value={values.descriptionPublique}
          />
        )}
      </Field>
      <Spacing size="24" />
      <Button title="Submit" onPress={() => handleSubmit()} />
    </>
  )
}

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})

import { CalendarSvg } from 'assets/svg/calendar'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { Modal, TextInput, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button, Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CheckBoxComponent } from 'src/components/Form/Animal/Checkbox'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body2, Body3, Title3 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { ContainerCalendar } from 'src/containers/Home/Animal/Update/Profile/Styled'
import {
  AnimalColorEnum,
  AnimalGenderEnum,
  AnimalRaceEnum,
  AnimalTypeEnum,
} from 'src/types/Animal/enum'
import { ContainerCheckbox, style, styles, TextRed } from '../Styled'
import { AnimalFormProps } from '../Type'

export const AnimalProfile: React.FC<AnimalFormProps> = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  animalDetails,
  errors,
  touched,
  setFieldValue,
}) => {
  const [race, setRace] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (animalDetails) {
      setRace(animalDetails.race)
      setColor(animalDetails.color)
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

  const speciesArray = Object.keys(AnimalTypeEnum).map((key) => ({
    label: AnimalTypeEnum[key],
    value: AnimalTypeEnum[key],
  }))
  const firstProp = Object.keys(speciesArray)[0]
  delete speciesArray[firstProp]

  const genderArray = Object.keys(AnimalGenderEnum).map((key) => ({
    label: AnimalGenderEnum[key],
    value: AnimalGenderEnum[key],
  }))

  const handleDateSelect = (day) => {
    setFieldValue('birthday', day.dateString)
    setModalVisible(false)
  }

  return (
    <>
      <ContainerCheckbox>
        <Title3>
          Espèce<TextRed>*</TextRed>
        </Title3>
        <Spacing size="8" />
        {speciesArray.map((specie, key) => (
          <CheckBoxComponent
            key={`species_${key}`}
            animal={specie}
            values={values.species}
            handleChange={() => handleChange('species')(specie.value)}
          />
        ))}
        {errors.species && touched.species && (
          <Body3 color={theme.colors.red}>{errors.species}</Body3>
        )}
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
      <View>
        <Body2>
          Date de naissance<TextRed>*</TextRed>
        </Body2>
        <ContainerCalendar>
          <Field name="birthday">
            {({ field }) => (
              <>
                <TextInput
                  {...field}
                  style={styles.inputDate}
                  editable={false}
                  placeholder="Veuillez mettre la date de naissance de l’animal"
                  value={values.birthday}
                />
                <Modal visible={modalVisible} transparent={true} animationType="slide">
                  <View style={style.centeredView}>
                    <View style={style.modalView}>
                      <Calendar
                        onDayPress={handleDateSelect}
                        hideExtraDays
                        markedDates={{
                          [values.birthday]: {
                            selected: true,
                            selectedColor: theme.colors.blue,
                          },
                        }}
                      />
                    </View>
                  </View>
                </Modal>
              </>
            )}
          </Field>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <CalendarSvg />
          </TouchableOpacity>
        </ContainerCalendar>
        {errors.birthday && touched.birthday && (
          <Body3 color={theme.colors.red}>{errors.birthday}</Body3>
        )}
      </View>
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
      {errors.alias && touched.alias && <Body3 color={theme.colors.orange}>{errors.alias}</Body3>}
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
            keyboardType="numeric"
          />
        )}
      </Field>
      {errors.icad && touched.icad && <Body3 color={theme.colors.orange}>{errors.icad}</Body3>}
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
      {errors.race && touched.race && <Body3 color={theme.colors.red}>{errors.race}</Body3>}
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
              placeholder="Veuillez choisir la color"
              save="value"
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
      {errors.publicDescription && touched.publicDescription && (
        <Body3 color={theme.colors.orange}>{errors.publicDescription}</Body3>
      )}
      <Spacing size="24" />
      <Button title="Valider" onPress={() => handleSubmit()} />
    </>
  )
}

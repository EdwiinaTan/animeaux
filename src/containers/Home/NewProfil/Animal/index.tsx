import { useNavigation } from '@react-navigation/native'
import { Field, Formik } from 'formik'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button, Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StepIndicator from 'react-native-step-indicator'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { colorArray, genderArray, raceArray, specieArray } from 'src/utils/Animal'
import { CheckBoxComponent } from '../../Animal/Update/Checkbox'
import { Card, Container } from './Styled'

export const AddAnimal = () => {
  const navigation = useNavigation()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const labels = ['Profil', 'Situation', 'Photos']

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: theme.lightColors.primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: theme.lightColors.primary,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: theme.lightColors.primary,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: theme.lightColors.primary,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: theme.lightColors.primary,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: theme.lightColors.primary,
  }

  const [currentPosition, setCurrentPosition] = useState(0)

  const onPageChange = (value: string) => {
    if (value === 'next') {
      currentPosition !== 2 ? setCurrentPosition(currentPosition + 1) : setCurrentPosition(2)
    } else {
      currentPosition !== 0 ? setCurrentPosition(currentPosition - 1) : setCurrentPosition(0)
    }
  }

  const initialValues = {
    species: '',
    gender: '',
    name: '',
    alias: '',
    icadNumber: '',
    race: '',
    color: '',
    publicDescription: '',
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Ajouter un animal" />

      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        stepCount={3}
        direction="horizontal"
      />

      <Container>
        <Card>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log('value', values)
            }}
          >
            {({ handleChange, values, handleSubmit, handleBlur }) => (
              <>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
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
                </View>
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
                        boxStyles={{ width: '100%', borderColor: theme.lightColors.greyOutline }}
                        {...field}
                        searchPlaceholder="Rechercher"
                        setSelected={handleChange('race')}
                        onChange={handleChange('race')}
                        data={raceArray}
                        placeholder="Veuillez choisir la race"
                        save="value"
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
                        boxStyles={{ width: '100%', borderColor: theme.lightColors.greyOutline }}
                        {...field}
                        searchPlaceholder="Rechercher"
                        setSelected={handleChange('color')}
                        onChange={handleChange('color')}
                        data={colorArray}
                        placeholder="Veuillez choisir la couleur"
                        save="value"
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
            )}
          </Formik>
        </Card>
        <Spacing size="24" />
      </Container>
      {currentPosition !== 0 && (
        <TouchableOpacity onPress={() => onPageChange('prev')}>
          <Text>Précédent</Text>
          <Spacing size="24" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => onPageChange('next')}>
        <Text>Suivant</Text>
      </TouchableOpacity>
    </Layout>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.lightColors.white,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.lightColors.greyOutline,
  },
})

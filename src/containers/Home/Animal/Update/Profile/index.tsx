import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Field, Formik } from 'formik'
import { useRef } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button, Divider } from 'react-native-elements'
import { updateAnimalByIdTest } from 'src/client/Animal'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import {
  AnimalColorEnum,
  AnimalGenderEnum,
  AnimalRaceEnum,
  AnimalTypeEnum,
} from 'src/types/Animal/enum'
import { AnimalType } from 'src/types/Animal/Type'
import { startsWithVowel } from 'src/utils/Functions'
import * as Yup from 'yup'
import { AnimalRouteParams } from '../../Router/type'
import { CheckBoxComponent } from '../Checkbox'
import { Card, Container } from './Styled'

export interface AnimalRequest {
  species: AnimalTypeEnum
  gender: AnimalGenderEnum
  name: string
  alias: string
  icadNumber: string
  race: AnimalRaceEnum
  color: AnimalColorEnum
  publicDescription: string
}
export const AnimalUpdate = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const nameRef = useRef(animalDetails.name)

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Le nom doit contenir au moins 1 caractère')
      .required('Le nom est requis'),
    alias: Yup.string().min(1, 'L’alias doit contenir au moins 1 caractère'),
  })

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues: AnimalRequest = {
    species: animalDetails.species,
    gender: animalDetails.gender,
    name: animalDetails.name,
    alias: animalDetails.alias,
    icadNumber: animalDetails.icadNumber,
    race: animalDetails.race,
    color: animalDetails.color,
    publicDescription: animalDetails.publicDescription,
  }

  const species = [
    { label: 'Chien', value: AnimalTypeEnum.DOG },
    { label: 'Chat', value: AnimalTypeEnum.CAT },
    { label: 'Rongeur', value: AnimalTypeEnum.RONDENT },
    { label: 'Oiseau', value: AnimalTypeEnum.BIRD },
    { label: 'Reptile', value: AnimalTypeEnum.REPTILE },
  ]

  const genderArray = [
    { label: 'Male', value: AnimalGenderEnum.MALE },
    { label: 'Femelle', value: AnimalGenderEnum.FEMALE },
  ]

  const races = [
    { key: AnimalRaceEnum.BEAGLE, value: AnimalRaceEnum.BEAGLE },
    { key: AnimalRaceEnum.BERGER_ALLEMAND, value: AnimalRaceEnum.BERGER_ALLEMAND },
    { key: AnimalRaceEnum.BERGER_SERBE, value: AnimalRaceEnum.BERGER_SERBE },
    { key: AnimalRaceEnum.BORDER_COLLIE, value: AnimalRaceEnum.BORDER_COLLIE },
    { key: AnimalRaceEnum.BOULEDOGUE_ANGLAIS, value: AnimalRaceEnum.BOULEDOGUE_ANGLAIS },
    { key: AnimalRaceEnum.BOULEDOGUE_FRANCAIS, value: AnimalRaceEnum.BOULEDOGUE_FRANCAIS },
    { key: AnimalRaceEnum.BOWER, value: AnimalRaceEnum.BOWER },
    { key: AnimalRaceEnum.CANICHE, value: AnimalRaceEnum.CANICHE },
    { key: AnimalRaceEnum.COCHON_INDE, value: AnimalRaceEnum.COCHON_INDE },
    { key: AnimalRaceEnum.CROISE, value: AnimalRaceEnum.CROISE },
    { key: AnimalRaceEnum.DOGUE_ARGENTIN, value: AnimalRaceEnum.DOGUE_ARGENTIN },
    { key: AnimalRaceEnum.EUROPEEN, value: AnimalRaceEnum.EUROPEEN },
    { key: AnimalRaceEnum.GRIFFON, value: AnimalRaceEnum.GRIFFON },
    { key: AnimalRaceEnum.JACK_RUSSEL, value: AnimalRaceEnum.JACK_RUSSEL },
    { key: AnimalRaceEnum.LAPIN, value: AnimalRaceEnum.LAPIN },
    { key: AnimalRaceEnum.MALINOIS, value: AnimalRaceEnum.MALINOIS },
    { key: AnimalRaceEnum.PEKINOIS, value: AnimalRaceEnum.PEKINOIS },
    { key: AnimalRaceEnum.PINSCHER, value: AnimalRaceEnum.PINSCHER },
    { key: AnimalRaceEnum.ROTTWEILER, value: AnimalRaceEnum.ROTTWEILER },
    { key: AnimalRaceEnum.SIAMOIS, value: AnimalRaceEnum.SIAMOIS },
    { key: AnimalRaceEnum.STAFF, value: AnimalRaceEnum.STAFF },
    { key: AnimalRaceEnum.TECKEL, value: AnimalRaceEnum.TECKEL },
  ]

  const colors = [
    { key: AnimalColorEnum.BEIGE, value: AnimalColorEnum.BEIGE },
    { key: AnimalColorEnum.BLANC, value: AnimalColorEnum.BLANC },
    { key: AnimalColorEnum.BLEU, value: AnimalColorEnum.BLEU },
    { key: AnimalColorEnum.BRINGE, value: AnimalColorEnum.BRINGE },
    { key: AnimalColorEnum.CHOCOLAT, value: AnimalColorEnum.CHOCOLAT },
    { key: AnimalColorEnum.ECAILLE_DE_TORTUE, value: AnimalColorEnum.ECAILLE_DE_TORTUE },
    { key: AnimalColorEnum.FAUVE, value: AnimalColorEnum.FAUVE },
    { key: AnimalColorEnum.FAUVE_NOIR, value: AnimalColorEnum.FAUVE_NOIR },
    { key: AnimalColorEnum.GRIS, value: AnimalColorEnum.GRIS },
    { key: AnimalColorEnum.GRIS_BLANC, value: AnimalColorEnum.GRIS_BLANC },
    { key: AnimalColorEnum.MARRON, value: AnimalColorEnum.MARRON },
    { key: AnimalColorEnum.MARRON_BLANC, value: AnimalColorEnum.MARRON_BLANC },
    { key: AnimalColorEnum.NOIR, value: AnimalColorEnum.NOIR },
    { key: AnimalColorEnum.ROUX, value: AnimalColorEnum.ROUX },
    { key: AnimalColorEnum.ROUX_BLANC, value: AnimalColorEnum.ROUX_BLANC },
    { key: AnimalColorEnum.TIGRE, value: AnimalColorEnum.TIGRE },
    { key: AnimalColorEnum.TIBRE_BLANC, value: AnimalColorEnum.TIBRE_BLANC },
    { key: AnimalColorEnum.TIGRE_ROUX, value: AnimalColorEnum.TIGRE_ROUX },
    { key: AnimalColorEnum.TRICOLORE, value: AnimalColorEnum.TRICOLORE },
    { key: AnimalColorEnum.TYPE_SIAMOIS, value: AnimalColorEnum.TYPE_SIAMOIS },
    { key: AnimalColorEnum.NOIR_BLANC, value: AnimalColorEnum.NOIR_BLANC },
    { key: AnimalColorEnum.CREME, value: AnimalColorEnum.CREME },
  ]

  const updateAnimal = (values: AnimalRequest) => {
    updateAnimalByIdTest(animalDetails.id, values)
    navigation.goBack()
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier le ${startsWithVowel(animalDetails.name)}`}
      />
      <Container>
        <Card>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: AnimalRequest) => {
              updateAnimal(values)
            }}
          >
            {({ handleChange, values, handleSubmit, handleBlur }) => (
              <>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Text>Espèce</Text>
                  <Spacing size="8" />
                  {species.map((specie, key) => (
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
                      ref={nameRef}
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
                        data={races}
                        placeholder="Veuillez choisir la race"
                        defaultOption={{ key: animalDetails.race, value: animalDetails.race }}
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
                        data={colors}
                        placeholder="Veuillez choisir la couleur"
                        defaultOption={{ key: animalDetails.color, value: animalDetails.color }}
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

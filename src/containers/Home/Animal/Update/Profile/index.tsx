import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Field, Formik } from 'formik'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button } from 'react-native-elements'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { AnimalGenderEnum, AnimalTypeEnum } from 'src/types/Animal/enum'
import { AnimalType } from 'src/types/Animal/Type'
import { startsWithVowel } from 'src/utils/Functions'
import * as Yup from 'yup'
import { AnimalRouteParams } from '../../Router/type'
import { CheckBoxComponent } from '../Checkbox'
import { Card, Container } from './Styled'

export const AnimalUpdate = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Le nom doit contenir au moins 1 caractère')
      .required('Le nom est requis'),
    alias: Yup.string().min(1, 'L’alias doit contenir au moins 1 caractère'),
  })

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues = {
    animal: animalDetails.species,
    gender: animalDetails.gender,
    name: animalDetails.name,
    alias: animalDetails.alias,
    icad: animalDetails.icadNumber,
    race: animalDetails.race,
    color: animalDetails.color,
  }

  const animals = [
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

  // const statusArray = [
  //   { label: 'Adopté', value: AnimalStatusEnum.ADOPTE },
  //   { label: 'Décédé', value: AnimalStatusEnum.DECEDE },
  //   { label: 'Libre', value: AnimalStatusEnum.LIBRE },
  //   { label: 'Adoptable', value: AnimalStatusEnum.ADOPTABLE },
  //   { label: 'Réservable', value: AnimalStatusEnum.RESERVABLE },
  //   { label: 'Indisponible', value: AnimalStatusEnum.INDISPONIBLE },
  // ]

  // const reasonArray = [
  //   { label: 'Décès du propriétaire', value: AnimalReasonEnum.DECES_DU_PROPRIETAIRE },
  //   { label: 'Abandon', value: AnimalReasonEnum.ABANDON },
  //   { label: 'Maltraitance', value: AnimalReasonEnum.MALTRAITANCE },
  //   { label: 'Errance', value: AnimalReasonEnum.ERRANCE },
  //   { label: 'Autre raison', value: AnimalReasonEnum.AUTRE_RAISON },
  // ]

  // const agreementArray = [
  //   { label: 'Oui', value: AnimalAgreement.YES },
  //   { label: 'Non', value: AnimalAgreement.NO },
  //   { label: 'Inconnu', value: AnimalAgreement.UNKNOW },
  // ]

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]

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
            onSubmit={(values) => console.log('submit: ', values)}
          >
            {({ handleChange, values, handleSubmit, handleBlur }) => (
              <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text>Espèce</Text>
                <Spacing size="8" />
                {animals.map((animal, key) => (
                  <CheckBoxComponent
                    key={`specie_${key}`}
                    animal={animal}
                    values={values.animal}
                    handleChange={() => handleChange('animal')(animal.value)}
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
                <Spacing size="24" />
                <Text>Informations</Text>
                <Spacing size="8" />
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Nom</Text>
                <Field name="name">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Veuillez mettre le nom de l'animal"
                      // onChangeText={handleChange('nameAnimal')}
                      onChange={handleChange('name')}
                      autoCapitalize="words"
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                  )}
                </Field>
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Alias</Text>
                <Field name="alias">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Veuillez mettre l’alias"
                      onChange={handleChange('alias')}
                      onBlur={handleBlur('alias')}
                      value={values.alias}
                    />
                  )}
                </Field>
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Icad</Text>
                <Field name="icad">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Veuillez mettre le numéro icad"
                      onChange={handleChange('icad')}
                      onBlur={handleBlur('icad')}
                      value={values.icad}
                    />
                  )}
                </Field>
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Race</Text>
                <Spacing size="4" />
                <View style={{ width: '100%' }}>
                  <Field name="race">
                    {({ field }) => (
                      <SelectList
                        boxStyles={{ width: '100%' }}
                        {...field}
                        setSelected={handleChange('race')}
                        onChange={handleChange('race')}
                        data={options}
                        placeholder="Veuillez choisir la race"
                        // defaultOption={{ label: 'race', value: 'race' }}
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
                        boxStyles={{ width: '100%' }}
                        {...field}
                        setSelected={handleChange('color')}
                        onChange={handleChange('color')}
                        data={options}
                        placeholder="Veuillez choisir la couleur"
                        // defaultOption={{ label: 'race', value: 'race' }}
                        save="value"
                        value={values.color}
                      />
                    )}
                  </Field>
                </View>
                <Spacing size="24" />
                <Button title="Submit" onPress={() => handleSubmit()} />
              </View>
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

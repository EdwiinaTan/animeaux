import { useNavigation } from '@react-navigation/native'
import { Field, Formik } from 'formik'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
// import { FlatList } from 'react-native-gesture-handler'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body2 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetAnimals } from 'src/hooks/Animal'
import { FetchStatus } from 'src/types/Status'
import { Card, Container, Keyboard, TextRed } from './Styled'
// import { useAirtableAnimal } from 'src/hooks/Animal'

export const AddHostFamily = () => {
  const navigation = useNavigation()
  // const { dataTest } = useAirtableAnimal()
  const { statusAnimal, animalData } = useGetAnimals()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postalCode: '',
    city: '',
    address: '',
    animalId: '',
    criteria: '',
    description: '',
    onBreak: '',
  }

  const animalDataList = () => {
    let tab = []
    if (statusAnimal === FetchStatus.SUCCESS) {
      animalData.map(({ fields }) => {
        tab.push({
          key: fields.id,
          value: fields.name,
        })
      })
      return tab
    }
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Ajouter une famille d’accueil" />
      <Keyboard behavior="padding" enabled>
        <Container>
          <Card>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log('value', values)
                // updateAnimal(values)
              }}
            >
              {({ handleChange, values, handleSubmit, handleBlur }) => (
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Body2>
                    Nom<TextRed>*</TextRed>
                  </Body2>
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
                  <Spacing size="8" />
                  <Body2>
                    Prénom<TextRed>*</TextRed>
                  </Body2>
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
                  <Spacing size="8" />
                  <Body2>
                    Adresse mail<TextRed>*</TextRed>
                  </Body2>
                  <Field name="email">
                    {({ field }) => (
                      <TextInput
                        {...field}
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
                  <Spacing size="8" />
                  <Body2>
                    Téléphone<TextRed>*</TextRed>
                  </Body2>
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
                  <Spacing size="8" />
                  <Body2>
                    Code postal<TextRed>*</TextRed>
                  </Body2>
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
                  <Spacing size="8" />
                  <Body2>
                    Ville<TextRed>*</TextRed>
                  </Body2>
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
                  <Spacing size="8" />
                  <Body2>
                    Adresse<TextRed>*</TextRed>
                  </Body2>
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
                  <Spacing size="8" />
                  <Body2>Critère</Body2>
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
                  <Spacing size="8" />
                  <Body2>Description</Body2>
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
                  <Spacing size="8" />
                  <Body2>En pause ?</Body2>
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
                  <Spacing size="8" />
                  <Body2>Animal recueilli</Body2>
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
                  <Spacing size="16" />
                  <Button title="Submit" onPress={() => handleSubmit()} />
                </View>
              )}
            </Formik>
          </Card>
          <Spacing size="24" />
        </Container>
      </Keyboard>
      {/* <FlatList
        data={dataTest}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      /> */}
    </Layout>
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
    borderColor: theme.colors.greyOutline,
  },
})

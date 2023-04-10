import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Field, Formik } from 'formik'
import { StyleSheet, Text, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler'
import { updateHostFamilyById } from 'src/client/HostFamily'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { HostFamilyRouteParams } from 'src/containers/Home/HostFamily/Router/type'
import { useGetAnimals } from 'src/hooks/Animal'
import { HostFamilyType } from 'src/types/HostFamily/Type'
import { startsWithVowel } from 'src/utils/Functions'
import { Card, Container } from './Styled'

export const HostFamilyUpdate = () => {
  const route = useRoute<RouteProp<HostFamilyRouteParams>>()
  const {
    params: { hostFamilyDetails },
  } = route as { params: { hostFamilyDetails: HostFamilyType } }
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()
  const { statusAnimal, animalData } = useGetAnimals()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues = {
    lastname: hostFamilyDetails.lastname,
    firstname: hostFamilyDetails.firstname,
    email: hostFamilyDetails.email,
    phone: hostFamilyDetails.phone,
    postalCode: hostFamilyDetails.postalCode,
    city: hostFamilyDetails.city,
    address: hostFamilyDetails.address,
    animalId: hostFamilyDetails.animalId,
    criteria: hostFamilyDetails.criteria,
    description: hostFamilyDetails.description,
    onBreak: hostFamilyDetails.onBreak,
  }

  const updateAnimal = (values) => {
    console.log('value', values)
    updateHostFamilyById(hostFamilyDetails.id, values)
    navigation.goBack()
  }

  const animalDataList = () => {
    let tab = []
    if (statusAnimal === 'success') {
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
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier le ${startsWithVowel(hostFamilyDetails.firstname)}`}
      />
      <Container>
        <Card>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              updateAnimal(values)
            }}
          >
            {({ handleChange, values, handleSubmit, handleBlur }) => (
              <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Nom de famille</Text>
                <Field name="lastname">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Veuillez mettre le nom de famille"
                      onChangeText={handleChange('lastname')}
                      onChange={handleChange('lastname')}
                      onBlur={handleBlur('lastname')}
                      value={values.lastname}
                    />
                  )}
                </Field>
                <Spacing size="8" />
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Prénom</Text>
                <Field name="firstname">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Veuillez mettre le prénom"
                      onChangeText={handleChange('firstname')}
                      onChange={handleChange('firstname')}
                      onBlur={handleBlur('firstname')}
                      value={values.firstname}
                    />
                  )}
                </Field>
                <Spacing size="8" />
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Adresse mail</Text>
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
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Téléphone</Text>
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
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Code postal</Text>
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
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Ville</Text>
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
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Adresse</Text>
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
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Critère</Text>
                <Field name="criteria">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Veuillez mettre la ville"
                      onChangeText={handleChange('criteria')}
                      onChange={handleChange('criteria')}
                      onBlur={handleBlur('criteria')}
                      value={values.criteria}
                    />
                  )}
                </Field>
                <Spacing size="8" />
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Description</Text>
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
                <Text style={{ fontSize: 15, marginBottom: 5 }}>En pause</Text>
                <Field name="onBreak">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Veuillez mettre la ville"
                      onChangeText={handleChange('onBreak')}
                      onChange={handleChange('onBreak')}
                      onBlur={handleBlur('onBreak')}
                      value={values.onBreak}
                    />
                  )}
                </Field>
                <Spacing size="8" />
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Animal recueilli</Text>
                <View style={{ width: '100%' }}>
                  <Field name="animalId">
                    {({ field }) => (
                      //MultipleSelectList
                      <SelectList
                        inputStyles={{ padding: 0 }}
                        boxStyles={{
                          width: '100%',
                          borderColor: theme.lightColors.greyOutline,
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
                <Spacing size="8" />
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

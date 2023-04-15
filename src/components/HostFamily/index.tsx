import { Field } from 'formik'
import { Button, Text, TextInput, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { theme } from 'src/constant/Theme'
import { useGetAnimals } from 'src/hooks/Animal'
import { FetchStatus } from 'src/types/Status'
import { styles } from '../Animal/Styled'
import { Spacing } from '../Layout/Spacing'
import { HostFamilyFormProps } from './Type'

export const HostFamilyProfile: React.FC<HostFamilyFormProps> = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  const { statusAnimal, animalData } = useGetAnimals()

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
    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Nom*</Text>
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Prénom*</Text>
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Adresse mail*</Text>
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Téléphone*</Text>
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Code postal*</Text>
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Ville*</Text>
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Adresse*</Text>
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
            placeholder="Veuillez mettre un critère"
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>En pause ?</Text>
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
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Animal recueilli</Text>
      <View style={{ width: '100%' }}>
        <Field name="animalId">
          {({ field }) => (
            //MultipleSelectList
            <SelectList
              inputStyles={{ padding: 0 }}
              boxStyles={{
                width: '100%',
                borderColor: theme.colors.greyOutline,
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
  )
}

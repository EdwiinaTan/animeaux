import { Field } from 'formik'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button } from 'react-native-elements'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { CheckBoxComponent } from 'src/containers/Home/Animal/Update/Checkbox'
import { useGetHostFamilies } from 'src/hooks/HostFamily'
import { useGetUsers } from 'src/hooks/User'
import {
  agreementArray,
  isSterilisedArray,
  placeCareArray,
  reasonArray,
  statusArray,
} from 'src/utils/Animal'

export const AddAnimalSituation: React.FC<AddAnimalProps> = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  const { statusHostFamilies, hostFamiliesData } = useGetHostFamilies()
  const { statusUsers, usersData } = useGetUsers()

  const hostFamiliesDataList = () => {
    let tab = []
    if (statusHostFamilies === 'success') {
      hostFamiliesData.map((hostFamily) => {
        tab.push({
          key: hostFamily.fields.id,
          value: `${hostFamily.fields.firstname} ${hostFamily.fields.lastname}`,
        })
      })
      return tab
    }
  }
  const usersDataList = () => {
    let tab = []
    if (statusUsers === 'success') {
      usersData.map(({ fields }) => {
        tab.push({
          key: fields.id,
          value: `${fields.firstname} ${fields.lastname}`,
        })
      })
      return tab
    }
  }

  return (
    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <Text>Statut</Text>
      <Spacing size="8" />
      {statusArray.map((status, key) => (
        <CheckBoxComponent
          key={`status_${key}`}
          animal={status}
          values={values.status}
          handleChange={() => handleChange('status')(status.value)}
        />
      ))}
      <Spacing size="8" />
      <Text>Prise en charge</Text>
      <Spacing size="8" />
      <Text>Famille d'accueil</Text>
      <View style={{ width: '100%' }}>
        <Field name="hostFamilyId">
          {({ field }) => (
            <SelectList
              inputStyles={{ padding: 0 }}
              boxStyles={{
                width: '100%',
                borderColor: theme.colors.greyOutline,
              }}
              {...field}
              searchPlaceholder="Rechercher"
              setSelected={handleChange('hostFamilyId')}
              onChange={handleChange('hostFamilyId')}
              data={hostFamiliesDataList()}
              placeholder="Veuillez choisir la famille d’accueil"
              save="key"
              value={values.hostFamilyId}
            />
          )}
        </Field>
      </View>
      <Spacing size="16" />
      <Text>Responsable</Text>
      <View style={{ width: '100%' }}>
        <Field name="userId">
          {({ field }) => (
            <SelectList
              inputStyles={{ padding: 0 }}
              boxStyles={{
                width: '100%',
                borderColor: theme.colors.greyOutline,
              }}
              {...field}
              searchPlaceholder="Rechercher"
              setSelected={handleChange('userId')}
              onChange={handleChange('userId')}
              data={usersDataList()}
              placeholder="Veuillez choisir l’utilisateur"
              save="key"
              value={values.userId}
            />
          )}
        </Field>
      </View>
      <Spacing size="8" />
      <Text>Lieu pris en charge</Text>
      <View style={{ width: '100%' }}>
        <Field name="placeCare">
          {({ field }) => (
            <SelectList
              inputStyles={{ padding: 0 }}
              boxStyles={{
                width: '100%',
                borderColor: theme.colors.greyOutline,
              }}
              {...field}
              searchPlaceholder="Rechercher"
              setSelected={handleChange('placeCare')}
              onChange={handleChange('placeCare')}
              data={placeCareArray}
              placeholder="Veuillez choisir l’endroit"
              save="value"
              value={values.placeCare}
            />
          )}
        </Field>
      </View>
      <Spacing size="8" />
      <Text>Raison</Text>
      <Spacing size="8" />
      {reasonArray.map((reason, key) => (
        <CheckBoxComponent
          key={`reason_${key}`}
          animal={reason}
          values={values.reason}
          handleChange={() => handleChange('reason')(reason.value)}
        />
      ))}
      <Spacing size="8" />
      <Text>L’animal est stérilisé ?</Text>
      <Spacing size="8" />
      {isSterilisedArray.map((isSterilised, key) => (
        <CheckBoxComponent
          key={`isSterilised_${key}`}
          animal={isSterilised}
          values={values.isSterilised}
          handleChange={() => handleChange('isSterilised')(isSterilised.value)}
        />
      ))}
      <Spacing size="8" />
      <Text>Entente</Text>
      <Spacing size="8" />
      <Text>Chien</Text>
      <Spacing size="8" />
      {agreementArray.map((dogAgreement, key) => (
        <CheckBoxComponent
          key={`dogAgreement_${key}`}
          animal={dogAgreement}
          values={values.dogAgreement}
          handleChange={() => handleChange('dogAgreement')(dogAgreement.value)}
        />
      ))}
      <Text>Chat</Text>
      <Spacing size="8" />
      {agreementArray.map((catAgreement, key) => (
        <CheckBoxComponent
          key={`catAgreement_${key}`}
          animal={catAgreement}
          values={values.catAgreement}
          handleChange={() => handleChange('catAgreement')(catAgreement.value)}
        />
      ))}
      <Text>Enfant</Text>
      <Spacing size="8" />
      {agreementArray.map((childAgreement, key) => (
        <CheckBoxComponent
          key={`childAgreement_${key}`}
          animal={childAgreement}
          values={values.childAgreement}
          handleChange={() => handleChange('childAgreement')(childAgreement.value)}
        />
      ))}
      <Spacing size="8" />
      <Text style={{ fontSize: 15, marginBottom: 5 }}>Description privée</Text>
      <Field name="privateDescription">
        {({ field }) => (
          <TextInput
            focusable
            {...field}
            editable
            multiline
            style={styles.input}
            onChangeText={handleChange('privateDescription')}
            onChange={handleChange('privateDescription')}
            onBlur={handleBlur('privateDescription')}
            value={values.privateDescription}
          />
        )}
      </Field>
      <Button title="Submit" onPress={() => handleSubmit()} />
    </View>
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

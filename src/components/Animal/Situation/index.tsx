import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { TextInput, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button } from 'react-native-elements'
import { CheckBoxComponent } from 'src/components/Animal/Checkbox'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body2, Title2, Title3 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetHostFamilies } from 'src/hooks/HostFamily'
import { useGetUsers } from 'src/hooks/User'
import {
  AnimalAgreement,
  AnimalPlaceCareEnum,
  AnimalReasonEnum,
  AnimalStatusEnum,
} from 'src/types/Animal/enum'
import { FetchStatus } from 'src/types/Status'
import { ContainerCheckbox, styles, TextRed } from '../Styled'

export const AnimalSituation: React.FC<AddAnimalProps> = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  renderDefaultOptionHostFamily,
  renderDefaultOptionUser,
  renderDefaultOptionPlace,
}) => {
  const { statusHostFamilies, hostFamiliesData } = useGetHostFamilies()
  const { statusUsers, usersData } = useGetUsers()
  const [optionHostFamily, setOptionHostFamily] = useState({})
  const [optionUser, setOptionUser] = useState({})
  const [optionPlace, setOptionPlace] = useState({})

  useEffect(() => {
    if (renderDefaultOptionHostFamily) {
      setOptionHostFamily({
        key: renderDefaultOptionHostFamily().key,
        value: renderDefaultOptionHostFamily().value,
      })
      setOptionUser({
        key: renderDefaultOptionUser().key,
        value: renderDefaultOptionUser().value,
      })
      setOptionPlace({
        key: renderDefaultOptionPlace().key,
        value: renderDefaultOptionPlace().value,
      })
    } else {
      setOptionHostFamily({ key: '', value: '' })
      setOptionUser({ key: '', value: '' })
      setOptionPlace({ key: '', value: '' })
    }
  }, [])

  const hostFamiliesDataList = () => {
    let hostFamilyArray = []
    if (statusHostFamilies === FetchStatus.SUCCESS) {
      hostFamiliesData.map((hostFamily) => {
        hostFamilyArray.push({
          key: hostFamily.fields.id,
          value: `${hostFamily.fields.firstname} ${hostFamily.fields.lastname}`,
        })
      })
      return hostFamilyArray
    }
  }
  const usersDataList = () => {
    let userArray = []
    if (statusUsers === FetchStatus.SUCCESS) {
      usersData.map(({ fields }) => {
        userArray.push({
          key: fields.id,
          value: `${fields.firstname} ${fields.lastname}`,
        })
      })
      return userArray
    }
  }

  const statusArray = Object.keys(AnimalStatusEnum).map((key) => ({
    label: AnimalStatusEnum[key],
    value: AnimalStatusEnum[key],
  }))

  const reasonArray = Object.keys(AnimalReasonEnum).map((key) => ({
    label: AnimalReasonEnum[key],
    value: AnimalReasonEnum[key],
  }))

  const agreementArray = Object.keys(AnimalAgreement).map((key) => ({
    label: AnimalAgreement[key],
    value: AnimalAgreement[key],
  }))

  const placeCareArray = Object.keys(AnimalPlaceCareEnum).map((key) => ({
    key: key,
    value: AnimalPlaceCareEnum[key],
  }))

  const isSterilisedArray = [
    { label: AnimalAgreement.YES, value: AnimalAgreement.YES },
    { label: AnimalAgreement.NO, value: AnimalAgreement.NO },
  ]

  return (
    <ContainerCheckbox>
      <Title3>
        Statut<TextRed>*</TextRed>
      </Title3>
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
      <Title2>Prise en charge</Title2>
      <Spacing size="8" />
      <Body2>Famille d'accueil</Body2>
      <View style={{ width: '100%' }}>
        <Field name="hostFamilyId">
          {({ field }) => (
            <SelectList
              inputStyles={{ padding: 0 }}
              boxStyles={{
                width: '100%',
                borderColor: theme.colors.grey0,
              }}
              {...field}
              searchPlaceholder="Rechercher"
              setSelected={handleChange('hostFamilyId')}
              onChange={handleChange('hostFamilyId')}
              data={hostFamiliesDataList()}
              defaultOption={optionHostFamily}
              placeholder="Veuillez choisir la famille d’accueil"
              save="key"
              value={values.hostFamilyId}
            />
          )}
        </Field>
      </View>
      <Spacing size="16" />
      <Body2>
        Responsable<TextRed>*</TextRed>
      </Body2>
      <View style={{ width: '100%' }}>
        <Field name="userId">
          {({ field }) => (
            <SelectList
              inputStyles={{ padding: 0 }}
              boxStyles={{
                width: '100%',
                borderColor: theme.colors.grey0,
              }}
              {...field}
              searchPlaceholder="Rechercher"
              setSelected={handleChange('userId')}
              onChange={handleChange('userId')}
              data={usersDataList()}
              defaultOption={optionUser}
              placeholder="Veuillez choisir l’utilisateur"
              save="key"
              value={values.userId}
            />
          )}
        </Field>
      </View>
      <Spacing size="16" />
      <Body2>
        Lieu pris en charge<TextRed>*</TextRed>
      </Body2>
      <View style={{ width: '100%' }}>
        <Field name="placeCare">
          {({ field }) => (
            <SelectList
              inputStyles={{ padding: 0 }}
              boxStyles={{
                width: '100%',
                borderColor: theme.colors.grey0,
              }}
              {...field}
              searchPlaceholder="Rechercher"
              setSelected={handleChange('placeCare')}
              onChange={handleChange('placeCare')}
              data={placeCareArray}
              defaultOption={optionPlace}
              placeholder="Veuillez choisir l’endroit"
              save="value"
              value={values.placeCare}
            />
          )}
        </Field>
      </View>
      <Spacing size="16" />
      <Body2>
        Raison<TextRed>*</TextRed>
      </Body2>
      <Spacing size="4" />
      {reasonArray.map((reason, key) => (
        <CheckBoxComponent
          key={`reason_${key}`}
          animal={reason}
          values={values.reason}
          handleChange={() => handleChange('reason')(reason.value)}
        />
      ))}
      <Spacing size="16" />
      <Body2>L’animal est stérilisé ?</Body2>
      <Spacing size="4" />
      {isSterilisedArray.map((isSterilised, key) => (
        <CheckBoxComponent
          key={`isSterilised_${key}`}
          animal={isSterilised}
          values={values.isSterilised}
          handleChange={() => handleChange('isSterilised')(isSterilised.value)}
        />
      ))}
      <Spacing size="8" />
      <Title2>Entente</Title2>
      <Spacing size="8" />
      <Body2>Chien</Body2>
      <Spacing size="8" />
      {agreementArray.map((dogAgreement, key) => (
        <CheckBoxComponent
          key={`dogAgreement_${key}`}
          animal={dogAgreement}
          values={values.dogAgreement}
          handleChange={() => handleChange('dogAgreement')(dogAgreement.value)}
        />
      ))}
      <Body2>Chat</Body2>
      <Spacing size="8" />
      {agreementArray.map((catAgreement, key) => (
        <CheckBoxComponent
          key={`catAgreement_${key}`}
          animal={catAgreement}
          values={values.catAgreement}
          handleChange={() => handleChange('catAgreement')(catAgreement.value)}
        />
      ))}
      <Body2>Enfant</Body2>
      <Spacing size="8" />
      {agreementArray.map((childAgreement, key) => (
        <CheckBoxComponent
          key={`childAgreement_${key}`}
          animal={childAgreement}
          values={values.childAgreement}
          handleChange={() => handleChange('childAgreement')(childAgreement.value)}
        />
      ))}
      <Spacing size="16" />
      <Body2>Description privée</Body2>
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
            placeholder={'Veuillez mettre une description privée'}
            value={values.privateDescription}
          />
        )}
      </Field>
      <Spacing size="16" />
      <Button title="Submit" onPress={() => handleSubmit()} />
    </ContainerCheckbox>
  )
}

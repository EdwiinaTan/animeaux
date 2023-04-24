import { CalendarSvg } from 'assets/svg/calendar'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { Modal, TextInput, TouchableOpacity, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button } from 'react-native-elements'
import { CheckBoxComponent } from 'src/components/Form/Animal/Checkbox'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body2, Body3, Title2 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { CardStyle, TextLine, TextRed } from 'src/constant/Theme/Styled'
import { AddAnimalProps } from 'src/containers/Home/NewProfile/Animal/Type'
import { useGetHostFamilies } from 'src/hooks/HostFamily'
import { useGetUsers } from 'src/hooks/User'
import {
  AnimalAgreement,
  AnimalPlaceCareEnum,
  AnimalReasonEnum,
  AnimalStatusEnum,
} from 'src/types/Animal/enum'
import { FetchStatus } from 'src/types/Status'
import { ContainerCalendar, ContainerCheckbox, style, styles } from '../Styled'

export const AnimalSituation: React.FC<AddAnimalProps> = ({
  field,
  renderDefaultOptionHostFamily,
  renderDefaultOptionUser,
  renderDefaultOptionPlace,
}) => {
  const { statusHostFamilies, hostFamiliesData } = useGetHostFamilies()
  const { statusUsers, usersData } = useGetUsers()
  const [optionHostFamily, setOptionHostFamily] = useState({})
  const [optionUser, setOptionUser] = useState({})
  const [optionPlace, setOptionPlace] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const { handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue, values } = field

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
          value: `${hostFamily.fields.firstName} ${hostFamily.fields.lastName}`,
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
          value: `${fields.firstName} ${fields.lastName}`,
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

  const handleDateSelect = (day) => {
    setFieldValue('dateAssigned', day.dateString)
    setModalVisible(false)
  }

  return (
    <>
      <CardStyle>
        <Title2>
          <TextLine>1. Condition</TextLine>
        </Title2>
        <Spacing size="8" />
        <Body2>
          Statut<TextRed>*</TextRed>
        </Body2>
        <Spacing size="8" />
        <ContainerCheckbox>
          {statusArray.map((status, key) => (
            <CheckBoxComponent
              key={`status_${key}`}
              animal={status}
              values={values.status}
              handleChange={() => handleChange('status')(status.value)}
            />
          ))}
        </ContainerCheckbox>
        {errors.status && touched.status && (
          <>
            <Spacing size="4" />
            <Body3 color={theme.colors.red}>{errors.status}</Body3>
          </>
        )}
      </CardStyle>
      <Spacing size="16" />
      <CardStyle>
        <Title2>
          <TextLine>2. Prise en charge</TextLine>
        </Title2>
        <Spacing size="8" />
        <Body2>Famille d'accueil</Body2>
        <Spacing size="4" />
        <View>
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
        <Spacing size="4" />
        <View>
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
          {errors.userId && touched.userId && (
            <Body3 color={theme.colors.red}>{errors.userId}</Body3>
          )}
        </View>
        <Spacing size="16" />
        <Body2>
          Lieu pris en charge<TextRed>*</TextRed>
        </Body2>
        <Spacing size="4" />
        <View>
          <Field name="placeAssigned">
            {({ field }) => (
              <SelectList
                inputStyles={{ padding: 0 }}
                boxStyles={{
                  width: '100%',
                  borderColor: theme.colors.grey0,
                }}
                {...field}
                searchPlaceholder="Rechercher"
                setSelected={handleChange('placeAssigned')}
                onChange={handleChange('placeAssigned')}
                data={placeCareArray}
                defaultOption={optionPlace}
                placeholder="Veuillez choisir l’endroit"
                save="value"
                value={values.placeAssigned}
              />
            )}
          </Field>
          {errors.placeAssigned && touched.placeAssigned && (
            <Body3 color={theme.colors.red}>{errors.placeAssigned}</Body3>
          )}
        </View>
        <Spacing size="16" />
        <View>
          <Body2>
            Date de prise en charge<TextRed>*</TextRed>
          </Body2>
          <Spacing size="4" />
          <ContainerCalendar>
            <Field name="dateAssigned">
              {({ field }) => (
                <>
                  <TextInput
                    {...field}
                    style={styles.inputDate}
                    editable={false}
                    placeholder="Date de prise en charge"
                    value={values.dateAssigned}
                  />
                  <Modal visible={modalVisible} transparent={true} animationType="slide">
                    <View style={style.centeredView}>
                      <View style={style.modalView}>
                        <Calendar
                          onDayPress={handleDateSelect}
                          hideExtraDays
                          markedDates={{
                            [values.dateAssigned]: {
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
          {errors.dateAssigned && touched.dateAssigned && (
            <Body3 color={theme.colors.red}>{errors.dateAssigned}</Body3>
          )}
        </View>
        <Spacing size="16" />
        <Body2>
          Raison<TextRed>*</TextRed>
        </Body2>
        <Spacing size="4" />
        <ContainerCheckbox>
          {reasonArray.map((reason, key) => (
            <CheckBoxComponent
              key={`reason_${key}`}
              animal={reason}
              values={values.reason}
              handleChange={() => handleChange('reason')(reason.value)}
            />
          ))}
        </ContainerCheckbox>
        {errors.reason && touched.reason && <Body3 color={theme.colors.red}>{errors.reason}</Body3>}
      </CardStyle>
      <Spacing size="16" />
      <CardStyle>
        <Title2>
          <TextLine>3. Entente</TextLine>
        </Title2>
        <Spacing size="8" />
        <Body2>
          Chien<TextRed>*</TextRed>
        </Body2>
        <ContainerCheckbox>
          {agreementArray.map((dogAgreement, key) => (
            <CheckBoxComponent
              key={`dogAgreement_${key}`}
              animal={dogAgreement}
              values={values.dogAgreement}
              handleChange={() => handleChange('dogAgreement')(dogAgreement.value)}
            />
          ))}
        </ContainerCheckbox>
        {errors.dogAgreement && touched.dogAgreement && (
          <Body3>
            <TextRed>{errors.dogAgreement}</TextRed>
          </Body3>
        )}
        <Spacing size="16" />
        <Body2>
          Chat<TextRed>*</TextRed>
        </Body2>
        <ContainerCheckbox>
          {agreementArray.map((catAgreement, key) => (
            <CheckBoxComponent
              key={`catAgreement_${key}`}
              animal={catAgreement}
              values={values.catAgreement}
              handleChange={() => handleChange('catAgreement')(catAgreement.value)}
            />
          ))}
        </ContainerCheckbox>
        {errors.catAgreement && touched.catAgreement && (
          <Body3>
            <TextRed>{errors.catAgreement}</TextRed>
          </Body3>
        )}
        <Spacing size="16" />
        <Body2>
          Enfant<TextRed>*</TextRed>
        </Body2>
        <ContainerCheckbox>
          {agreementArray.map((childAgreement, key) => (
            <CheckBoxComponent
              key={`childAgreement_${key}`}
              animal={childAgreement}
              values={values.childAgreement}
              handleChange={() => handleChange('childAgreement')(childAgreement.value)}
            />
          ))}
        </ContainerCheckbox>
        {errors.childAgreement && touched.childAgreement && (
          <Body3>
            <TextRed>{errors.childAgreement}</TextRed>
          </Body3>
        )}
      </CardStyle>
      <Spacing size="16" />
      <CardStyle>
        <Title2>
          <TextLine>4. Descriptif</TextLine>
        </Title2>
        <Spacing size="8" />
        <Body2>
          L’animal est stérilisé ?<TextRed>*</TextRed>
        </Body2>
        <ContainerCheckbox>
          {agreementArray.map((isSterilized, key) => (
            <CheckBoxComponent
              key={`isSterilized_${key}`}
              animal={isSterilized}
              values={values.isSterilized}
              handleChange={() => handleChange('isSterilized')(isSterilized.value)}
            />
          ))}
        </ContainerCheckbox>
        {errors.isSterilized && touched.isSterilized && (
          <Body3>
            <TextRed>{errors.isSterilized}</TextRed>
          </Body3>
        )}
        <Spacing size="16" />
        <Body2>Description privée</Body2>
        <Spacing size="4" />
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
      </CardStyle>
      <Spacing size="16" />
      <Button title="Valider" onPress={() => handleSubmit()} />
    </>
  )
}

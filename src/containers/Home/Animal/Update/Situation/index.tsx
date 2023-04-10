import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Field, Formik } from 'formik'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Button } from 'react-native-elements'
import { updateAnimalById } from 'src/client/Animal'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { useGetHostFamilies, useGetHostFamilyById } from 'src/hooks/HostFamily'
import { useGetUserById, useGetUsers } from 'src/hooks/User'
import {
  AnimalAgreement,
  AnimalPlaceCareEnum,
  AnimalReasonEnum,
  AnimalStatusEnum,
} from 'src/types/Animal/enum'
import { AnimalType } from 'src/types/Animal/Type'
import { AnimalRouteParams } from '../../Router/type'
import { CheckBoxComponent } from '../Checkbox'
import { Card, Container } from './Styled'

export const UpdateAnimalSituation = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()
  const { statusHostFamily, hostFamilyData } = useGetHostFamilyById(animalDetails.hostFamilyId)
  const { statusHostFamilies, hostFamiliesData } = useGetHostFamilies()
  const { statusUsers, usersData } = useGetUsers()
  const { statusUser, userData } = useGetUserById(animalDetails.userId)

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues = {
    hostFamilyId: animalDetails.hostFamilyId,
    status: animalDetails.status,
    placeCare: animalDetails.placeCare,
    reason: animalDetails.reason,
    childAgreement: animalDetails.childAgreement,
    catAgreement: animalDetails.catAgreement,
    dogAgreement: animalDetails.dogAgreement,
    userId: animalDetails.userId,
    privateDescription: animalDetails.privateDescription,
    isSterilised: animalDetails.isSterilised ? 'Oui' : 'Non',
  }

  const statusArray = [
    { label: 'Adopté', value: AnimalStatusEnum.ADOPTE },
    { label: 'Décédé', value: AnimalStatusEnum.DECEDE },
    { label: 'Libre', value: AnimalStatusEnum.LIBRE },
    { label: 'Adoptable', value: AnimalStatusEnum.ADOPTABLE },
    { label: 'Réservable', value: AnimalStatusEnum.RESERVABLE },
    { label: 'Indisponible', value: AnimalStatusEnum.INDISPONIBLE },
    { label: 'Réservé', value: AnimalStatusEnum.RESERVE },
  ]

  const reasonArray = [
    { label: 'Décès du propriétaire', value: AnimalReasonEnum.DECES_DU_PROPRIETAIRE },
    { label: 'Abandon', value: AnimalReasonEnum.ABANDON },
    { label: 'Maltraitance', value: AnimalReasonEnum.MALTRAITANCE },
    { label: 'Errance', value: AnimalReasonEnum.ERRANCE },
    { label: 'Autre raison', value: AnimalReasonEnum.AUTRE_RAISON },
  ]

  const agreementArray = [
    { label: 'Oui', value: AnimalAgreement.YES },
    { label: 'Non', value: AnimalAgreement.NO },
    { label: 'Inconnu', value: AnimalAgreement.UNKNOW },
  ]

  const placeCareArray = [
    {
      key: AnimalPlaceCareEnum.BAILLY_ROMAINVILLIERS,
      value: AnimalPlaceCareEnum.BAILLY_ROMAINVILLIERS,
    },
    {
      key: AnimalPlaceCareEnum.BARCY,
      value: AnimalPlaceCareEnum.BARCY,
    },
    {
      key: AnimalPlaceCareEnum.BEAUMONT_DU_GATINAIS,
      value: AnimalPlaceCareEnum.BEAUMONT_DU_GATINAIS,
    },
    {
      key: AnimalPlaceCareEnum.CHATENEY_SUR_SEINE,
      value: AnimalPlaceCareEnum.CHATENEY_SUR_SEINE,
    },
    {
      key: AnimalPlaceCareEnum.CONGIS_SUR_THEROUANNE,
      value: AnimalPlaceCareEnum.CONGIS_SUR_THEROUANNE,
    },
    {
      key: AnimalPlaceCareEnum.COUILLY_PONT_AUX_DAMES,
      value: AnimalPlaceCareEnum.COUILLY_PONT_AUX_DAMES,
    },
    { key: AnimalPlaceCareEnum.FAREMOUTIERS, value: AnimalPlaceCareEnum.FAREMOUTIERS },
    { label: AnimalPlaceCareEnum.JOSSIGNY, value: AnimalPlaceCareEnum.JOSSIGNY },
    {
      key: AnimalPlaceCareEnum.LA_FERTE_SOUS_JOUARRE,
      value: AnimalPlaceCareEnum.LA_FERTE_SOUS_JOUARRE,
    },
    {
      key: AnimalPlaceCareEnum.LA_PLESSIS_BELLEVILLE,
      value: AnimalPlaceCareEnum.LA_PLESSIS_BELLEVILLE,
    },
    { key: AnimalPlaceCareEnum.LAGNY_SUR_MARNE, value: AnimalPlaceCareEnum.LAGNY_SUR_MARNE },
    { key: AnimalPlaceCareEnum.LIZY_SUR_OURCQ, value: AnimalPlaceCareEnum.LIZY_SUR_OURCQ },
    { key: AnimalPlaceCareEnum.LOGNES, value: AnimalPlaceCareEnum.LOGNES },
    { key: AnimalPlaceCareEnum.MAREUIL_LES_MEAUX, value: AnimalPlaceCareEnum.MAREUIL_LES_MEAUX },
    { key: AnimalPlaceCareEnum.MEAUX, value: AnimalPlaceCareEnum.MEAUX },
    { key: AnimalPlaceCareEnum.MORTERY, value: AnimalPlaceCareEnum.MORTERY },
    {
      key: AnimalPlaceCareEnum.NANTEUIL_LES_MEAUX,
      value: AnimalPlaceCareEnum.NANTEUIL_LES_MEAUX,
    },
    { key: AnimalPlaceCareEnum.NOISY_LE_GRAND, value: AnimalPlaceCareEnum.NOISY_LE_GRAND },
    { key: AnimalPlaceCareEnum.PARIS, value: AnimalPlaceCareEnum.PARIS },
    { key: AnimalPlaceCareEnum.POINCY, value: AnimalPlaceCareEnum.POINCY },
    { key: AnimalPlaceCareEnum.PROVINS, value: AnimalPlaceCareEnum.PROVINS },
    { key: AnimalPlaceCareEnum.SAINT_PATHUS, value: AnimalPlaceCareEnum.SAINT_PATHUS },
    {
      key: AnimalPlaceCareEnum.SOIGNOLLES_EN_BRIE,
      value: AnimalPlaceCareEnum.SOIGNOLLES_EN_BRIE,
    },
    { key: AnimalPlaceCareEnum.TORCY, value: AnimalPlaceCareEnum.TORCY },
    { key: AnimalPlaceCareEnum.VILLENOY, value: AnimalPlaceCareEnum.VILLENOY },
  ]

  const isSterilisedArray = [
    { label: 'Oui', value: 'Oui' },
    { label: 'Non', value: 'Non' },
  ]

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

  const renderDefaultOptionHostFamily = () => {
    if (statusHostFamily === 'success') {
      return {
        key: hostFamilyData.id,
        value: `${hostFamilyData.firstname} ${hostFamilyData.lastname}`,
      }
    }
  }

  const renderDefaultOptionUser = () => {
    if (statusUser === 'success') {
      return {
        key: userData.id,
        value: `${userData.firstname} ${userData.lastname}`,
      }
    }
  }

  const updateAnimal = (values) => {
    updateAnimalById(animalDetails.id, values)
    navigation.goBack()
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier la situation de ${animalDetails.name}`}
      />
      <Container>
        <Card>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={(values) => updateAnimal(values)}
          >
            {({ handleChange, values, handleSubmit, handleBlur }) => (
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
                        boxStyles={{ width: '100%', borderColor: theme.lightColors.greyOutline }}
                        {...field}
                        searchPlaceholder="Rechercher"
                        setSelected={handleChange('hostFamilyId')}
                        onChange={handleChange('hostFamilyId')}
                        data={hostFamiliesDataList()}
                        placeholder="Veuillez choisir la famille d’accueil"
                        defaultOption={renderDefaultOptionHostFamily()}
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
                        boxStyles={{ width: '100%', borderColor: theme.lightColors.greyOutline }}
                        {...field}
                        searchPlaceholder="Rechercher"
                        setSelected={handleChange('userId')}
                        onChange={handleChange('userId')}
                        data={usersDataList()}
                        placeholder="Veuillez choisir l’utilisateur"
                        defaultOption={renderDefaultOptionUser()}
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
                        boxStyles={{ width: '100%', borderColor: theme.lightColors.greyOutline }}
                        {...field}
                        searchPlaceholder="Rechercher"
                        setSelected={handleChange('placeCare')}
                        onChange={handleChange('placeCare')}
                        data={placeCareArray}
                        placeholder="Veuillez choisir l'endroit"
                        defaultOption={{
                          key: animalDetails.placeCare,
                          value: animalDetails.placeCare,
                        }}
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
                <Text>{animalDetails.name} est stérilisé ?</Text>
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

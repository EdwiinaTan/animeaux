import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import { Text, View } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { IconMaterialCommunityIcons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import {
  AnimalAgreement,
  AnimalGenderEnum,
  AnimalReasonEnum,
  AnimalStatusEnum,
  AnimalTypeEnum,
} from 'src/types/Animal/enum'
import { AnimalType } from 'src/types/Animal/Type'
import { startsWithVowel } from 'src/utils/Functions'
import { AnimalRouteParams } from '../../Router/type'
import { Card, Container } from './Styled'

export const AnimalUpdate = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()

  // const validationSchema = Yup.object().shape({
  //   radioValue: Yup.number().required('Veuillez sélectionner une option'),
  // })

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues = {
    animal: animalDetails.species,
    gender: animalDetails.gender,
    status: animalDetails.status,
    reason: animalDetails.reason,
    dogAgreement: animalDetails.dogAgreement,
    catAgreement: animalDetails.catAgreement,
    childAgreement: animalDetails.childAgreement,
  }

  const animals = [
    { label: 'Chien', value: AnimalTypeEnum.DOG, icon: 'dog' },
    { label: 'Chat', value: AnimalTypeEnum.CAT, icon: 'cat' },
    { label: 'Rongeur', value: AnimalTypeEnum.RONDENT, icon: 'rabbit' },
    { label: 'Oiseau', value: AnimalTypeEnum.BIRD, icon: 'bird' },
    { label: 'Reptile', value: AnimalTypeEnum.REPTILE, icon: 'snake' },
  ]

  const genderArray = [
    { label: 'Male', value: AnimalGenderEnum.MALE, icon: 'male' },
    { label: 'Femelle', value: AnimalGenderEnum.FEMALE, icon: 'female' },
  ]

  const statusArray = [
    { label: 'Adopté', value: AnimalStatusEnum.ADOPTE },
    { label: 'Décédé', value: AnimalStatusEnum.DECEDE },
    { label: 'Libre', value: AnimalStatusEnum.LIBRE },
    { label: 'Adoptable', value: AnimalStatusEnum.ADOPTABLE },
    { label: 'Réservable', value: AnimalStatusEnum.RESERVABLE },
    { label: 'Indisponible', value: AnimalStatusEnum.INDISPONIBLE },
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
            // validationSchema={validationSchema}
            onSubmit={(values) => console.log('submit: ', values)}
          >
            {({ handleChange, values, handleSubmit }) => (
              <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text>Espèce</Text>
                <Spacing size="8" />
                {animals.map((animal) => (
                  <CheckBox
                    center
                    containerStyle={{
                      backgroundColor: theme.lightColors?.white,
                      paddingRight: 0,
                      marginRight: 0,
                    }}
                    key={animal.value}
                    title={animal.label}
                    checkedIcon={
                      <IconMaterialCommunityIcons
                        name={animal.icon}
                        size={18}
                        color={theme.lightColors.grey0}
                      />
                    }
                    uncheckedIcon={
                      <IconMaterialCommunityIcons name={animal.icon} size={18} color="grey" />
                    }
                    checked={values.animal === animal.value}
                    onPress={() => handleChange('animal')(animal.value)}
                  />
                ))}
                <Spacing size="24" />
                <Text>Genre</Text>
                <Spacing size="8" />
                {genderArray.map((gender) => (
                  <CheckBox
                    center
                    containerStyle={{
                      backgroundColor: theme.lightColors?.white,
                      paddingRight: 0,
                      marginRight: 0,
                    }}
                    key={gender.value}
                    title={gender.label}
                    checkedColor={theme.lightColors.grey0}
                    checked={values.gender === gender.value}
                    onPress={() => handleChange('gender')(gender.value)}
                  />
                ))}
                <Spacing size="24" />
                <Text>Status</Text>
                <Spacing size="8" />
                {statusArray.map((status) => (
                  <CheckBox
                    center
                    containerStyle={{
                      backgroundColor: theme.lightColors?.white,
                      paddingRight: 0,
                      marginRight: 0,
                    }}
                    key={status.value}
                    title={status.label}
                    checked={values.status === status.value}
                    checkedColor={theme.lightColors.grey0}
                    onPress={() => handleChange('status')(status.value)}
                  />
                ))}
                <Spacing size="24" />
                <Text>Raison</Text>
                <Spacing size="8" />
                {reasonArray.map((reason) => (
                  <CheckBox
                    center
                    containerStyle={{
                      backgroundColor: theme.lightColors?.white,
                      paddingRight: 0,
                      marginRight: 0,
                    }}
                    key={reason.value}
                    title={reason.label}
                    checked={values.reason === reason.value}
                    checkedColor={theme.lightColors.grey0}
                    onPress={() => handleChange('reason')(reason.value)}
                  />
                ))}
                <Spacing size="24" />
                <Text>Entente</Text>
                <Spacing size="8" />
                <Text>Chien</Text>
                <Spacing size="8" />
                {agreementArray.map((agreement) => (
                  <CheckBox
                    center
                    containerStyle={{
                      backgroundColor: theme.lightColors?.white,
                      paddingRight: 0,
                      marginRight: 0,
                    }}
                    key={agreement.value}
                    title={agreement.label}
                    checked={values.dogAgreement === agreement.value}
                    checkedColor={theme.lightColors.grey0}
                    onPress={() => handleChange('dogAgreement')(agreement.value)}
                  />
                ))}
                <Text>Chat</Text>
                <Spacing size="8" />
                {agreementArray.map((agreement) => (
                  <CheckBox
                    center
                    containerStyle={{
                      backgroundColor: theme.lightColors?.white,
                      paddingRight: 0,
                      marginRight: 0,
                    }}
                    key={agreement.value}
                    title={agreement.label}
                    checked={values.catAgreement === agreement.value}
                    checkedColor={theme.lightColors.grey0}
                    onPress={() => handleChange('catAgreement')(agreement.value)}
                  />
                ))}
                <Text>Enfant</Text>
                <Spacing size="8" />
                {agreementArray.map((agreement) => (
                  <CheckBox
                    center
                    containerStyle={{
                      backgroundColor: theme.lightColors?.white,
                      paddingRight: 0,
                      marginRight: 0,
                    }}
                    key={agreement.value}
                    title={agreement.label}
                    checked={values.childAgreement === agreement.value}
                    checkedColor={theme.lightColors.grey0}
                    onPress={() => handleChange('childAgreement')(agreement.value)}
                  />
                ))}
                <Spacing size="24" />
                <Button title="Submit" onPress={() => handleSubmit()} />
              </View>
            )}
          </Formik>
        </Card>
      </Container>
    </Layout>
  )
}

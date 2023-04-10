import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet, Text } from 'react-native'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { HostFamilyRouteParams } from 'src/containers/Home/HostFamily/Router/type'
import {
  AnimalColorEnum,
  AnimalGenderEnum,
  AnimalRaceEnum,
  AnimalTypeEnum,
} from 'src/types/Animal/enum'
import { HostFamilyType } from 'src/types/HostFamily/Type'
import { startsWithVowel } from 'src/utils/Functions'
import * as Yup from 'yup'
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
export const HostFamilyUpdate = () => {
  const route = useRoute<RouteProp<HostFamilyRouteParams>>()
  const {
    params: { hostFamilyDetails },
  } = route as { params: { hostFamilyDetails: HostFamilyType } }
  const navigation = useNavigation<NativeStackNavigationProp<HostFamilyRouteParams>>()

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Le nom doit contenir au moins 1 caractère')
      .required('Le nom est requis'),
    alias: Yup.string().min(1, 'L’alias doit contenir au moins 1 caractère'),
  })

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const initialValues = {}

  // const initialValues: AnimalRequest = {
  //   species: animalDetails.species,
  //   gender: animalDetails.gender,
  //   name: animalDetails.name,
  //   alias: animalDetails.alias,
  //   icadNumber: animalDetails.icadNumber,
  //   race: animalDetails.race,
  //   color: animalDetails.color,
  //   publicDescription: animalDetails.publicDescription,
  // }

  // const updateAnimal = (values: AnimalRequest) => {
  //   updateAnimalByIdTest(animalDetails.id, values)
  //   navigation.goBack()
  // }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier le ${startsWithVowel(hostFamilyDetails.firstname)}`}
      />
      <Container>
        <Card>
          <Text>Coucouuuu</Text>
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

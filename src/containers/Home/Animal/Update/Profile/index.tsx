import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { AnimalType } from 'src/types/Animal/Type'
import { startsWithVowel } from 'src/utils/Functions'
import { AnimalRouteParams } from '../../Router/type'
import { ButtonGroupAnimal } from '../Filter'
import { ButtonGender } from '../Filter/GenderItem'
import { ButtonReason } from '../Filter/ReasonItem'
import { ButtonSpecies } from '../Filter/SpeciesItem'
import { ButtonStatus } from '../Filter/StatusItem'
import { Card, Container } from './Styled'

export const AnimalUpdate = () => {
  const route = useRoute<RouteProp<AnimalRouteParams>>()
  const {
    params: { animalDetails },
  } = route as { params: { animalDetails: AnimalType } }
  const navigation = useNavigation<NativeStackNavigationProp<AnimalRouteParams>>()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  return (
    <Layout>
      <HeaderComponent
        onClickGoBack={onClickGoBack}
        title={`Modifier le ${startsWithVowel(animalDetails.name)}`}
      />
      <Container>
        <Card>
          <ButtonGroupAnimal title="Espèce" animalTest={<ButtonSpecies animal={animalDetails} />} />
          <ButtonGroupAnimal title="Genre" animalTest={<ButtonGender animal={animalDetails} />} />
          <ButtonGroupAnimal title="Status" animalTest={<ButtonStatus animal={animalDetails} />} />
          <ButtonGroupAnimal title="Raison" animalTest={<ButtonReason animal={animalDetails} />} />
        </Card>
      </Container>
    </Layout>
  )
}

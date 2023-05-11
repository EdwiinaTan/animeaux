import { ActivityIndicator, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { BarChartComponent } from 'src/components/Chart/BarChart'
import { LineChartComponent } from 'src/components/Chart/LineChart'
import { PieChartComponent } from 'src/components/Chart/PieChart'
import { ProgressChartComponent } from 'src/components/Chart/ProgressChart'
import { Spacing } from 'src/components/Layout/Spacing'
import { Title2 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { CardStyle, ContainerStyle } from 'src/constant/Theme/Styled'
import { FetchStatus } from 'src/types/Status'
import { StatisticsProps } from './Type'
import { getLabelDataReduce } from './Utils'

export const Statistics: React.FC<StatisticsProps> = ({
  status,
  animalData,
  formInscriptionData,
}) => {
  const labelDataSpecies = getLabelDataReduce(animalData, 'species')
  const labelDataGender = getLabelDataReduce(animalData, 'gender')
  const labelDataStatus = getLabelDataReduce(animalData, 'status')
  const labelDataReason = getLabelDataReduce(animalData, 'reason')

  const labelDataVehicle = getLabelDataReduce(formInscriptionData, 'vehicle')
  const labelDataResidence = getLabelDataReduce(formInscriptionData, 'residence')
  const labelDataResidenceType = getLabelDataReduce(formInscriptionData, 'residenceType')
  const labelDataGarden = getLabelDataReduce(formInscriptionData, 'garden')
  const labelDataBalcony = getLabelDataReduce(formInscriptionData, 'balcony')
  const labelDataHasChild = getLabelDataReduce(formInscriptionData, 'hasChild')
  const labelDataHasAnimal = getLabelDataReduce(formInscriptionData, 'hasAnimal')
  const labelDataHasEducKnowledge = getLabelDataReduce(formInscriptionData, 'educationalKnowledge')
  const labelDataAllergy = getLabelDataReduce(formInscriptionData, 'allergy')
  const labelDataAbsence = getLabelDataReduce(formInscriptionData, 'absenceHours')

  if (status === FetchStatus.LOADING) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.blue} />
      </View>
    )
  }

  return (
    <ContainerStyle>
      <CardStyle>
        <Title2>Sur les {animalData.length} animaux</Title2>
        <BarChartComponent title="Espèce" data={labelDataSpecies} />
        <Spacing size="16" />
        <Divider width={2} color={theme.colors.greyOutline} />
        <PieChartComponent title="Genre" data={labelDataGender} noLeft />
        <Divider width={2} color={theme.colors.greyOutline} />
        <ProgressChartComponent
          title="Statut"
          data={labelDataStatus}
          lengthAnimal={animalData.length}
        />
        <Divider width={2} color={theme.colors.greyOutline} />
        <ProgressChartComponent
          title="Raison"
          data={labelDataReason}
          lengthAnimal={animalData.length}
        />
      </CardStyle>
      <Spacing size="32" />
      <CardStyle>
        <Title2>
          Sur les {formInscriptionData.length} réponses fournies pour être famille d'accueil
        </Title2>
        <Spacing size="8" />
        <BarChartComponent title="Type de résidence" data={labelDataResidenceType} />
        <Spacing size="16" />
        <Divider width={2} color={theme.colors.greyOutline} />
        <PieChartComponent title="Véhiculé" data={labelDataVehicle} />
        <Divider width={2} color={theme.colors.greyOutline} />
        <LineChartComponent title="Résidence" data={labelDataResidence} />
        <Spacing size="16" />
        <Divider width={2} color={theme.colors.greyOutline} />
        <PieChartComponent title="Jardin" data={labelDataGarden} />
        <Divider width={2} color={theme.colors.greyOutline} />
        <PieChartComponent title="Balcon" data={labelDataBalcony} />
        <Divider width={2} color={theme.colors.greyOutline} />
        <PieChartComponent title="Enfants" data={labelDataHasChild} />
        <Divider width={2} color={theme.colors.greyOutline} />
        <BarChartComponent title="Nombre d'heures d'absence" data={labelDataAbsence} suffix="h" />
        <Spacing size="16" />
        <Divider width={2} color={theme.colors.greyOutline} />
        <PieChartComponent title="Possession d'animaux" data={labelDataHasAnimal} />
        <Divider width={2} color={theme.colors.greyOutline} />
        <PieChartComponent title="Connaissance en animal" data={labelDataHasEducKnowledge} />
        <Divider width={2} color={theme.colors.greyOutline} />
        <PieChartComponent title="Allergie" data={labelDataAllergy} />
      </CardStyle>
      <Spacing size="16" />
    </ContainerStyle>
  )
}

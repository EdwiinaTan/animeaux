import { ActivityIndicator, useWindowDimensions } from 'react-native'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { Divider } from 'react-native-elements'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1, Title2 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetAnimals } from 'src/hooks/Animal'
import { useGetFormInscriptions } from 'src/hooks/FormInscription'
import { FetchStatus } from 'src/types/Status'
import { Card, Container } from './Styled'
import { chartConfig, dataBarChart, dataPieChart, labelDate } from './Utils'

export const Information = (): React.ReactElement => {
  const { width } = useWindowDimensions()
  const newWidth = width - 64
  const { statusAnimal, animalData } = useGetAnimals()
  const { statusFormInscription, formInscriptionData } = useGetFormInscriptions()

  if (statusAnimal === FetchStatus.LOADING || statusFormInscription === FetchStatus.LOADING) {
    return <ActivityIndicator size="large" color={theme.colors.blue} />
  }

  const labelDataSpecies = animalData.reduce((accumulator, { fields: { species } }) => {
    if (!accumulator[species]) {
      accumulator[species] = 1
    } else {
      accumulator[species]++
    }
    return accumulator
  }, {})

  const labelDataGender = animalData.reduce((accumulator, { fields: { gender } }) => {
    if (!accumulator[gender]) {
      accumulator[gender] = 1
    } else {
      accumulator[gender]++
    }
    return accumulator
  }, {})

  const labelDataStatus = animalData.reduce((accumulator, { fields: { status } }) => {
    if (!accumulator[status]) {
      accumulator[status] = 1
    } else {
      accumulator[status]++
    }
    return accumulator
  }, {})

  const labelDataReason = animalData.reduce((accumulator, { fields: { reason } }) => {
    if (!accumulator[reason]) {
      accumulator[reason] = 1
    } else {
      accumulator[reason]++
    }
    return accumulator
  }, {})

  const labelDataResidenceType = formInscriptionData.reduce(
    (accumulator, { fields: { residenceType } }) => {
      if (!accumulator[residenceType]) {
        accumulator[residenceType] = 1
      } else {
        accumulator[residenceType]++
      }
      return accumulator
    },
    {}
  )

  const labelDataVehicle = formInscriptionData.reduce((accumulator, { fields: { vehicle } }) => {
    if (!accumulator[vehicle]) {
      accumulator[vehicle] = 1
    } else {
      accumulator[vehicle]++
    }
    return accumulator
  }, {})

  return (
    <Layout>
      <HeaderComponent title="Information" />
      <Container>
        <Card>
          <Title2>Sur les {animalData.length} animaux</Title2>
          <Spacing size="8" />
          <Body1>Espèce</Body1>
          <Spacing size="4" />
          <BarChart
            data={dataBarChart(labelDate(labelDataSpecies).label, labelDate(labelDataSpecies).data)}
            width={newWidth}
            height={220}
            fromNumber={8}
            fromZero={true}
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=""
          />
          <Spacing size="16" />
          <Divider />
          <Spacing size="16" />
          <Body1>Genre </Body1>
          <Spacing size="4" />
          <PieChart
            data={dataPieChart(labelDataGender)}
            width={newWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="item"
            backgroundColor="transparent"
            paddingLeft="8"
            // absolute
          />
          <Spacing size="16" />
          <Divider />
          <Spacing size="16" />
          <Body1>Statut</Body1>
          <Spacing size="4" />
          <PieChart
            data={dataPieChart(labelDataStatus)}
            width={newWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="item"
            backgroundColor="transparent"
            paddingLeft="8"
          />
          <Divider />
          <Spacing size="8" />
          <Body1>Raison</Body1>
          <Spacing size="4" />
          <BarChart
            data={dataBarChart(labelDate(labelDataReason).label, labelDate(labelDataReason).data)}
            width={newWidth}
            height={220}
            fromNumber={8} //fix
            fromZero={true}
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=""
          />
        </Card>
        <Spacing size="16" />
        <Card>
          <Title2>
            Sur les {formInscriptionData.length} réponses fournies pour devenir famille d'accueil
          </Title2>
          <Spacing size="8" />
          <Body1>Ils sont (proprio/loca/autre)</Body1>
          <Spacing size="4" />
          <BarChart
            data={dataBarChart(
              labelDate(labelDataResidenceType).label,
              labelDate(labelDataResidenceType).data
            )}
            width={newWidth}
            height={220}
            fromNumber={10}
            fromZero={true}
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=""
          />
          <Spacing size="16" />
          <Divider />
          <Spacing size="16" />
          <Body1>Genre </Body1>
          <Spacing size="4" />
        </Card>
      </Container>
      <Spacing size="16" />
    </Layout>
  )
}

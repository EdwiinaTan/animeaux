import { ActivityIndicator, useWindowDimensions } from 'react-native'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { Divider } from 'react-native-elements'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1, Title2 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetAnimals } from 'src/hooks/Animal'
import { FetchStatus } from 'src/types/Status'
import { Card, Container } from './Styled'
import { chartConfig, colors, dataBarChart } from './Utils'

export const Information = (): React.ReactElement => {
  const { width } = useWindowDimensions()
  const newWidth = width - 64
  const { statusAnimal, animalData } = useGetAnimals() //useEffect

  if (statusAnimal !== FetchStatus.SUCCESS) {
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

  const labelSpecies = Object.keys(labelDataSpecies)
  const dataSpecies: number[] = Object.values(labelDataSpecies)
  const max = Math.max(...dataSpecies)

  const labelGender = Object.keys(labelDataGender)
  const dataGender: number[] = Object.values(labelDataGender)

  const labelStatus = Object.keys(labelDataStatus)
  const dataStatus: number[] = Object.values(labelDataStatus)

  const labelReason = Object.keys(labelDataReason)
  const dataReason: number[] = Object.values(labelDataReason)

  let dataChartStatus = labelStatus.map((status, index) => {
    return {
      name: status,
      color: colors[index],
      legendFontColor: theme.colors.grey2,
      legendFontSize: 12,
      status: dataStatus[index],
    }
  })

  let dataChartGender = labelGender.map((gender, index) => {
    return {
      name: gender,
      gender: dataGender[index],
      color: colors[index],
      legendFontColor: theme.colors.grey2,
      legendFontSize: 12,
    }
  })

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
            data={dataBarChart(labelSpecies, dataSpecies)}
            width={newWidth}
            height={220}
            fromNumber={max + 5}
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
            data={dataChartGender}
            width={newWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="gender"
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
            data={dataChartStatus}
            width={newWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="status"
            backgroundColor="transparent"
            paddingLeft="8"
          />
          <Divider />
          <Spacing size="8" />
          <Body1>Raison</Body1>
          <Spacing size="4" />
          <BarChart
            data={dataBarChart(labelReason, dataReason)}
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
            Sur les {animalData.length} réponses fournies pour devenir famille d'accueil
          </Title2>
          <Spacing size="8" />
          <Body1>Espèce</Body1>
          <Spacing size="4" />
          <BarChart
            data={dataBarChart(labelSpecies, dataSpecies)}
            width={newWidth}
            height={220}
            fromNumber={max + 5}
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

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
import { chartConfig } from './Utils'

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

  const labelGender = Object.keys(labelDataGender)
  const dataGender: number[] = Object.values(labelDataGender)

  const labelStatus = Object.keys(labelDataStatus)
  const dataStatus: number[] = Object.values(labelDataStatus)

  const labelReason = Object.keys(labelDataReason)
  const dataReason: number[] = Object.values(labelDataReason)

  const dataChartStatus = [
    {
      name: labelStatus[0],
      status: dataStatus[0],
      color: theme.colors.primary,
      legendFontColor: theme.colors.grey2,
      legendFontSize: 15,
    },
    {
      name: labelStatus[1],
      status: dataStatus[1],
      color: theme.colors.red,
      legendFontColor: theme.colors.grey2,
      legendFontSize: 15,
    },
    {
      name: labelStatus[2],
      status: dataStatus[2],
      color: theme.colors.blue,
      legendFontColor: theme.colors.grey2,
      legendFontSize: 15,
    },
    {
      name: labelStatus[3],
      status: dataStatus[3],
      color: theme.colors.yellow,
      legendFontColor: theme.colors.grey2,
      legendFontSize: 15,
    },
    {
      name: labelStatus[4],
      status: dataStatus[4],
      color: theme.colors.secondary,
      legendFontColor: theme.colors.grey2,
      legendFontSize: 15,
    },
  ]

  const dataChartSpecies = {
    labels: labelSpecies,
    datasets: [
      {
        data: dataSpecies,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }

  const dataChartReason = {
    labels: labelReason,
    datasets: [
      {
        data: dataReason,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }

  const dataChartGender = [
    {
      name: labelGender[0],
      gender: dataGender[0],
      color: theme.colors.primary,
      legendFontColor: theme.colors.grey2,
      legendFontSize: 15,
    },
    {
      name: labelGender[1],
      gender: dataGender[1],
      color: theme.colors.red,
      legendFontColor: theme.colors.grey2,
      legendFontSize: 15,
    },
  ]

  return (
    <Layout>
      <HeaderComponent title="Information" />
      <Container>
        <Card>
          <Title2>Sur {animalData.length} animaux</Title2>
          <Spacing size="8" />
          <Body1>Espèce</Body1>
          <Spacing size="4" />
          <BarChart
            data={dataChartSpecies}
            width={newWidth}
            height={220}
            fromNumber={8} //fix
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
            paddingLeft="15"
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
            paddingLeft="15"
          />
          <Divider />
          <Spacing size="8" />
          <Body1>Raison</Body1>
          <Spacing size="4" />
          <BarChart
            data={dataChartReason}
            width={newWidth}
            height={220}
            fromNumber={8} //fix
            fromZero={true}
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=""
          />
        </Card>
      </Container>
    </Layout>
  )
}

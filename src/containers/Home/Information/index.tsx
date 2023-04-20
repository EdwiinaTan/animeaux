import { ActivityIndicator, useWindowDimensions } from 'react-native'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetAnimals } from 'src/hooks/Animal'
import { FetchStatus } from 'src/types/Status'
import { Card, Container } from './Styled'

export const Information = (): React.ReactElement => {
  const { width } = useWindowDimensions()
  const newWidth = width - 64
  const { statusAnimal, animalData } = useGetAnimals() //useEffect

  if (statusAnimal !== FetchStatus.SUCCESS) {
    return <ActivityIndicator size="large" color={theme.colors.blue} />
  }

  const labelDataAnimal = animalData.reduce((accumulator, { fields: { species } }) => {
    if (!accumulator[species]) {
      accumulator[species] = 1
    } else {
      accumulator[species]++
    }
    return accumulator
  }, {})

  const labelDataaAnimal = animalData.reduce((accumulator, { fields: { gender } }) => {
    if (!accumulator[gender]) {
      accumulator[gender] = 1
    } else {
      accumulator[gender]++
    }
    return accumulator
  }, {})

  const labelAnimal = Object.keys(labelDataAnimal)
  const dataAnimal: number[] = Object.values(labelDataAnimal)
  const labelGender = Object.keys(labelDataaAnimal)
  const dataGender: number[] = Object.values(labelDataaAnimal)

  const data = {
    labels: labelAnimal,
    datasets: [
      {
        data: dataAnimal,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3,
    decimalPlaces: 0,
  }

  const dataa = [
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
          <Body1>Nombre d'animal par espèce : {animalData.length}</Body1>
          <Spacing size="4" />
          <BarChart
            data={data}
            width={newWidth}
            height={220}
            fromNumber={8}
            fromZero={true}
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=""
          />
        </Card>
        <Spacing size="8" />
        <Card>
          <PieChart
            data={dataa}
            width={newWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="gender"
            backgroundColor="transparent"
            paddingLeft="15"
            // absolute
          />
        </Card>
      </Container>
    </Layout>
  )
}

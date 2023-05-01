import { useWindowDimensions } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1, Body2 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { ChartProps } from '../Type'
import { colors } from '../Utils'
import { Container, ContainerItem } from './Styled'

export const ProgressChartComponent: React.FC<ChartProps> = ({ title, data }) => {
  const { width } = useWindowDimensions()
  const newWidth = width - 64

  const dataArray = {
    labels: Object.keys(data),
    data: Object.values(data).map((datas: number) => datas / 10),
    colors: colors,
  }

  const renderKeyReason = () => {
    return Object.keys(data).map((item, key) => {
      return (
        <Container key={key}>
          <ContainerItem color={colors[key]} />
          <Body2 paddingLeft={4} key={key}>{`${item}: ${data[item] * 10}%${'   '}`}</Body2>
        </Container>
      )
    })
  }

  return (
    <>
      <Spacing size="16" />
      <Body1>{title}</Body1>
      <Spacing size="4" />
      <ProgressChart
        hideLegend
        data={dataArray}
        width={newWidth}
        height={170}
        strokeWidth={7}
        withCustomBarColorFromData
        radius={35}
        chartConfig={{
          backgroundGradientFromOpacity: 0.5,
          backgroundColor: theme.colors.white,
          backgroundGradientFrom: theme.colors.white,
          backgroundGradientTo: theme.colors.white,
          propsForLabels: { fill: theme.colors.black },
          decimalPlaces: 2,
          color: (opacity = 1, _index) => `rgba(0,0,0,${opacity})`,
        }}
      />
      <Spacing size="8" />
      <Body2>{renderKeyReason()}</Body2>
    </>
  )
}

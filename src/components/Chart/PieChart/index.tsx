import { useWindowDimensions } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1 } from 'src/components/Typo'
import { ChartProps } from '../Type'
import { chartConfig, dataPieChart } from '../Utils'

export const PieChartComponent: React.FC<ChartProps> = ({ title, data, noLeft }) => {
  const { width } = useWindowDimensions()
  const newWidth = width - 64

  return (
    <>
      <Spacing size="16" />
      <Body1>{title}</Body1>
      <Spacing size="4" />
      <PieChart
        data={dataPieChart(data)}
        width={newWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="item"
        backgroundColor="transparent"
        paddingLeft={noLeft ? 8 : 32}
        // absolute
      />
    </>
  )
}

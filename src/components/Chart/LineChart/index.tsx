import { useWindowDimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1 } from 'src/components/Typo'
import { ChartProps } from '../Type'
import { chartConfig, dataBarChart, labelDate } from '../Utils'

export const LineChartComponent: React.FC<ChartProps> = ({ title, data }) => {
  const { width } = useWindowDimensions()
  const newWidth = width - 64

  return (
    <>
      <Spacing size="16" />
      <Body1>{title}</Body1>
      <Spacing size="4" />
      <LineChart
        data={dataBarChart(labelDate(data).label, labelDate(data).data)}
        width={newWidth}
        height={220}
        fromZero
        chartConfig={chartConfig}
        withDots={false}
        bezier
      />
    </>
  )
}

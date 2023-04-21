import { theme } from 'src/constant/Theme'

export const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  props: {
    strokeWidth: 0,
    r: '10',
  },
  propsForDots: {
    r: '10',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
}

export const dataBarChart = (label: string[], data: number[]) => {
  return {
    labels: label,
    datasets: [
      {
        data: data,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }
}

export const colors = [
  theme.colors.primary,
  theme.colors.red,
  theme.colors.blue,
  theme.colors.yellow,
  theme.colors.secondary,
]

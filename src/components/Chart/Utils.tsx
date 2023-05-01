import { theme } from 'src/constant/Theme'

export const chartConfig = {
  backgroundGradientFrom: theme.colors.orange,
  backgroundGradientTo: theme.colors.yellow,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  props: {
    strokeWidth: 2,
    r: '10',
  },
  propsForDots: {
    r: '10',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
}

export const labelDate = (labelDataSpecies: {}) => {
  return {
    label: Object.keys(labelDataSpecies),
    data: Object.values(labelDataSpecies) as number[],
  }
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
  theme.colors.blue,
  theme.colors.red,
  theme.colors.yellow,
  theme.colors.secondary,
  theme.colors.grey4,
  theme.colors.orange,
]

export const dataPieChart = (items: {}) => {
  return Object.keys(items).map((item, index) => {
    return {
      name: item,
      color: colors[index],
      legendFontColor: theme.colors.grey2,
      legendFontSize: 12,
      item: Object.values(items)[index] as number,
    }
  })
}

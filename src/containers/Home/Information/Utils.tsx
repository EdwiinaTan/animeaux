import { theme } from 'src/constant/Theme'
import { colors } from './Styled'

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

export const getLabelDataReduce = (formData: any[], field: string) => {
  if (formData) {
    return formData.reduce((accumulator, form) => {
      const item = form.fields[field]
      if (!accumulator[item]) {
        accumulator[item] = 1
      } else {
        accumulator[item]++
      }
      return accumulator
    }, {})
  }
}

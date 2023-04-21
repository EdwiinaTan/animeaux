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

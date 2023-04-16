import { useWindowDimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Card, Container } from './Styled'

export const Information = (): React.ReactElement => {
  const { width } = useWindowDimensions()
  const newWidth = width - 64

  return (
    <Layout>
      <HeaderComponent title="Information" />
      <Container>
        <Card>
          <LineChart
            data={{
              labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optionnel
                  strokeWidth: 2, // optionnel
                },
              ],
            }}
            width={newWidth}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
          />
        </Card>
      </Container>
    </Layout>
  )
}

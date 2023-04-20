import { ActivityIndicator, useWindowDimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
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

  console.log('aaa', labelDataaAnimal)

  const labelAnimal = Object.keys(labelDataAnimal)
  const dataAnimal: number[] = Object.values(labelDataAnimal)

  return (
    <Layout>
      <HeaderComponent title="Information" />
      <Container>
        <Card>
          <Body1>Nombre d'animal par espèce : {animalData.length}</Body1>
          <LineChart
            data={{
              labels: labelAnimal,
              datasets: [
                {
                  data: dataAnimal,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optionnel
                  strokeWidth: 2, // optionnel
                },
              ],
            }}
            width={newWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
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

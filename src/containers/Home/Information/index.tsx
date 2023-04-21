import { ActivityIndicator, useWindowDimensions } from 'react-native'
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit'
import { Divider } from 'react-native-elements'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { Body1, Title2 } from 'src/components/Typo'
import { theme } from 'src/constant/Theme'
import { useGetAnimals } from 'src/hooks/Animal'
import { useGetFormInscriptions } from 'src/hooks/FormInscription'
import { FetchStatus } from 'src/types/Status'
import { Card, Container } from './Styled'
import { chartConfig, dataBarChart, dataPieChart, getLabelDataReduce, labelDate } from './Utils'

export const Information = (): React.ReactElement => {
  const { width } = useWindowDimensions()
  const newWidth = width - 64
  const { statusAnimal, animalData } = useGetAnimals()
  const { statusFormInscription, formInscriptionData } = useGetFormInscriptions()

  if (statusAnimal === FetchStatus.LOADING || statusFormInscription === FetchStatus.LOADING) {
    return <ActivityIndicator size="large" color={theme.colors.blue} />
  }

  const labelDataSpecies = getLabelDataReduce(animalData, 'species')
  const labelDataGender = getLabelDataReduce(animalData, 'gender')
  const labelDataStatus = getLabelDataReduce(animalData, 'status')
  const labelDataReason = getLabelDataReduce(animalData, 'reason')

  const labelDataVehicle = getLabelDataReduce(formInscriptionData, 'vehicle')
  const labelDataResidence = getLabelDataReduce(formInscriptionData, 'residence')
  const labelDataResidenceType = getLabelDataReduce(formInscriptionData, 'residenceType')
  const labelDataGarden = getLabelDataReduce(formInscriptionData, 'garden')
  const labelDataBalcony = getLabelDataReduce(formInscriptionData, 'balcony')

  return (
    <Layout>
      <HeaderComponent title="Information" />
      <Container>
        <Card>
          <Title2>Sur les {animalData.length} animaux</Title2>
          <Spacing size="8" />
          <Body1>Espèce</Body1>
          <Spacing size="4" />
          <BarChart
            data={dataBarChart(labelDate(labelDataSpecies).label, labelDate(labelDataSpecies).data)}
            width={newWidth}
            height={220}
            fromNumber={8}
            fromZero={true}
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=""
          />
          <Spacing size="16" />
          <Divider />
          <Spacing size="16" />
          <Body1>Genre </Body1>
          <Spacing size="4" />
          <PieChart
            data={dataPieChart(labelDataGender)}
            width={newWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="item"
            backgroundColor="transparent"
            paddingLeft="8"
            // absolute
          />
          <Spacing size="16" />
          <Divider />
          <Spacing size="16" />
          <Body1>Statut</Body1>
          <Spacing size="4" />
          <PieChart
            data={dataPieChart(labelDataStatus)}
            width={newWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="item"
            backgroundColor="transparent"
            paddingLeft="8"
          />
          <Divider />
          <Spacing size="8" />
          <Body1>Raison</Body1>
          <Spacing size="4" />
          <BarChart
            data={dataBarChart(labelDate(labelDataReason).label, labelDate(labelDataReason).data)}
            width={newWidth}
            height={220}
            fromNumber={8} //fix
            fromZero
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=""
          />
        </Card>
        <Spacing size="16" />
        <Card>
          <Title2>
            Sur les {formInscriptionData.length} réponses fournies pour devenir famille d'accueil
          </Title2>
          <Spacing size="8" />
          <Body1>Type de résidence</Body1>
          <Spacing size="4" />
          <BarChart
            data={dataBarChart(
              labelDate(labelDataResidenceType).label,
              labelDate(labelDataResidenceType).data
            )}
            width={newWidth}
            height={220}
            fromNumber={10}
            fromZero
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=""
          />
          <Spacing size="16" />
          <Divider />
          <Spacing size="16" />
          <Body1>Véhiculé</Body1>
          <Spacing size="4" />
          <PieChart
            data={dataPieChart(labelDataVehicle)}
            width={newWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="item"
            backgroundColor="transparent"
            paddingLeft="32"
            // absolute
          />
          <Spacing size="16" />
          <Divider />
          <Spacing size="16" />
          <Body1>Résidence</Body1>
          <Spacing size="4" />
          <LineChart
            data={dataBarChart(
              labelDate(labelDataResidence).label,
              labelDate(labelDataResidence).data
            )}
            width={newWidth}
            height={220}
            chartConfig={chartConfig}
          />
          <Spacing size="16" />
          <Divider />
          <Spacing size="16" />
          <Body1>Jardin</Body1>
          <Spacing size="4" />
          <PieChart
            data={dataPieChart(labelDataGarden)}
            width={newWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="item"
            backgroundColor="transparent"
            paddingLeft="32"
            // absolute
          />
          <Spacing size="16" />
          <Divider />
          <Spacing size="16" />
          <Body1>Balcon</Body1>
          <Spacing size="4" />
          <PieChart
            data={dataPieChart(labelDataBalcony)}
            width={newWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="item"
            backgroundColor="transparent"
            paddingLeft="32"
            // absolute
          />
          <Spacing size="16" />
        </Card>
      </Container>
      <Spacing size="16" />
    </Layout>
  )
}

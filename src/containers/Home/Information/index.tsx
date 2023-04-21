import { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'
import { useGetAnimals } from 'src/hooks/Animal'
import { useGetFormInscriptions } from 'src/hooks/FormInscription'
import { FetchStatus } from 'src/types/Status'
import { InfoFormHostFamily } from './FormHostFamily'
import { Statistics } from './Statistics'

export const Information = (): React.ReactElement => {
  const { statusAnimal, animalData } = useGetAnimals()
  const { statusFormInscription, formInscriptionData } = useGetFormInscriptions()
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Layout>
      <HeaderComponent title="Information" />
      {statusAnimal === FetchStatus.LOADING || statusFormInscription === FetchStatus.LOADING ? (
        <ActivityIndicator size="large" color={theme.colors.blue} />
      ) : (
        <>
          <ButtonGroup
            buttons={['Statistiques', 'Formulaires FA']}
            selectedIndex={selectedIndex}
            onPress={(value) => {
              setSelectedIndex(value)
            }}
            containerStyle={{
              marginBottom: 8,
              marginTop: 0,
              borderRadius: 8,
              marginLeft: 16,
              marginRight: 16,
            }}
          />
          {selectedIndex === 0 ? (
            <Statistics animalData={animalData} formInscriptionData={formInscriptionData} />
          ) : (
            <InfoFormHostFamily />
          )}
        </>
      )}
      <Spacing size="8" />
    </Layout>
  )
}

import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StepIndicator from 'react-native-step-indicator'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { Spacing } from 'src/components/Layout/Spacing'
import { theme } from 'src/constant/Theme'

export const AddAnimal = () => {
  const navigation = useNavigation()

  const onClickGoBack = () => {
    return navigation.goBack()
  }

  const labels = ['Profil', 'Situation', 'Photos']

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: theme.lightColors.primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: theme.lightColors.primary,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: theme.lightColors.primary,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: theme.lightColors.primary,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: theme.lightColors.primary,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: theme.lightColors.primary,
  }

  const [currentPosition, setCurrentPosition] = useState(0)

  const onPageChange = (value: string) => {
    if (value === 'next') {
      currentPosition !== 2 ? setCurrentPosition(currentPosition + 1) : setCurrentPosition(2)
    } else {
      currentPosition !== 0 ? setCurrentPosition(currentPosition - 1) : setCurrentPosition(0)
    }
  }

  return (
    <Layout>
      <HeaderComponent onClickGoBack={onClickGoBack} title="Ajouter un animal" />

      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        stepCount={3}
        direction="horizontal"
      />
      {currentPosition !== 0 && (
        <TouchableOpacity onPress={() => onPageChange('prev')}>
          <Text>Précédent</Text>
          <Spacing size="24" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => onPageChange('next')}>
        <Text>Suivant</Text>
      </TouchableOpacity>
    </Layout>
  )
}

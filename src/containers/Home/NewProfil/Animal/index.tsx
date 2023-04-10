import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StepIndicator from 'react-native-step-indicator'
import { HeaderComponent } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
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

  const onPageChange = () => {
    setCurrentPosition(currentPosition + 1)
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
      <TouchableOpacity onPress={onPageChange}>
        <Text>NEXT</Text>
      </TouchableOpacity>
    </Layout>
  )
}

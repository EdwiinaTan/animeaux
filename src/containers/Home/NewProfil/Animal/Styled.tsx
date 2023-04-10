import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  padding-left: 16px;
  padding-right: 16px;
`

export const Card = styled.View`
  background-color: ${theme.lightColors?.white};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #dce1e7;
`

export const customStyles = {
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

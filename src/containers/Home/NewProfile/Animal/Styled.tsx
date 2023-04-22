import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  padding-left: 16px;
  padding-right: 16px;
`

export const Card = styled.View`
  background-color: ${theme.colors.white};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.grey1};
`

export const Keyboard = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

export const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: theme.colors.primary,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: theme.colors.primary,
  stepStrokeUnFinishedColor: theme.colors.grey3,
  separatorFinishedColor: theme.colors.primary,
  separatorUnFinishedColor: theme.colors.grey3,
  stepIndicatorFinishedColor: theme.colors.primary,
  stepIndicatorUnFinishedColor: theme.colors.white,
  stepIndicatorCurrentColor: theme.colors.white,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: theme.colors.primary,
  stepIndicatorLabelFinishedColor: theme.colors.white,
  stepIndicatorLabelUnFinishedColor: theme.colors.grey3,
  labelColor: theme.colors.grey4,
  labelSize: 13,
  currentStepLabelColor: theme.colors.primary,
}

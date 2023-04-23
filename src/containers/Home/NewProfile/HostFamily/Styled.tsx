import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export const Keyboard = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

export const TextRed = styled.Text`
  color: ${theme.colors.red};
`

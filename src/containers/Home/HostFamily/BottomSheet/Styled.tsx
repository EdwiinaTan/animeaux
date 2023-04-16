import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export const ListView = styled.View`
  padding-left: 16px;
  padding-right: 16px;
`

export const TextRed = styled.Text`
  color: ${theme.colors.red};
`

export const ContainerButton = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

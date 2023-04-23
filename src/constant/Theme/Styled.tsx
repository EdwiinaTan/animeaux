import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export const CardStyle = styled.View`
  background-color: ${theme.colors.white};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #dce1e7;
`

export const ContainerCalendar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ContainerStyle = styled.ScrollView`
  padding-left: 16px;
  padding-right: 16px;
`

export const TextLine = styled.Text`
  text-decoration: underline;
`

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
  border: 1px solid #dce1e7;
`

export const Keyboard = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

export const ContainerCheckbox = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const ContainerCalendar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

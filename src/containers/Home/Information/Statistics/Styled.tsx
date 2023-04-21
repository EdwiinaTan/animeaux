import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export const Card = styled.View`
  background-color: ${theme.colors.white};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #dce1e7;
`

export const Container = styled.ScrollView`
  padding-left: 16px;
  padding-right: 16px;
`

export const colors = [
  theme.colors.primary,
  theme.colors.red,
  theme.colors.blue,
  theme.colors.yellow,
  theme.colors.secondary,
  theme.colors.grey2,
]

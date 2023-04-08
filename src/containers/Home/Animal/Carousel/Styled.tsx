import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export const ContainerPagination = styled.View`
  position: absolute;
  bottom: 8px;
  right: 16px;
  background-color: ${theme.lightColors.white};
  width: 40px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${theme.lightColors.black};
`

export const PaginationText = styled.Text`
  color: ${theme.lightColors.black};
  text-align: center;
  padding-top: 4px;
  padding-bottom: 4px;
`

export const Carousel = styled.View`
  position: relative;
`

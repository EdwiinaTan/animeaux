import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export const Container = styled.View`
  padding-left: 16px;
  padding-right: 16px;
`

export const ContainerDescription = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Description = styled.View`
  background-color: ${theme.colors.white};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #dce1e7;
  display: flex;
  margin-top: -64px;
  width: 100%;
`

export const Fields = styled.View`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
`

export const ContainerImage = styled.View`
  display: flex;
  align-items: center;
  z-index: 1;
`

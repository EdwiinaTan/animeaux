import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export const ContainerImage = styled.View`
  display: flex;
  align-items: center;
  z-index: 1;
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
  flex-direction: row;
  justify-content: space-between;
  margin-top: -64px;
  flex-direction: column;
  width: 100%;
`

export const Fields = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ImageField = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 8px;
`

import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
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

export const ContainerImage = styled.View`
  display: flex;
  align-items: center;
  z-index: 1;
`

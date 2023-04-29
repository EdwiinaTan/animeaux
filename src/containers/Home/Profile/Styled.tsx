import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export const UserHeader = styled.View`
  padding-left: 16px;
  padding-right: 16px;
`

export const ContainerHeader = styled.View`
  flex-direction: row
  width: 80%;
  justify-content: space-between;
`

export const Header = styled.View`
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 100%;
`

export const Container = styled.View`
  position: relative;
`

export const ContainerDescription = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Description = styled.View`
  background-color: ${theme.colors.white};
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #dce1e7;
  display: flex;
  flex-direction: row;
  margin-top: -68px;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  align-items: center;
`

export const ContainerImage = styled.View`
  display: flex;
  align-items: center;
  z-index: 1;
`

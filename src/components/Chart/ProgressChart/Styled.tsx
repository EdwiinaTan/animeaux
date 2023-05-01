import styled from 'styled-components/native'

interface StyledSpacingProps {
  color: string
}

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ContainerItem = styled.View<StyledSpacingProps>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${(props: StyledSpacingProps) => props.color};
`

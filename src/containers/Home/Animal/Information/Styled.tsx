import { theme } from 'src/constant/Theme'
import styled from 'styled-components/native'

export interface StyledImageProps {
  marginRight?: boolean
  color: string
}

export const ViewImage = styled.View<StyledImageProps>`
  margin-right: ${(props: StyledImageProps) => (props.marginRight ? '8px' : 0)};
  flex: 1;
  align-items: center;
  height: 60px;
  padding: 4px
  border-width: 2px;
  border-radius: 8px;
  border-color: ${(props: StyledImageProps) => props.color};
`

export const ContainerViewImage = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  flex: 1;
`

export const BoxViewImage = styled.View`
  height: 90px;
`

export const ImageAnimal = styled.Image`
  width: 100%;
  height: 250px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: ${theme.colors.grey1};
`

export const Description = styled.View`
  background-color: ${theme.colors.white};
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px
  padding-right: 16px
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid ${theme.colors.grey1};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const TitleCard = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
`
export const InCharge = styled.View`
  display: flex;
  flex-direction: row;
`

export const TitleText = styled.Text`
  padding-left: 8px;
`

export const Illustration = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background-color: ${theme.colors.grey1};
`

export const PaddingRight = styled.View`
  padding-right: 16px;
`

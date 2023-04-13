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
  height: 60px;
  flex: 1;
`

export const ImageAnimal = styled.Image`
  width: 100%;
  height: 250px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #dce1e7; ;
`

export const Container = styled.ScrollView`
  padding-left: 16px;
  padding-right: 16px;
`

export const Description = styled.View`
  background-color: ${theme.colors.white};
  padding: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid #dce1e7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Card = styled.View`
  background-color: ${theme.colors.white};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #dce1e7;
`

export const TitleCard = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
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

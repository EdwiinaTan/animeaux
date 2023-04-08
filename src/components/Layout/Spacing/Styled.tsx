import styled from 'styled-components/native'

export interface StyledSpacingProps {
  size: string
  type: 'vertical' | 'horizontal'
}

export const StyledSpacing = styled.View<StyledSpacingProps>`
  height: ${(props: StyledSpacingProps) =>
    props.type === 'vertical' ? `${props.size}px` : '100%'};
  width: ${(props: StyledSpacingProps) =>
    props.type === 'horizontal' ? `${props.size}px` : '100%'};
`

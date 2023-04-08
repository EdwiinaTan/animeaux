import { StyledSpacing } from './Styled'
import { SpacingProps } from './Type'

export const Spacing: React.FC<SpacingProps> = ({ size, custom, type }) => {
  if (!size && !custom) {
    return null
  }

  return <StyledSpacing size={custom || size || ''} type={type || 'vertical'} />
}

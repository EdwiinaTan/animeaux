import { IconEntypo } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { CustomRightProps } from './Type'

export const CustomRight: React.FC<CustomRightProps> = ({ toggleOverlay }) => {
  if (!toggleOverlay) {
    return <></>
  }

  return (
    <IconEntypo
      name="dots-three-horizontal"
      size={20}
      color={theme.lightColors?.black}
      onPress={toggleOverlay}
      style={{ paddingRight: 8, paddingTop: 4 }}
    />
  )
}

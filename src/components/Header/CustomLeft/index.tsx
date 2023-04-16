import { IconAntDesign } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { CustomLeftProps } from './Type'

export const CustomLeft: React.FC<CustomLeftProps> = ({ onClickGoBack }) => {
  if (!onClickGoBack) {
    return <></>
  }

  return (
    <IconAntDesign
      name="arrowleft"
      size={20}
      style={{ paddingTop: 4, paddingLeft: 4 }}
      color={theme.colors.black}
      onPress={onClickGoBack}
    />
  )
}

import { Text } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { IconMaterialCommunityIcons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { CheckboxProps } from './Type'

export const CheckboxComponent: React.FC<CheckboxProps> = ({
  title,
  isActive,
  setIsActive,
  name,
}) => {
  return (
    <CheckBox
      center
      title={<Text style={{ paddingLeft: 4 }}>{title}</Text>}
      checked={isActive}
      onPress={() => setIsActive(!isActive)}
      checkedIcon={<IconMaterialCommunityIcons name={name} size={18} color="grey" />}
      uncheckedIcon={<IconMaterialCommunityIcons name={name} size={18} color="grey" />}
      containerStyle={{
        borderColor: isActive ? theme.colors.yellow : theme.colors.greyOutline,
        backgroundColor: theme.colors.white,
        // paddingTop: 8,
        // paddingLeft: 8,
        paddingRight: 8,
        marginRight: 0,
        // marginBottom: 0,
      }}
      wrapperStyle={{}}
    />
  )
}

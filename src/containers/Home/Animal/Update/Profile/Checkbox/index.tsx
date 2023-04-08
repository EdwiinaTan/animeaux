import { CheckBox } from 'react-native-elements'
import { IconMaterialCommunityIcons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'

export const CheckBoxComponent = (isFieldActive, option, values, handleChange) => {
  return (
    <CheckBox
      center
      containerStyle={{
        borderColor: isFieldActive(option.value),
        backgroundColor: theme.lightColors?.white,
        paddingRight: 0,
        marginRight: 0,
      }}
      textStyle={{ color: isFieldActive(option.value) }}
      key={option.value}
      title={option.label}
      checkedIcon={
        <IconMaterialCommunityIcons name={option.icon} size={18} color={theme.lightColors.grey0} />
      }
      uncheckedIcon={<IconMaterialCommunityIcons name={option.icon} size={18} color="grey" />}
      checked={values.option === option.value}
      onPress={() => handleChange('option')(option.value)}
    />
  )
}

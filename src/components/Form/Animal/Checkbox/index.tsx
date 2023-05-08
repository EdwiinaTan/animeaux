import { CheckBox } from 'react-native-elements'
import { theme } from 'src/constant/Theme'
import { CheckboxProps } from './Type'

export const CheckBoxComponent: React.FC<CheckboxProps> = ({ animal, values, handleChange }) => {
  return (
    <CheckBox
      center
      containerStyle={{
        backgroundColor: theme.colors.white,
        paddingRight: 0,
        borderColor: theme.colors.grey0,
        marginRight: 0,
      }}
      textStyle={{ color: theme.colors.grey0 }}
      key={animal.value}
      title={animal.label}
      checkedColor={theme.colors.blue}
      checked={values === animal.value}
      onPress={handleChange}
    />
  )
}

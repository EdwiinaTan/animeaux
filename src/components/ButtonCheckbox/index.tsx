import { Button } from 'react-native-elements'
import { theme } from 'src/constant/Theme'
import { ButtonCheckboxProps } from './Type'

export const ButtonCheckbox: React.FC<ButtonCheckboxProps> = ({ title, color, onPress, icon }) => {
  return (
    <Button
      icon={icon}
      title={title}
      buttonStyle={{
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: color,
        marginRight: 8,
        marginBottom: 8,
      }}
      titleStyle={{
        color: color,
        fontSize: 14,
        paddingTop: 0,
      }}
      onPress={() => onPress()}
    />
  )
}

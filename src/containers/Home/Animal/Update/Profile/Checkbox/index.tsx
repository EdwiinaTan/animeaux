import { CheckBox } from 'react-native-elements'
import { theme } from 'src/constant/Theme'
import {
  AnimalAgreement,
  AnimalGenderEnum,
  AnimalReasonEnum,
  AnimalStatusEnum,
  AnimalTypeEnum,
} from 'src/types/Animal/enum'

interface CheckboxProps {
  animal: {
    label: string
    value: any
  }
  values:
    | AnimalTypeEnum
    | AnimalGenderEnum
    | AnimalStatusEnum
    | AnimalReasonEnum
    | AnimalAgreement
    | AnimalAgreement
    | AnimalAgreement
  handleChange: {
    (e: React.ChangeEvent<any>): void
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void
  }
}

export const CheckBoxComponent: React.FC<CheckboxProps> = ({ animal, values, handleChange }) => {
  return (
    <CheckBox
      center
      containerStyle={{
        backgroundColor: theme.lightColors?.white,
        paddingRight: 0,
        marginRight: 0,
      }}
      key={animal.value}
      title={animal.label}
      checkedColor={theme.lightColors.grey0}
      checked={values === animal.value}
      onPress={handleChange}
    />
  )
}

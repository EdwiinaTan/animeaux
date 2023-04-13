import { useState } from 'react'
import { ButtonCheckbox } from 'src/components/ButtonCheckbox'
import { IconIonicons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { AnimalGenderEnum } from 'src/types/Animal/enum'
import { ContainerButton } from '../Styled'
import { ItemProps } from '../Type'

export const ButtonGender: React.FC<ItemProps> = ({ animal }) => {
  const [gender, setGender] = useState<AnimalGenderEnum>(animal.gender)

  const handleButtonAnimalType = (value: AnimalGenderEnum) => {
    setGender(value)
  }

  const renderColorActive = (value: string) => {
    if (gender === value) {
      return theme.colors.yellow
    }
    return 'grey'
  }

  return (
    <ContainerButton>
      <ButtonCheckbox
        title="Male"
        icon={
          <IconIonicons
            name="male"
            size={16}
            color={renderColorActive(AnimalGenderEnum.MALE)}
            style={{ paddingRight: 8 }}
          />
        }
        color={renderColorActive(AnimalGenderEnum.MALE)}
        onPress={() => handleButtonAnimalType(AnimalGenderEnum.MALE)}
      />
      <ButtonCheckbox
        title="Femelle"
        icon={
          <IconIonicons
            name="female"
            size={16}
            color={renderColorActive(AnimalGenderEnum.FEMALE)}
            style={{ paddingRight: 8 }}
          />
        }
        color={renderColorActive(AnimalGenderEnum.FEMALE)}
        onPress={() => handleButtonAnimalType(AnimalGenderEnum.FEMALE)}
      />
    </ContainerButton>
  )
}

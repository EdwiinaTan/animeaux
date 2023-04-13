import { useState } from 'react'
import { ButtonCheckbox } from 'src/components/ButtonCheckbox'
import { theme } from 'src/constant/Theme'
import { AnimalReasonEnum } from 'src/types/Animal/enum'
import { ContainerButton } from '../Styled'
import { ItemProps } from '../Type'

export const ButtonReason: React.FC<ItemProps> = ({ animal }) => {
  const [reason, setReason] = useState<AnimalReasonEnum>(animal.reason)

  const handleButtonAnimalType = (value: AnimalReasonEnum) => {
    setReason(value)
  }

  const renderColorActive = (value: string) => {
    if (reason === value) {
      return theme.colors.yellow
    }
    return 'grey'
  }

  return (
    <ContainerButton>
      <ButtonCheckbox
        title="Abandon"
        color={renderColorActive(AnimalReasonEnum.ABANDON)}
        onPress={() => handleButtonAnimalType(AnimalReasonEnum.ABANDON)}
      />
      <ButtonCheckbox
        title="Décès du propriétaire"
        color={renderColorActive(AnimalReasonEnum.DECES_DU_PROPRIETAIRE)}
        onPress={() => handleButtonAnimalType(AnimalReasonEnum.DECES_DU_PROPRIETAIRE)}
      />
      <ButtonCheckbox
        title="Maltraitance"
        color={renderColorActive(AnimalReasonEnum.MALTRAITANCE)}
        onPress={() => handleButtonAnimalType(AnimalReasonEnum.ABANDON)}
      />
      <ButtonCheckbox
        title="Abandon"
        color={renderColorActive(AnimalReasonEnum.ERRANCE)}
        onPress={() => handleButtonAnimalType(AnimalReasonEnum.ERRANCE)}
      />
    </ContainerButton>
  )
}

import { useState } from 'react'
import { View } from 'react-native'
import { ButtonCheckbox } from 'src/components/ButtonCheckbox'
import { theme } from 'src/constant/Theme'
import { AnimalStatusEnum } from 'src/types/Animal/enum'
import { ItemProps } from '../Type'

export const ButtonStatus: React.FC<ItemProps> = ({ animal }) => {
  const [status, setStatus] = useState<AnimalStatusEnum>(animal.status)

  const handleButtonAnimalType = (value: AnimalStatusEnum) => {
    setStatus(value)
  }

  const renderColorActive = (value: string) => {
    if (status === value) {
      return theme.lightColors.grey0
    }
    return 'grey'
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        paddingBottom: 16,
      }}
    >
      <ButtonCheckbox
        title="Adopté"
        color={renderColorActive(AnimalStatusEnum.ADOPTE)}
        onPress={() => handleButtonAnimalType(AnimalStatusEnum.ADOPTE)}
      />
      <ButtonCheckbox
        title="Décédé"
        color={renderColorActive(AnimalStatusEnum.DECEDE)}
        onPress={() => handleButtonAnimalType(AnimalStatusEnum.DECEDE)}
      />
      <ButtonCheckbox
        title="Libre"
        color={renderColorActive(AnimalStatusEnum.LIBRE)}
        onPress={() => handleButtonAnimalType(AnimalStatusEnum.LIBRE)}
      />
      <ButtonCheckbox
        title="Adoptable"
        color={renderColorActive(AnimalStatusEnum.ADOPTABLE)}
        onPress={() => handleButtonAnimalType(AnimalStatusEnum.ADOPTABLE)}
      />
      <ButtonCheckbox
        title="Réservable"
        color={renderColorActive(AnimalStatusEnum.RESERVABLE)}
        onPress={() => handleButtonAnimalType(AnimalStatusEnum.RESERVABLE)}
      />
      <ButtonCheckbox
        title="Réservé"
        color={renderColorActive(AnimalStatusEnum.RESERVE)}
        onPress={() => handleButtonAnimalType(AnimalStatusEnum.RESERVE)}
      />
      <ButtonCheckbox
        title="Indisponible"
        color={renderColorActive(AnimalStatusEnum.INDISPONIBLE)}
        onPress={() => handleButtonAnimalType(AnimalStatusEnum.INDISPONIBLE)}
      />
    </View>
  )
}

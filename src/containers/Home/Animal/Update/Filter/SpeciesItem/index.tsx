import { useState } from 'react'
import { View } from 'react-native'
import { ButtonCheckbox } from 'src/components/ButtonCheckbox'
import { IconMaterialCommunityIcons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { AnimalTypeEnum } from 'src/types/Animal/enum'
import { ItemProps } from '../Type'

export const ButtonSpecies: React.FC<ItemProps> = ({ animal }) => {
  const [specie, setSpecie] = useState<AnimalTypeEnum>(animal.species)

  const handleButtonAnimalType = (value: AnimalTypeEnum) => {
    setSpecie(value)
  }

  const renderColorActive = (value: string) => {
    if (specie === value) {
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
        title="Chien"
        icon={
          <IconMaterialCommunityIcons
            name="dog"
            size={16}
            color={renderColorActive(AnimalTypeEnum.DOG)}
            style={{ paddingRight: 8 }}
          />
        }
        color={renderColorActive(AnimalTypeEnum.DOG)}
        onPress={() => handleButtonAnimalType(AnimalTypeEnum.DOG)}
      />
      <ButtonCheckbox
        title="Chat"
        icon={
          <IconMaterialCommunityIcons
            name="cat"
            size={16}
            color={renderColorActive(AnimalTypeEnum.CAT)}
            style={{ paddingRight: 8 }}
          />
        }
        color={renderColorActive(AnimalTypeEnum.CAT)}
        onPress={() => handleButtonAnimalType(AnimalTypeEnum.CAT)}
      />
      <ButtonCheckbox
        title="Rongeur"
        icon={
          <IconMaterialCommunityIcons
            name="rabbit"
            size={16}
            color={renderColorActive(AnimalTypeEnum.RONDENT)}
            style={{ paddingRight: 8 }}
          />
        }
        color={renderColorActive(AnimalTypeEnum.RONDENT)}
        onPress={() => handleButtonAnimalType(AnimalTypeEnum.RONDENT)}
      />
      <ButtonCheckbox
        title="Oiseau"
        icon={
          <IconMaterialCommunityIcons
            name="bird"
            size={16}
            color={renderColorActive(AnimalTypeEnum.BIRD)}
            style={{ paddingRight: 8 }}
          />
        }
        color={renderColorActive(AnimalTypeEnum.BIRD)}
        onPress={() => handleButtonAnimalType(AnimalTypeEnum.BIRD)}
      />
      <ButtonCheckbox
        title="Reptile"
        icon={
          <IconMaterialCommunityIcons
            name="snake"
            size={16}
            color={renderColorActive(AnimalTypeEnum.REPTILE)}
            style={{ paddingRight: 8 }}
          />
        }
        color={renderColorActive(AnimalTypeEnum.REPTILE)}
        onPress={() => handleButtonAnimalType(AnimalTypeEnum.REPTILE)}
      />
    </View>
  )
}

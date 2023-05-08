import { ScrollView } from 'react-native'
import { ButtonCheckbox } from 'src/components/ButtonCheckbox'
import { IconMaterialCommunityIcons } from 'src/constant/Icons'
import { theme } from 'src/constant/Theme'
import { AnimalTypeEnum } from 'src/types/Animal/enum'
import { FilterAnimalProps } from './Type'

export const FilterAnimal: React.FC<FilterAnimalProps> = ({ isActive, setIsActive }) => {
  const handleButtonAnimalType = (value: AnimalTypeEnum) => {
    setIsActive(value)
  }

  const renderColorActive = (value: string) => {
    if (isActive === value) {
      return theme.colors.primary
    }
    return theme.colors.grey0
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        marginHorizontal: 16,
        height: 60,
      }}
    >
      <ButtonCheckbox
        title="Tous"
        icon={
          <IconMaterialCommunityIcons
            name="paw"
            size={16}
            color={renderColorActive(AnimalTypeEnum.ALL)}
            style={{ paddingRight: 8 }}
          />
        }
        color={renderColorActive(AnimalTypeEnum.ALL)}
        onPress={() => handleButtonAnimalType(AnimalTypeEnum.ALL)}
      />
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
    </ScrollView>
  )
}

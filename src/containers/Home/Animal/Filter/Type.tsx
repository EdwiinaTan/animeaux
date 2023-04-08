import { AnimalTypeEnum } from 'src/types/Animal/enum'

export interface FilterAnimalProps {
  isActive: AnimalTypeEnum
  setIsActive: (value: AnimalTypeEnum) => void
}

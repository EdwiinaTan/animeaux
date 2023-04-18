import {
  AnimalColorEnum,
  AnimalGenderEnum,
  AnimalRaceEnum,
  AnimalTypeEnum,
} from 'src/types/Animal/enum'

export interface AnimalRequest {
  espece: AnimalTypeEnum
  genre: AnimalGenderEnum
  name: string
  alias: string
  icad: string
  race: AnimalRaceEnum
  couleur: AnimalColorEnum
  publicDescription: string
}

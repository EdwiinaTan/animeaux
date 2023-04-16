import {
  AnimalColorEnum,
  AnimalGenderEnum,
  AnimalRaceEnum,
  AnimalTypeEnum,
} from 'src/types/Animal/enum'

export interface AnimalRequest {
  species: AnimalTypeEnum
  gender: AnimalGenderEnum
  name: string
  alias: string
  icadNumber: string
  race: AnimalRaceEnum
  color: AnimalColorEnum
  publicDescription: string
}
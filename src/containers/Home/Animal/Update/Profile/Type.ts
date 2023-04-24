import {
  AnimalColorEnum,
  AnimalGenderEnum,
  AnimalRaceEnum,
  AnimalTypeEnum,
} from 'src/types/Animal/enum'

export interface AnimalProfileRequest {
  species: AnimalTypeEnum
  gender: AnimalGenderEnum
  name: string
  alias: string
  icad: string
  race: AnimalRaceEnum
  color: AnimalColorEnum
  publicDescription: string
  birthday: string
}

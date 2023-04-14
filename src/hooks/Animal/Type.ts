import { AnimalClient } from 'src/types/Animal/Type'
import { FetchStatus } from 'src/types/Status'

export interface ReturnAnimal {
  statusAnimal: FetchStatus
  animalData: AnimalClient[]
}

import { AnimalClient } from 'src/types/Animal/Type'

export interface ReturnAnimal {
  statusAnimal: 'error' | 'success' | 'loading'
  animalData: AnimalClient[]
}

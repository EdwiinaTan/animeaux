import { AnimalClient } from 'src/types/Animal/Type'

export interface ReturnAnimal {
  status: 'error' | 'success' | 'loading'
  animal: AnimalClient[]
}

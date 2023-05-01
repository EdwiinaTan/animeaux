import { AnimalClient, AnimalType } from 'src/types/Animal/Type'

export interface ReturnAnimals {
  statusAnimal: 'error' | 'success' | 'loading'
  animalData: AnimalClient[]
}

export interface ReturnAnimal {
  statusAnimal: 'error' | 'success' | 'loading'
  animalData: AnimalType
}

export interface ReturnAnimalByUser {
  statusAnimalUser: 'error' | 'success' | 'loading'
  animalUserData: AnimalType[]
}

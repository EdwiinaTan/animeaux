import { useQuery } from '@tanstack/react-query'
import { getAnimals } from 'src/client/Animal'
import { AnimalClient } from 'src/types/Animal/Type'
import { ReturnAnimal } from './Type'

export const useGetAnimals = (): ReturnAnimal => {
  const { status: statusAnimal, data: animalData } = useQuery<AnimalClient[]>({
    queryKey: ['animals'],
    queryFn: getAnimals,
  })

  return {
    statusAnimal,
    animalData,
  }
}

import { useQuery } from '@tanstack/react-query'
import { getAnimals } from 'src/client/Animal'
import { AnimalClient } from 'src/types/Animal/Type'
import { ReturnAnimal } from './Type'

export const useGetAnimals = (): ReturnAnimal => {
  const { status, data: animal } = useQuery<AnimalClient[]>({
    queryKey: ['animals'],
    queryFn: getAnimals,
  })

  return {
    status,
    animal,
  }
}

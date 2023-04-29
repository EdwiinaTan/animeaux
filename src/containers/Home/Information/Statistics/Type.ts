import { AnimalClient } from 'src/types/Animal/Type'
import { FormInscriptionClient } from 'src/types/FormInscription/Type'

export interface StatisticsProps {
  animalData: AnimalClient[]
  formInscriptionData: FormInscriptionClient[]
  status: 'error' | 'success' | 'loading'
}

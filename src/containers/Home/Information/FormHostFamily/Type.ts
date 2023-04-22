import { FormInscriptionClient } from 'src/types/FormInscription/Type'

export interface InfoFormProps {
  data: FormInscriptionClient[]
  status: 'error' | 'success' | 'loading'
}

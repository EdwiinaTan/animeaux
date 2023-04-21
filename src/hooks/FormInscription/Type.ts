import { FormInscriptionClient } from './../../types/FormInscription/Type'

export interface ReturnFormInscription {
  statusFormInscription: 'error' | 'success' | 'loading'
  formInscriptionData: FormInscriptionClient[]
}

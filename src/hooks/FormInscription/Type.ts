import { FormInscriptionClient, FormInscriptionType } from 'src/types/FormInscription/Type'

export interface ReturnFormInscriptions {
  statusFormInscription: 'error' | 'success' | 'loading'
  formInscriptionsData: FormInscriptionClient[]
}

export interface ReturnFormInscription {
  statusFormInscription: 'error' | 'success' | 'loading'
  formInscriptionData: FormInscriptionType
}

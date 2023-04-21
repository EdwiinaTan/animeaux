import { useQuery } from '@tanstack/react-query'
import { getFormInscriptions } from 'src/client/FormInscription'
import { FormInscriptionClient } from 'src/types/FormInscription/Type'
import { ReturnFormInscription } from './Type'

export const useGetFormInscriptions = (): ReturnFormInscription => {
  const { status: statusFormInscription, data: formInscriptionData } = useQuery<
    FormInscriptionClient[]
  >({
    queryKey: ['formInscriptions'],
    queryFn: getFormInscriptions,
  })

  return {
    statusFormInscription,
    formInscriptionData,
  }
}

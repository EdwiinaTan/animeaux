import { useQuery } from '@tanstack/react-query'
import { getFormInscriptionById, getFormInscriptions } from 'src/client/FormInscription'
import { FormInscriptionClient, FormInscriptionType } from 'src/types/FormInscription/Type'
import { ReturnFormInscription, ReturnFormInscriptions } from './Type'

export const useGetFormInscriptionById = (dataId: string): ReturnFormInscription => {
  const { status: statusFormInscription, data: formInscriptionData } = useQuery<
    FormInscriptionType,
    Error
  >({
    enabled: dataId !== null,
    queryKey: ['formInscription', dataId],
    queryFn: () => getFormInscriptionById(dataId || ''),
  })

  return {
    statusFormInscription,
    formInscriptionData,
  }
}

export const useGetFormInscriptions = (): ReturnFormInscriptions => {
  const { status: statusFormInscription, data: formInscriptionsData } = useQuery<
    FormInscriptionClient[]
  >({
    queryKey: ['formInscriptions'],
    queryFn: getFormInscriptions,
  })

  return {
    statusFormInscription,
    formInscriptionsData,
  }
}

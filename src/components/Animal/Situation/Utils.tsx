import * as Yup from 'yup'

export const validationAnimalSituation = Yup.object().shape({
  status: Yup.string().required('Le statut doit être requis'),
})

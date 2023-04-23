import * as Yup from 'yup'

export const validationAnimalSituation = Yup.object().shape({
  status: Yup.string().required('Le statut est requis'),
  userId: Yup.string().required('Le responsable est obligatoire'),
  placeAssigned: Yup.string().required('Le lieu de prise en charge est obligaroire'),
  reason: Yup.string().required('La raison est requise'),
  dogAgreement: Yup.string().required('L’entente avec un chien est requis'),
  childAgreement: Yup.string().required('L’entente avec un enfant est requis'),
  catAgreement: Yup.string().required('L’entente avec un chat est requis'),
  isSterilized: Yup.string().required('Connaître sa stérilisation est requise'),
  dateAssigned: Yup.string().required('La date de prise en charge est requise'),
  privateDescription: Yup.string().min(
    2,
    'La description privée doit contenir au moins 2 caractères'
  ),
})

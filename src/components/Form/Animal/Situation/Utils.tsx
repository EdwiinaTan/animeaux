import * as Yup from 'yup'

export const validationAnimalSituation = Yup.object().shape({
  status: Yup.string().required('Le statut est requis'),
  userId: Yup.string().required('Le responsable est obligatoire'),
  hostFamilyId: Yup.string().required('La FA est obligatoire'),
  placeAssigned: Yup.string().required('Le lieu de prise en charge est obligaroire'),
  reason: Yup.string().required('La raison est requise'),
  dateAssigned: Yup.string().required('La date de prise en charge est requise'),
  privateDescription: Yup.string().min(
    2,
    'La description privée doit contenir au moins 2 caractères'
  ),
})

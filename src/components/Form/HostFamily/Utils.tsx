import * as Yup from 'yup'

export const validationHostFamily = Yup.object().shape({
  lastName: Yup.string().required('Le nom de famille est requis'),
  firstName: Yup.string().required('Le prénom est requis'),
  email: Yup.string().email('Le format est incorrect').required('L’adresse mail est requise'),
  phone: Yup.string().required('Le téléphone est requis'),
  postalCode: Yup.string()
    .min(5, 'Le code postal doit contenir au moins 5 numéros')
    .max(5, 'Le code postal doit contenir au moins 5 numéros')
    .required('Le code postal est requis'),
  city: Yup.string().required('La ville est requise'),
  address: Yup.string().required('L’adresse est requise'),
})

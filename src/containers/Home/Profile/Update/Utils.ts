import * as Yup from 'yup'

export const validationUser = Yup.object().shape({
  lastName: Yup.string().required('Le nom de famille est requis'),
  firstName: Yup.string().required('Le prénom est requis'),
  email: Yup.string().email('Le format est incorrect').required('L’adresse mail est requise'),
  phone: Yup.string()
    .required('Le téléphone est requis')
    .length(10, 'Le téléphone doit contenir 10 chiffres'),
})

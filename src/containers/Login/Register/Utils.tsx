import * as Yup from 'yup'

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{7,}$/

export const validationAddUser = Yup.object().shape({
  lastName: Yup.string().required('Le nom de famille est requis'),
  firstName: Yup.string().required('Le prénom est requis'),
  email: Yup.string().email('Le format est incorrect').required('L’adresse mail est requise'),
  phone: Yup.string()
    .required('Le téléphone est requis')
    .length(10, 'Le téléphone doit contenir 10 chiffres'),
  password: Yup.string()
    .min(7, 'Le mot de passe doit contenir au moins 7 caractères')
    .matches(
      passwordRegex,
      ({}) => `Le mot de passe doit contenir au moins 1 chiffre et 1 caractère spécial`
    )
    .required('Le mot de passe est requis'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'La confirmation de mot de passe doit correspondre avec le mot de passe ci-dessus'
  ),
})

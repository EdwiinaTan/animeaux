import * as Yup from 'yup'

export const validationAnimalProfile = Yup.object().shape({
  nom: Yup.string()
    .required('Le nom doit être requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  alias: Yup.string().min(2, 'L’alias doit contenir au moins 2 caractères'),
})

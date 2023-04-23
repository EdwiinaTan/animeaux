import * as Yup from 'yup'

export const validationAnimalProfile = Yup.object().shape({
  species: Yup.string().required('Vous devez choisir l’espèce de l’animal'),
  gender: Yup.string().required('Vous devez choisir le genre de l’animal'),
  birthday: Yup.string().required('Vous devez choisir sa date de naissance'),
  name: Yup.string()
    .required('Le nom doit être requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  icad: Yup.string()
    .min(15, 'L’icad doit contenir 15 caractères')
    .max(15, 'L’icad doit contenir 15 caractères'),
  race: Yup.string().required('Vous devez choisir la race de l’animal'),
})

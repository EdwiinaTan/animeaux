import { AnimalColorEnum, AnimalGenderEnum, AnimalRaceEnum } from 'src/types/Animal/enum'
import * as Yup from 'yup'

export const validationAnimalProfile = Yup.object().shape({
  species: Yup.string().required('Vous devez choisir l’espèce de l’animal'),
  gender: Yup.string().required('Vous devez choisir le genre de l’animal'),
  birthday: Yup.string().required('Vous devez choisir sa date de naissance'),
  name: Yup.string()
    .required('Le nom doit être requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  icad: Yup.string().length(15, 'L’icad doit contenir 15 caractères'),
  race: Yup.string().required('Vous devez choisir la race de l’animal'),
})

export const raceArray = Object.keys(AnimalRaceEnum).map((key) => ({
  key: key,
  value: AnimalRaceEnum[key],
}))

export const colorArray = Object.keys(AnimalColorEnum).map((key) => ({
  key: key,
  value: AnimalColorEnum[key],
}))

export const genderArray = Object.keys(AnimalGenderEnum).map((key) => ({
  label: AnimalGenderEnum[key],
  value: AnimalGenderEnum[key],
}))

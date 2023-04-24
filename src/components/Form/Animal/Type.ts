import { FormikValues } from 'formik'
import { AnimalType } from 'src/types/Animal/Type'

export interface AnimalFormProps {
  animalDetails?: AnimalType | undefined
  field?: FormikValues
}

import { AnimalType } from 'src/types/Animal/Type'

export interface AnimalFormProps {
  values: any
  handleChange: any
  handleBlur: any
  handleSubmit: any
  animalDetails?: AnimalType | undefined
  errors?: any
  touched?: any
  setFieldValue?: any
}

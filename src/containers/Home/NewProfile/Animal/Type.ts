import { FormikValues } from 'formik'

export interface AddAnimalProps {
  renderDefaultOptionHostFamily?: () => {
    key: string
    value: string
  }
  renderDefaultOptionUser?: () => {
    key: string
    value: string
  }
  renderDefaultOptionPlace?: () => {
    key: string
    value: string
  }

  field?: FormikValues
}

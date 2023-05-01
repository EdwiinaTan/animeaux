import { FormikValues } from 'formik'
import { UserType } from 'src/types/User/Type'

export interface UserUpdateFormProps {
  field: FormikValues
  setSelected?: (value: string[]) => void
  setSelectedNoCharge?: (value: string[]) => void
  userDataToken: UserType
}

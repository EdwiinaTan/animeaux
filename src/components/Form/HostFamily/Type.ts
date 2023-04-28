import { FormikValues } from 'formik'

export interface HostFamilyFormProps {
  field: FormikValues
  setSelected?: (value: string[]) => void
  hostFamilyId: string
  setSelectedNotHosted?: (value: string[]) => void
}

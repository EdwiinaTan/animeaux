import { FormikValues } from 'formik'

export interface HostFamilyFormProps {
  field: FormikValues
  setSelected?: (value: string[]) => void
  hostFamilyId: string
  setSelectedNoCharge?: (value: string[]) => void
}

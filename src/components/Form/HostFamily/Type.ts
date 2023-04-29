import { FormikValues } from 'formik'
import { HostFamilyType } from 'src/types/HostFamily/Type'

export interface HostFamilyFormProps {
  field: FormikValues
  setSelected: (value: string[]) => void
  hostFamilyDetails?: HostFamilyType
  setSelectedNotHosted?: (value: string[]) => void
}

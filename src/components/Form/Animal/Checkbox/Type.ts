import {
  AnimalAgreement,
  AnimalGenderEnum,
  AnimalReasonEnum,
  AnimalStatusEnum,
  AnimalTypeEnum,
} from '../../../../types/Animal/enum'

export interface CheckboxProps {
  animal: {
    label: string
    value: any
  }
  values:
    | string
    | AnimalTypeEnum
    | AnimalGenderEnum
    | AnimalStatusEnum
    | AnimalReasonEnum
    | AnimalAgreement
    | AnimalAgreement
    | AnimalAgreement
  handleChange: {
    (e: React.ChangeEvent<any>): void
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void
  }
}

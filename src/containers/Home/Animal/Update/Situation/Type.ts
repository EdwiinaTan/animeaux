import { AnimalAgreement, AnimalReasonEnum, AnimalStatusEnum } from 'src/types/Animal/enum'

export interface AnimalRequest {
  hostFamilyId: string
  status: AnimalStatusEnum
  lieuEnCharge: string
  raison: AnimalReasonEnum
  ententeEnfant: AnimalAgreement
  ententeChat: AnimalAgreement
  ententeChien: AnimalAgreement
  userId: string
  descriptionPrivee: string
  sterilise: string
}

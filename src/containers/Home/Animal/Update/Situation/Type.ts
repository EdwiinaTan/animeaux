import { AnimalAgreement, AnimalReasonEnum, AnimalStatusEnum } from 'src/types/Animal/enum'

export interface AnimalRequest {
  hostFamilyId: string
  status: AnimalStatusEnum
  placeAssigned: string
  reason: AnimalReasonEnum
  childAgreement: AnimalAgreement
  catAgreement: AnimalAgreement
  dogAgreement: AnimalAgreement
  userId: string
  privateDescription: string
  isSterilized: string
}

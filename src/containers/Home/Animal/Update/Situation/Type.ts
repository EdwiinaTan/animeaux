import { AnimalAgreement, AnimalReasonEnum, AnimalStatusEnum } from 'src/types/Animal/enum'

export interface AnimalSituationRequest {
  hostFamilyId: string
  status: AnimalStatusEnum
  placeAssigned: string
  reason: AnimalReasonEnum
  childAgreement: AnimalAgreement
  catAgreement: AnimalAgreement
  dogAgreement: AnimalAgreement
  userId: string
  privateDescription: string
  isSterilized: AnimalAgreement
}

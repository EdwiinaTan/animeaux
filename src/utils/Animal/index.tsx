import { AnimalReasonEnum } from 'src/types/Animal/enum'

export const renderReason = (reason: AnimalReasonEnum) => {
  switch (reason) {
    case AnimalReasonEnum.ABANDON:
      return 'Abandon'
    case AnimalReasonEnum.AUTRE_RAISON:
      return 'Autre raison'
    case AnimalReasonEnum.ERRANCE:
      return 'Errance'
    case AnimalReasonEnum.DECES_DU_PROPRIETAIRE:
      return 'Décès du propriétaire'
    case AnimalReasonEnum.MALTRAITANCE:
      return 'Maltraitance'
  }
}

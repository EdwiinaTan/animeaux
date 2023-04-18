import {
  AnimalAgreement,
  AnimalGenderEnum,
  AnimalPlaceCareEnum,
  AnimalReasonEnum,
  AnimalStatusEnum,
  AnimalTypeEnum,
} from 'src/types/Animal/enum'

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

export const specieArray = [
  { label: 'Chien', value: AnimalTypeEnum.DOG },
  { label: 'Chat', value: AnimalTypeEnum.CAT },
  { label: 'Rongeur', value: AnimalTypeEnum.RONDENT },
  { label: 'Oiseau', value: AnimalTypeEnum.BIRD },
  { label: 'Reptile', value: AnimalTypeEnum.REPTILE },
]

export const genderArray = [
  { label: 'Male', value: AnimalGenderEnum.MALE },
  { label: 'Femelle', value: AnimalGenderEnum.FEMALE },
]

export const statusArray = [
  { label: 'Adopté', value: AnimalStatusEnum.ADOPTE },
  { label: 'Décédé', value: AnimalStatusEnum.DECEDE },
  { label: 'Libre', value: AnimalStatusEnum.LIBRE },
  { label: 'Adoptable', value: AnimalStatusEnum.ADOPTABLE },
  { label: 'Réservable', value: AnimalStatusEnum.RESERVABLE },
  { label: 'Indisponible', value: AnimalStatusEnum.INDISPONIBLE },
  { label: 'Réservé', value: AnimalStatusEnum.RESERVE },
]

export const reasonArray = [
  { label: 'Décès du propriétaire', value: AnimalReasonEnum.DECES_DU_PROPRIETAIRE },
  { label: 'Abandon', value: AnimalReasonEnum.ABANDON },
  { label: 'Maltraitance', value: AnimalReasonEnum.MALTRAITANCE },
  { label: 'Errance', value: AnimalReasonEnum.ERRANCE },
  { label: 'Autre raison', value: AnimalReasonEnum.AUTRE_RAISON },
]

export const agreementArray = [
  { label: 'Oui', value: AnimalAgreement.YES },
  { label: 'Non', value: AnimalAgreement.NO },
  { label: 'Inconnu', value: AnimalAgreement.UNKNOW },
]

export const placeCareArray = [
  {
    key: AnimalPlaceCareEnum.BAILLY_ROMAINVILLIERS,
    value: AnimalPlaceCareEnum.BAILLY_ROMAINVILLIERS,
  },
  {
    key: AnimalPlaceCareEnum.BARCY,
    value: AnimalPlaceCareEnum.BARCY,
  },
  {
    key: AnimalPlaceCareEnum.BEAUMONT_DU_GATINAIS,
    value: AnimalPlaceCareEnum.BEAUMONT_DU_GATINAIS,
  },
  {
    key: AnimalPlaceCareEnum.CHATENEY_SUR_SEINE,
    value: AnimalPlaceCareEnum.CHATENEY_SUR_SEINE,
  },
  {
    key: AnimalPlaceCareEnum.CONGIS_SUR_THEROUANNE,
    value: AnimalPlaceCareEnum.CONGIS_SUR_THEROUANNE,
  },
  {
    key: AnimalPlaceCareEnum.COUILLY_PONT_AUX_DAMES,
    value: AnimalPlaceCareEnum.COUILLY_PONT_AUX_DAMES,
  },
  { key: AnimalPlaceCareEnum.FAREMOUTIERS, value: AnimalPlaceCareEnum.FAREMOUTIERS },
  { label: AnimalPlaceCareEnum.JOSSIGNY, value: AnimalPlaceCareEnum.JOSSIGNY },
  {
    key: AnimalPlaceCareEnum.LA_FERTE_SOUS_JOUARRE,
    value: AnimalPlaceCareEnum.LA_FERTE_SOUS_JOUARRE,
  },
  {
    key: AnimalPlaceCareEnum.LA_PLESSIS_BELLEVILLE,
    value: AnimalPlaceCareEnum.LA_PLESSIS_BELLEVILLE,
  },
  { key: AnimalPlaceCareEnum.LAGNY_SUR_MARNE, value: AnimalPlaceCareEnum.LAGNY_SUR_MARNE },
  { key: AnimalPlaceCareEnum.LIZY_SUR_OURCQ, value: AnimalPlaceCareEnum.LIZY_SUR_OURCQ },
  { key: AnimalPlaceCareEnum.LOGNES, value: AnimalPlaceCareEnum.LOGNES },
  { key: AnimalPlaceCareEnum.MAREUIL_LES_MEAUX, value: AnimalPlaceCareEnum.MAREUIL_LES_MEAUX },
  { key: AnimalPlaceCareEnum.MEAUX, value: AnimalPlaceCareEnum.MEAUX },
  { key: AnimalPlaceCareEnum.MORTERY, value: AnimalPlaceCareEnum.MORTERY },
  {
    key: AnimalPlaceCareEnum.NANTEUIL_LES_MEAUX,
    value: AnimalPlaceCareEnum.NANTEUIL_LES_MEAUX,
  },
  { key: AnimalPlaceCareEnum.NOISY_LE_GRAND, value: AnimalPlaceCareEnum.NOISY_LE_GRAND },
  { key: AnimalPlaceCareEnum.PARIS, value: AnimalPlaceCareEnum.PARIS },
  { key: AnimalPlaceCareEnum.POINCY, value: AnimalPlaceCareEnum.POINCY },
  { key: AnimalPlaceCareEnum.PROVINS, value: AnimalPlaceCareEnum.PROVINS },
  { key: AnimalPlaceCareEnum.SAINT_PATHUS, value: AnimalPlaceCareEnum.SAINT_PATHUS },
  {
    key: AnimalPlaceCareEnum.SOIGNOLLES_EN_BRIE,
    value: AnimalPlaceCareEnum.SOIGNOLLES_EN_BRIE,
  },
  { key: AnimalPlaceCareEnum.TORCY, value: AnimalPlaceCareEnum.TORCY },
  { key: AnimalPlaceCareEnum.VILLENOY, value: AnimalPlaceCareEnum.VILLENOY },
]

export const isSterilisedArray = [
  { label: 'Oui', value: 'Oui' },
  { label: 'Non', value: 'Non' },
]

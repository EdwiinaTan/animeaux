import {
  AnimalAgreement,
  AnimalColorEnum,
  AnimalGenderEnum,
  AnimalPlaceCareEnum,
  AnimalRaceEnum,
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

export const raceArray = [
  { key: AnimalRaceEnum.BEAGLE, value: AnimalRaceEnum.BEAGLE },
  { key: AnimalRaceEnum.BERGER_ALLEMAND, value: AnimalRaceEnum.BERGER_ALLEMAND },
  { key: AnimalRaceEnum.BERGER_SERBE, value: AnimalRaceEnum.BERGER_SERBE },
  { key: AnimalRaceEnum.BORDER_COLLIE, value: AnimalRaceEnum.BORDER_COLLIE },
  { key: AnimalRaceEnum.BOULEDOGUE_ANGLAIS, value: AnimalRaceEnum.BOULEDOGUE_ANGLAIS },
  { key: AnimalRaceEnum.BOULEDOGUE_FRANCAIS, value: AnimalRaceEnum.BOULEDOGUE_FRANCAIS },
  { key: AnimalRaceEnum.BOWER, value: AnimalRaceEnum.BOWER },
  { key: AnimalRaceEnum.CANICHE, value: AnimalRaceEnum.CANICHE },
  { key: AnimalRaceEnum.COCHON_INDE, value: AnimalRaceEnum.COCHON_INDE },
  { key: AnimalRaceEnum.CROISE, value: AnimalRaceEnum.CROISE },
  { key: AnimalRaceEnum.DOGUE_ARGENTIN, value: AnimalRaceEnum.DOGUE_ARGENTIN },
  { key: AnimalRaceEnum.EUROPEEN, value: AnimalRaceEnum.EUROPEEN },
  { key: AnimalRaceEnum.GRIFFON, value: AnimalRaceEnum.GRIFFON },
  { key: AnimalRaceEnum.JACK_RUSSEL, value: AnimalRaceEnum.JACK_RUSSEL },
  { key: AnimalRaceEnum.LAPIN, value: AnimalRaceEnum.LAPIN },
  { key: AnimalRaceEnum.MALINOIS, value: AnimalRaceEnum.MALINOIS },
  { key: AnimalRaceEnum.PEKINOIS, value: AnimalRaceEnum.PEKINOIS },
  { key: AnimalRaceEnum.PINSCHER, value: AnimalRaceEnum.PINSCHER },
  { key: AnimalRaceEnum.ROTTWEILER, value: AnimalRaceEnum.ROTTWEILER },
  { key: AnimalRaceEnum.SIAMOIS, value: AnimalRaceEnum.SIAMOIS },
  { key: AnimalRaceEnum.STAFF, value: AnimalRaceEnum.STAFF },
  { key: AnimalRaceEnum.TECKEL, value: AnimalRaceEnum.TECKEL },
]

export const colorArray = [
  { key: AnimalColorEnum.BEIGE, value: AnimalColorEnum.BEIGE },
  { key: AnimalColorEnum.BLANC, value: AnimalColorEnum.BLANC },
  { key: AnimalColorEnum.BLEU, value: AnimalColorEnum.BLEU },
  { key: AnimalColorEnum.BRINGE, value: AnimalColorEnum.BRINGE },
  { key: AnimalColorEnum.CHOCOLAT, value: AnimalColorEnum.CHOCOLAT },
  { key: AnimalColorEnum.ECAILLE_DE_TORTUE, value: AnimalColorEnum.ECAILLE_DE_TORTUE },
  { key: AnimalColorEnum.FAUVE, value: AnimalColorEnum.FAUVE },
  { key: AnimalColorEnum.FAUVE_NOIR, value: AnimalColorEnum.FAUVE_NOIR },
  { key: AnimalColorEnum.GRIS, value: AnimalColorEnum.GRIS },
  { key: AnimalColorEnum.GRIS_BLANC, value: AnimalColorEnum.GRIS_BLANC },
  { key: AnimalColorEnum.MARRON, value: AnimalColorEnum.MARRON },
  { key: AnimalColorEnum.MARRON_BLANC, value: AnimalColorEnum.MARRON_BLANC },
  { key: AnimalColorEnum.NOIR, value: AnimalColorEnum.NOIR },
  { key: AnimalColorEnum.ROUX, value: AnimalColorEnum.ROUX },
  { key: AnimalColorEnum.ROUX_BLANC, value: AnimalColorEnum.ROUX_BLANC },
  { key: AnimalColorEnum.TIGRE, value: AnimalColorEnum.TIGRE },
  { key: AnimalColorEnum.TIBRE_BLANC, value: AnimalColorEnum.TIBRE_BLANC },
  { key: AnimalColorEnum.TIGRE_ROUX, value: AnimalColorEnum.TIGRE_ROUX },
  { key: AnimalColorEnum.TRICOLORE, value: AnimalColorEnum.TRICOLORE },
  { key: AnimalColorEnum.TYPE_SIAMOIS, value: AnimalColorEnum.TYPE_SIAMOIS },
  { key: AnimalColorEnum.NOIR_BLANC, value: AnimalColorEnum.NOIR_BLANC },
  { key: AnimalColorEnum.CREME, value: AnimalColorEnum.CREME },
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

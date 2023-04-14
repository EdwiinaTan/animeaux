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
  { key: AnimalRaceEnum.BEAGLE, value: 'Beagle' },
  { key: AnimalRaceEnum.BERGER_ALLEMAND, value: 'Berger allemand' },
  { key: AnimalRaceEnum.BERGER_SERBE, value: 'Berger serbe' },
  { key: AnimalRaceEnum.BORDER_COLLIE, value: 'Border collie' },
  { key: AnimalRaceEnum.BOULEDOGUE_ANGLAIS, value: 'Bouledogue anglais' },
  { key: AnimalRaceEnum.BOULEDOGUE_FRANCAIS, value: 'Bouledogue français' },
  { key: AnimalRaceEnum.BOWER, value: 'Bower' },
  { key: AnimalRaceEnum.CANICHE, value: 'Caniche' },
  { key: AnimalRaceEnum.COCHON_INDE, value: 'Bouledogue français' },
  { key: AnimalRaceEnum.CROISE, value: 'Croisé' },
  { key: AnimalRaceEnum.DOGUE_ARGENTIN, value: 'Dogue argentin' },
  { key: AnimalRaceEnum.EUROPEEN, value: 'Européen' },
  { key: AnimalRaceEnum.GRIFFON, value: 'Griffon' },
  { key: AnimalRaceEnum.JACK_RUSSEL, value: 'Jack russel' },
  { key: AnimalRaceEnum.LAPIN, value: 'Lapin' },
  { key: AnimalRaceEnum.MALINOIS, value: 'Malinois' },
  { key: AnimalRaceEnum.PEKINOIS, value: 'Pékinois' },
  { key: AnimalRaceEnum.PINSCHER, value: 'Pinscher' },
  { key: AnimalRaceEnum.ROTTWEILER, value: 'Rottweiler' },
  { key: AnimalRaceEnum.SIAMOIS, value: 'Siamois' },
  { key: AnimalRaceEnum.STAFF, value: 'Staff' },
  { key: AnimalRaceEnum.TECKEL, value: 'Teckel' },
]

export const colorArray = [
  { key: AnimalColorEnum.BEIGE, value: 'Beige' },
  { key: AnimalColorEnum.BLANC, value: 'Blanc' },
  { key: AnimalColorEnum.BLEU, value: 'Bleu' },
  { key: AnimalColorEnum.BRINGE, value: 'Bringe' },
  { key: AnimalColorEnum.CHOCOLAT, value: 'Chocolat' },
  { key: AnimalColorEnum.ECAILLE_DE_TORTUE, value: 'Écaille de tortue' },
  { key: AnimalColorEnum.FAUVE, value: 'Fauve' },
  { key: AnimalColorEnum.FAUVE_NOIR, value: 'Fauve noir' },
  { key: AnimalColorEnum.GRIS, value: 'Gris' },
  { key: AnimalColorEnum.GRIS_BLANC, value: 'Gris blanc' },
  { key: AnimalColorEnum.MARRON, value: 'Marron' },
  { key: AnimalColorEnum.MARRON_BLANC, value: 'Marron blanc' },
  { key: AnimalColorEnum.NOIR, value: 'Noir' },
  { key: AnimalColorEnum.ROUX, value: 'Roux' },
  { key: AnimalColorEnum.ROUX_BLANC, value: 'Roux blanc' },
  { key: AnimalColorEnum.TIGRE, value: 'Tigre' },
  { key: AnimalColorEnum.TIBRE_BLANC, value: 'Tigre blanc' },
  { key: AnimalColorEnum.TIGRE_ROUX, value: 'Tigre roux' },
  { key: AnimalColorEnum.TRICOLORE, value: 'Tricolore' },
  { key: AnimalColorEnum.TYPE_SIAMOIS, value: 'Type siamois' },
  { key: AnimalColorEnum.NOIR_BLANC, value: 'Noir blanc' },
  { key: AnimalColorEnum.CREME, value: 'Crème' },
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

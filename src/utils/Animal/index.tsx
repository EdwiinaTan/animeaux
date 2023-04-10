import {
  AnimalColorEnum,
  AnimalGenderEnum,
  AnimalRaceEnum,
  AnimalReasonEnum,
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
